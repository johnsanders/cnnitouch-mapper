import { useMap, useMapEvent } from 'react-leaflet';
import { Label } from './types';
import { Point } from 'leaflet';
import React from 'react';

const paddingX = 8;
const paddingY = -3;
const pointerSize = 15;
const fontSize = 40;

const getPositionAtAngle = (angle: number, distance: number) => ({
	x: distance * Math.cos(angle),
	y: distance * Math.sin(angle),
});

interface Props {
	label: Label;
	scale: number;
}

const PointLabel: React.FC<Props> = (props: Props) => {
	const textRef = React.useRef<SVGTextElement>(null);
	const map = useMap();
	const { lat, lng } = props.label;
	const [angle, setAngle] = React.useState(Math.PI * 0.3);
	const [path, setPath] = React.useState('');
	const [position, setPosition] = React.useState(map.latLngToContainerPoint([lat, lng]));
	const offset = getPositionAtAngle(angle, fontSize + 20);
	React.useEffect(() => {
		if (!textRef.current) throw new Error('Cannot get text for label');
		const { height, width, x, y } = textRef.current.getBBox();
		setPath(`
			M 0,0
			L ${x - paddingX + pointerSize},${y - paddingY}
			L ${x + width + paddingX},${y - paddingY}
			L ${x + width + paddingX},${y + height + paddingY}
			L ${x - paddingX},${y + height + paddingY}
			L ${x - paddingX},${y - paddingY + pointerSize}
			Z
		`);
	}, []);
	useMapEvent('moveend', () => setPosition(map.latLngToContainerPoint([lat, lng])));
	return (
		<g className="label" transform={`translate(${position.x}, ${position.y})`}>
			<g transform={`scale(${props.scale})`}>
				<path d={path} fill="black" stroke="white" strokeWidth="1px" />
				<text
					{...offset}
					fill="white"
					fontFamily="CNN"
					fontSize={fontSize}
					fontWeight="500"
					ref={textRef}
				>
					{props.label.name}
				</text>
			</g>
		</g>
	);
};

export default PointLabel;
