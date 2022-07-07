import { continueRender, delayRender } from 'remotion';
import { LabelWithVisibility } from '../../types';
import React from 'react';
import getDomId from '../../../misc/getDomId';
import getLabelHolderPath from './getLabelHolderPath';
import getLabelOffsetAtAngle from './getLabelOffsetAtAngle';
import getLabelOpacity from './getLabelOpacity';
import { useMap } from 'react-leaflet';

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
		label: { angle, lat, lng, name, visible },
		mode,
		scale,
	} = props;
	React.useEffect(() => {
		if (!textRef.current) throw new Error('Cannot get text for label');
		const { height, width, x, y } = textRef.current.getBBox();
		setOffset(getLabelOffsetAtAngle(angle, width, fontSize, fontSize + 20));
		const delayId = mode === 'render' ? delayRender() : 0;
		const timeoutMs = fontIsPrimed || mode === 'edit' ? 0 : 2000;
		const timeout = setTimeout(() => {
			fontIsPrimed = true;
			setPath(getLabelHolderPath(angle, x, y, width, height));
			continueRender(delayId);
		}, timeoutMs);
		return () => {
			continueRender(delayId);
			clearTimeout(timeout);
		};
	}, [angle, mode, name, path]);
	const initialPosition = map.latLngToContainerPoint([lat, lng]);
	return (
		<g
			className="label"
			id={getDomId('label', props.label.id)}
			style={{
				cursor: 'default',
				opacity: getLabelOpacity(mode, visible),
				pointerEvents: 'all',
				transform: `translate3d(${initialPosition.x}px, ${initialPosition.y}px, 0)`,
			}}
		>
			<g transform={`scale(${scale})`}>
				<path d={path} fill="white" shapeRendering="geometricPrecision" />
				<text
					{...offset}
					fill="black"
					fontFamily="CNN"
					fontSize={fontSize}
					fontWeight="500"
					opacity={path === '' ? 0 : 1}
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
