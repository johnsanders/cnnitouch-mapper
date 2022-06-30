import { Label } from '../types';
import React from 'react';
import getDomId from '../../../misc/getDomId';
import getLabelHolderPath from './getLabelHolderPath';
import getLabelOffsetAtAngle from './getLabelOffsetAtAngle';
import redDot from '../../../img/redCityDot.png';
import redStar from '../../../img/capitalCityDot.png';

const icons = { redDot, redStar };
const iconSize = 80;
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
	React.useEffect(() => {
		if (!textRef.current) throw new Error('Cannot get text for label');
		const { height, width, x, y } = textRef.current.getBBox();
		setOffset(getLabelOffsetAtAngle(angle, width, height, fontSize + 20));
		setPath(getLabelHolderPath(angle, x, y, width, height));
	}, [angle, name, path]);
	return (
		<g
			className="label"
			id={getDomId('label', props.label.id)}
			style={{
				cursor: 'default',
				pointerEvents: 'all',
			}}
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
				<path
					d={path}
					fill="black"
					shapeRendering="geometricPrecision"
					stroke="white"
					strokeWidth="2px"
				/>
				<text
					{...offset}
					fill="white"
					fontFamily="CNN"
					fontSize={fontSize}
					fontWeight="500"
					ref={textRef}
					shapeRendering="geometricPrecision"
					style={{ userSelect: 'none' }}
				>
					{props.label.name}
				</text>
			</g>
		</g>
	);
};

export default PointLabel;
