import { Hilite, Label, LabelWithVisibility } from '../../types';
import { continueRender, delayRender } from 'remotion';
import { useMap, useMapEvent, useMapEvents } from 'react-leaflet';
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
import { uniqueId } from 'lodash-es';

const fontPrimer = (
	<div style={{ fontFamily: 'CNN', fontWeight: '500', opacity: 0 }}>Font Primer</div>
);
const fontPrimerDelayMs = 500;
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
	const [key, setKey] = React.useState(uniqueId);
	const [labelsWithVisibility, setLabelsWithVisibility] = React.useState<LabelWithVisibility[]>(
		props.labels.map((label) => ({ ...label, visible: true })),
	);
	const { hilites, labels, mode, setLabelsAreHidden } = props;
	const zoom = useMap().getZoom();
	const onMapChange = () => setKey(uniqueId());
	useMapEvents({ dragend: onMapChange, zoomend: onMapChange });
	React.useEffect(() => {
		const delayId = delayRender();
		const timeout = setTimeout(() => {
			setReady(true);
			continueRender(delayId);
		}, fontPrimerDelayMs);
		return () => {
			clearTimeout(timeout);
			continueRender(delayId);
		};
	}, []);
	const checkEditVisibilities = React.useCallback(() => {
		if (mode !== 'edit') return;
		const mapSizeInPixels = getMapSizeInPixels();
		const hiliteLabelsWithVisibility = hilites.map((hilite) => {
			const hiliteEl = document.querySelector(`.${getDomId('hilite', hilite.id)}`);
			if (!hiliteEl) throw new Error(`No hilite element for ${hilite.id}`);
			const hiliteRect = hiliteEl.getBoundingClientRect();
			const hiliteSizeInPixels = hiliteRect.width * hiliteRect.height;
			const hilitePercentOfScreen = hiliteSizeInPixels / mapSizeInPixels;
			const hiliteIsBigEnoughToLabel = hilitePercentOfScreen > hiliteLabelThreshold;
			return { ...hilite, visibile: hiliteIsBigEnoughToLabel };
		});
		const allLabels = collateLabels(hiliteLabelsWithVisibility, labels);
		const labelsWithAboveMinZoomVisibility: LabelWithVisibility[] = allLabels.map((label) => ({
			...label,
			visible: label.minZoom <= zoom,
		}));
		setLabelsWithVisibility(labelsWithAboveMinZoomVisibility);
		timeoutRef.current = window.setTimeout(() => {
			const visibility = calcLabelsOverlapVisibility(
				createLabelAnimConfigs(labelsWithAboveMinZoomVisibility, []).normalLabelAnimConfigs,
			);
			const visibleLabels: LabelWithVisibility[] = labelsWithAboveMinZoomVisibility.map(
				(label, i) => ({
					...label,
					visible: visibility[i],
				}),
			);
			setLabelsWithVisibility(visibleLabels);
			if (setLabelsAreHidden) setLabelsAreHidden(visibleLabels.some((label) => !label.visible));
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
			{labelsWithVisibility.map((label, i) =>
				label.type === 'point' ? (
					<PointLabel
						fontPrimerDelayMs={fontPrimerDelayMs}
						key={`${key} - ${i}`}
						label={label}
						mode={props.mode}
						scale={props.scale}
					/>
				) : label.type === 'area' ? (
					<AreaLabel
						fontPrimerDelayMs={fontPrimerDelayMs}
						key={`${key} - ${i}`}
						label={label}
						mode={props.mode}
						scale={props.scale}
					/>
				) : null,
			)}
		</svg>
	);
};

export default LabelsLayer;
