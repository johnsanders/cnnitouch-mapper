import { Hilite, Label } from '../../types';
import { continueRender, delayRender } from 'remotion';
import { useMap, useMapEvent } from 'react-leaflet';
import AreaLabel from './AreaLabel';
import PointLabel from './PointLabel';
import React from 'react';
import calcLabelsOverlapVisibility from '../animator/calcLabelsOverlapVisibility';
import createLabelAnimConfigs from '../animator/createLabelAnimConfigs';
import getDomId from '../../../misc/getDomId';
import getLabelsFromHilitesList from '../../../misc/getLabelsFromHilitesList';
import getMapSizeInPixels from '../../../misc/getMapSizeInPixels';
import getSpecialLabels from './getSpecialLabels';
import { hiliteLabelThreshold } from '../animator/config';

const fontPrimer = (
	<div style={{ fontFamily: 'CNN', fontWeight: '500', opacity: 0 }}>Font Primer</div>
);
const collateLabels = (hilites: Hilite[], labels: Label[]) => [
	...getLabelsFromHilitesList(hilites),
	...labels,
	...getSpecialLabels(hilites.map((hilite) => hilite.name)),
];

interface Props {
	hilites: Hilite[];
	labels: Label[];
	mode: 'edit' | 'render';
	scale: number;
	setLabelsAreHidden?: (labelsAreHidden: boolean) => void;
}

const LabelsLayer: React.FC<Props> = (props: Props) => {
	const timeoutRef = React.useRef<number>();
	const [ready, setReady] = React.useState(false);
	const [visibleLabels, setVisibleLabels] = React.useState(props.labels);
	const { hilites, labels, mode, setLabelsAreHidden } = props;
	const zoom = useMap().getZoom();
	React.useEffect(() => {
		const delayId = delayRender();
		setTimeout(() => {
			setReady(true);
			continueRender(delayId);
		}, 500);
		return () => continueRender(delayId);
	}, []);
	const checkEditVisibilities = React.useCallback(() => {
		if (mode !== 'edit') return;
		const mapSizeInPixels = getMapSizeInPixels();
		const visibleHiliteLabels = hilites.filter((hilite) => {
			const hiliteEl = document.querySelector(`.${getDomId('hilite', hilite.id)}`);
			if (!hiliteEl) throw new Error(`No hilite element for ${hilite.id}`);
			const hiliteRect = hiliteEl.getBoundingClientRect();
			const hiliteSizeInPixels = hiliteRect.width * hiliteRect.height;
			const hilitePercentOfScreen = hiliteSizeInPixels / mapSizeInPixels;
			const hiliteIsBigEnoughToLabel = hilitePercentOfScreen > hiliteLabelThreshold;
			return hiliteIsBigEnoughToLabel;
		});
		const allLabels = collateLabels(visibleHiliteLabels, labels);
		const labelsAboveMinZoom = allLabels.filter((label) => label.minZoom <= zoom);
		setVisibleLabels(labelsAboveMinZoom);
		timeoutRef.current = window.setTimeout(() => {
			const visibility = calcLabelsOverlapVisibility(
				createLabelAnimConfigs(labelsAboveMinZoom, []).normalLabelAnimConfigs,
			);
			const visibleLabels = labelsAboveMinZoom.filter((_label, i) => visibility[i]);
			setVisibleLabels(visibleLabels);
			const hiliteLabels = getLabelsFromHilitesList(hilites);
			const allLabelsCount = labels.length + hiliteLabels.length;
			if (setLabelsAreHidden) setLabelsAreHidden(visibleLabels.length < allLabelsCount);
		}, 100);
	}, [hilites, labels, mode, setLabelsAreHidden, zoom]);
	useMapEvent('zoomend', checkEditVisibilities);
	React.useEffect(() => {
		checkEditVisibilities();
		return () => clearTimeout(timeoutRef.current);
	}, [checkEditVisibilities]);
	return !ready ? (
		fontPrimer
	) : (
		<svg
			id="labels"
			style={{
				filter: 'drop-shadow(0 0 6px #000000A0)',
				height: '100%',
				left: 0,
				pointerEvents: 'none',
				position: 'absolute',
				top: 0,
				transform: 'translate3d(0.95, 9.95, 0.95)',
				width: '100%',
				zIndex: 500,
			}}
		>
			{visibleLabels.map((label) =>
				label.type === 'point' ? (
					<PointLabel key={label.id} label={label} scale={props.scale} />
				) : label.type === 'area' ? (
					<AreaLabel key={label.id} label={label} scale={props.scale} />
				) : null,
			)}
		</svg>
	);
};

export default LabelsLayer;
