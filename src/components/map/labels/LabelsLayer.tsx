import { Hilite, Label, LabelWithVisibility } from '../../types';
import { continueRender, delayRender } from 'remotion';
import { useMap, useMapEvent, useMapEvents } from 'react-leaflet';
import AreaLabel from './AreaLabel';
import PointLabel from './PointLabel';
import React from 'react';
import getMapSizeInPixels from '../../../misc/getMapSizeInPixels';
import handleEditLabelVisibilities from './handleEditLabelVisibilities';
import { uniqueId } from 'lodash-es';

const fontPrimer = (
	<div style={{ fontFamily: 'CNN', fontWeight: '500', opacity: 0 }}>Font Primer</div>
);
const fontPrimerDelayMs = 1000;
interface Props {
	hilites: Hilite[];
	labels: Label[];
	mode: 'edit' | 'render';
	scale: number;
	setLabelsAreHidden?: (labelsAreHidden: boolean) => void;
}

const LabelsLayer: React.FC<Props> = (props: Props) => {
	const { hilites, labels, mode, setLabelsAreHidden } = props;
	const [ready, setReady] = React.useState(false);
	const [key, setKey] = React.useState(uniqueId);
	const hiliteLabels = hilites.reduce<Label[]>(
		(acc, hilite) => (hilite.label ? [...acc, hilite.label] : acc),
		[],
	);
	const [labelsWithVisibilityInfo, setLabelsWithVisibilityInfo] = React.useState<
		LabelWithVisibility[]
	>([...hiliteLabels, ...labels].map((label) => ({ ...label, visible: true })));
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
		const labelsWithVisibilityInfo = handleEditLabelVisibilities(
			hilites,
			labels,
			mapSizeInPixels,
			zoom,
		);
		setLabelsWithVisibilityInfo(labelsWithVisibilityInfo);
		if (setLabelsAreHidden)
			setLabelsAreHidden(labelsWithVisibilityInfo.some((label) => !label.visible));
	}, [hilites, labels, mode, setLabelsAreHidden, zoom]);
	useMapEvent('zoomend', checkEditVisibilities);
	React.useEffect(checkEditVisibilities, [checkEditVisibilities]);
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
			{labelsWithVisibilityInfo.map((label, i) =>
				label.type === 'point' ? (
					<PointLabel key={`${key} - ${i}`} label={label} mode={props.mode} scale={props.scale} />
				) : label.type === 'area' ? (
					<AreaLabel key={`${key} - ${i}`} label={label} mode={props.mode} scale={props.scale} />
				) : null,
			)}
		</svg>
	);
};

export default LabelsLayer;
