import { Label } from './types';
import React from 'react';
import { useMap } from 'react-leaflet';

interface Props {
	labels: Label[];
}

const LabelsLayer: React.FC<Props> = (props: Props) => {
	const map = useMap();
	return (
		<div
			style={{
				height: '100%',
				position: 'absolute',
				width: '100%',
				zIndex: 1000,
			}}
		>
			{props.labels.map((label) => {
				const pos = map.latLngToContainerPoint([label.lat, label.lng]);
				return (
					<div
						key={label.id}
						style={{
							backgroundColor: 'red',
							height: '10px',
							left: `${pos.x}px`,
							position: 'absolute',
							top: `${pos.y}px`,
							width: '10px',
						}}
					/>
				);
			})}
			<div style={{}} />
		</div>
	);
};

export default LabelsLayer;
