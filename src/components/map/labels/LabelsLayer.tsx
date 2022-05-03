import { continueRender, delayRender } from 'remotion';
import { Label } from './types';
import PointLabel from './PointLabel';
import React from 'react';
import { createPortal } from 'react-dom';

const fontPrimer = <div style={{ fontFamily: 'CNN', fontWeight: '500' }}>Font Primer</div>;

interface Props {
	labels: Label[];
	mode: 'edit' | 'render';
	scale: number;
}

const LabelsLayer: React.FC<Props> = (props: Props) => {
	const [ready, setReady] = React.useState(false);
	React.useEffect(() => {
		const delayId = delayRender();
		setTimeout(() => {
			setReady(true);
			continueRender(delayId);
		}, 1000);
	});
	const container = document.getElementById('labels');
	if (!container) return null;
	const children = !ready ? (
		fontPrimer
	) : (
		<svg
			id="labels"
			style={{
				filter: 'drop-shadow(0 0 6px #000000A0)',
				height: '100%',
				left: 0,
				opacity: props.mode === 'render' ? 0 : 1,
				pointerEvents: 'none',
				position: 'absolute',
				top: 0,
				width: '100%',
				zIndex: 500,
			}}
		>
			{props.labels.map((label) => (
				<PointLabel key={label.id} label={label} scale={props.scale} />
			))}
		</svg>
	);
	return createPortal(children, container);
};

export default LabelsLayer;