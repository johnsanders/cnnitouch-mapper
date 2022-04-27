import { Label } from './types';
import PointLabel from './PointLabel';
import React from 'react';

interface Props {
	labels: Label[];
}

const LabelsLayer: React.FC<Props> = (props: Props) => (
	<svg
		style={{
			filter: 'drop-shadow(0 0 6px #000000A0)',
			height: '100%',
			position: 'absolute',
			width: '100%',
			zIndex: 1000,
		}}
	>
		{props.labels.map((label) => (
			<PointLabel key={label.id} label={label} />
		))}
	</svg>
);

export default LabelsLayer;
