import { continueRender, delayRender } from 'remotion';
import AreaLabel from './AreaLabel';
import { Label } from '../types';
import PointLabel from './PointLabel';
import React from 'react';
import { useMap } from 'react-leaflet';

const fontPrimer = (
	<div style={{ fontFamily: 'CNN', fontWeight: '500', opacity: 0 }}>Font Primer</div>
);

interface Props {
	labels: Label[];
	mode: 'edit' | 'render';
	scale: number;
}

const LabelsLayer: React.FC<Props> = (props: Props) => {
	const [ready, setReady] = React.useState(false);
	const mapZoom = useMap().getZoom();
	const { mode } = props;
	React.useEffect(() => {
		if (mode === 'edit') {
			setReady(true);
			return;
		}
		const delayId = delayRender();
		setTimeout(() => {
			setReady(true);
			continueRender(delayId);
		}, 500);
		return () => continueRender(delayId);
	}, [mode]);
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
			{props.labels.map((label) =>
				mapZoom < label.minZoom ? null : label.type === 'point' ? (
					<PointLabel key={label.id} label={label} scale={props.scale} />
				) : label.type === 'area' ? (
					<AreaLabel key={label.id} label={label} scale={props.scale} />
				) : null,
			)}
		</svg>
	);
};

export default LabelsLayer;
