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
		<>
			{props.labels.map((label) => (
				<PointLabel key={label.id} label={label} scale={props.scale} />
			))}
		</>
	);
	return createPortal(children, container);
};

export default LabelsLayer;
