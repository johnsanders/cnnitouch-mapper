import { continueRender, delayRender } from 'remotion';
import { LabelWithVisibility } from '../../../types';
import React from 'react';
import getDomId from '../../../misc/getDomId';
import getLabelHolderPath from './getLabelHolderPath';
import getLabelOffsetAtAngle from './getLabelOffsetAtAngle';
import getLabelOpacity from './getLabelOpacity';
import redDot from '../../../img/redCityDot.png';
import redStar from '../../../img/capitalCityDot.png';
import { useMap } from 'react-leaflet';

const icons = { redDot, redStar };
const iconSize = 80;
const fontSize = 80;
let fontIsPrimed = false;

interface Props {
	label: LabelWithVisibility;
	mode: 'edit' | 'render';
	scale: number;
}
const PointLabel: React.FC<Props> = (props: Props) => {
	const textRef = React.useRef<SVGTextElement>(null);
	const [path, setPath] = React.useState('');
	const [offset, setOffset] = React.useState({ x: 0, y: 0 });
	const map = useMap();
	const {
		label: { angle, iconType, id, lat, lng, name, visible },
		mode,
		scale,
	} = props;
	React.useEffect(() => {
		if (!textRef.current) throw new Error('Cannot get text for label');
		const { height, width, x, y } = textRef.current.getBBox();
		setOffset(getLabelOffsetAtAngle(angle, width, height, fontSize + 20));
		setPath(getLabelHolderPath(angle, x, y, width, height));
		if (!fontIsPrimed && mode === 'render') {
			const delayId = mode === 'render' ? delayRender() : 0;
			const timeout = setTimeout(() => {
				fontIsPrimed = true;
				setPath(getLabelHolderPath(angle, x, y, width, height));
				continueRender(delayId);
			}, 2000);
			return () => {
				continueRender(delayId);
				clearTimeout(timeout);
			};
		}
	}, [angle, name, mode, path]);
	const initialPosition = map.latLngToContainerPoint([lat, lng]);
	return (
		<g
			className="label"
			id={getDomId('label', id)}
			style={{
				cursor: 'default',
				opacity: getLabelOpacity(mode, visible),
				pointerEvents: 'all',
				transform: `translate3d(${initialPosition.x}px, ${initialPosition.y}px, 0)`,
			}}
		>
			<g transform={`scale(${scale})`}>
				{iconType === 'none' ? null : (
					<image
						height={iconSize}
						href={icons[iconType]}
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
