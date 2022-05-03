import { useMap, useMapEvent } from 'react-leaflet';
import { Label } from './types';
import React from 'react';
import getLabelHolderPath from './getLabelHolderPath';
import getLabelOffsetAtAngle from './getLabelOffsetAtAngle';
import redDot from '../../../img/redCityDot.png';
import redStar from '../../../img/capitalCityDot.png';

const icons = { redDot, redStar };
const iconSize = 40;
const fontSize = 40;

interface Props {
	label: Label;
	scale: number;
}
const PointLabel: React.FC<Props> = (props: Props) => {
	const textRef = React.useRef<SVGTextElement>(null);
	const map = useMap();
	const { angle, lat, lng, name } = props.label;
	const [path, setPath] = React.useState('');
	const [offset, setOffset] = React.useState({ x: 0, y: 0 });
	const [position, setPosition] = React.useState(map.latLngToContainerPoint([lat, lng]));
	React.useEffect(() => {
		if (!textRef.current) throw new Error('Cannot get text for label');
		const { height, width, x, y } = textRef.current.getBBox();
		setOffset(getLabelOffsetAtAngle(angle, width, height, fontSize + 20));
		setPath(getLabelHolderPath(angle, x, y, width, height));
	}, [angle, name, path]);
	useMapEvent('move', () => setPosition(map.latLngToContainerPoint([lat, lng])));
	return (
		<g
			className="label"
			style={{ cursor: 'default', pointerEvents: 'all' }}
			transform={`translate(${position.x}, ${position.y})`}
		>
			<g transform={`scale(${props.scale})`}>
				{props.label.iconType === 'none' ? null : (
					<image
						height={iconSize}
						href={icons[props.label.iconType]}
						width={iconSize}
						x={-iconSize / 2}
						y={-iconSize / 2}
					/>
				)}
				<path d={path} fill="black" stroke="white" strokeWidth="1px" />
				<text
					{...offset}
					fill="white"
					fontFamily="CNN"
					fontSize={fontSize}
					fontWeight="500"
					ref={textRef}
					style={{ userSelect: 'none' }}
				>
					{props.label.name}
				</text>
			</g>
		</g>
	);
};

export default PointLabel;
