import { Label } from '../types';
import React from 'react';
import getDomId from '../../../misc/getDomId';
import getLabelHolderPath from './getLabelHolderPath';
import getLabelOffsetAtAngle from './getLabelOffsetAtAngle';
import { useMap } from 'react-leaflet';

const fontSize = 80;

interface Props {
	label: Label;
	scale: number;
}
const PointLabel: React.FC<Props> = (props: Props) => {
	const textRef = React.useRef<SVGTextElement>(null);
	const { angle, name } = props.label;
	const [path, setPath] = React.useState('');
	const [offset, setOffset] = React.useState({ x: 0, y: 0 });
	const map = useMap();
	React.useEffect(() => {
		if (!textRef.current) throw new Error('Cannot get text for label');
		const { height, width, x, y } = textRef.current.getBBox();
		setOffset(getLabelOffsetAtAngle(angle, width, fontSize, fontSize + 20));
		setPath(getLabelHolderPath(angle, x, y, width, height));
	}, [angle, path, name]);
	const initialPosition = map.latLngToContainerPoint([props.label.lat, props.label.lng]);
	return (
		<g
			className="label"
			id={getDomId('label', props.label.id)}
			style={{
				cursor: 'default',
				pointerEvents: 'all',
				transform: `translate3d(${initialPosition.x}px, ${initialPosition.y}px, 0)`,
			}}
		>
			<g transform={`scale(${props.scale})`}>
				<path d={path} fill="white" shapeRendering="geometricPrecision" />
				<text
					{...offset}
					fill="black"
					fontFamily="CNN"
					fontSize={fontSize}
					fontWeight="500"
					ref={textRef}
					shapeRendering="geometricPrecision"
					style={{ userSelect: 'none' }}
				>
					{props.label.name.toUpperCase()}
				</text>
			</g>
		</g>
	);
};

export default PointLabel;
