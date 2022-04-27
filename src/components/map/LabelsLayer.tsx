import { Label } from './types';
import PointLabel from './PointLabel';
import React from 'react';

interface Props {
	labels: Label[];
	scale: number;
}

const LabelsLayer: React.FC<Props> = (props: Props) => (
	<svg
		style={{
			filter: 'drop-shadow(0 0 6px #000000A0)',
			height: '100%',
			position: 'absolute',
			width: '100%',
			zIndex: 500,
		}}
	>
		{props.labels.map((label) => (
			<PointLabel key={label.id} label={label} scale={props.scale} />
		))}
	</svg>
);

export default LabelsLayer;
