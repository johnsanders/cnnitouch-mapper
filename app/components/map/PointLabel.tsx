import { Label } from './types';
import React from 'react';
import { useMap } from 'react-leaflet';

const paddingX = 5;
const paddingY = -3;
const pointerSize = 15;
const fontSize = 25;

const getPositionAtAngle = (angle: number, distance: number) => ({
	x: distance * Math.cos(angle),
	y: distance * Math.sin(angle),
});

interface Props {
	label: Label;
}

const PointLabel: React.FC<Props> = (props: Props) => {
	const textRef = React.useRef<SVGTextElement>(null);
	const [angle, setAngle] = React.useState(Math.PI * 0.25);
	const [path, setPath] = React.useState('');
	const position = useMap().latLngToContainerPoint([props.label.lat, props.label.lng]);
	const offset = getPositionAtAngle(angle, fontSize + 20);
	const { name } = props.label;
	React.useEffect(() => {
		if (!textRef.current) throw new Error(`Cannot get text for label ${name}`);
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
	}, [name]);
	return (
		<g className="label" transform={`translate(${position.x}, ${position.y})`}>
			<path d={path} fill="black" stroke="white" strokeWidth="1px" />
			<text
				{...offset}
				fill="white"
				fontFamily="CNN"
				fontSize="25px"
				fontWeight="500"
				ref={textRef}
			>
				{props.label.name}
			</text>
		</g>
	);
};

export default PointLabel;
