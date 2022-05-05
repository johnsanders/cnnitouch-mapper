import { useMap, useMapEvent } from 'react-leaflet';
import { KalmanFilter } from 'kalman-filter';
import { Label } from './types';
import React from 'react';
import getLabelHolderPath from './getLabelHolderPath';
import getLabelOffsetAtAngle from './getLabelOffsetAtAngle';
import redDot from '../../../img/redCityDot.png';
import redStar from '../../../img/capitalCityDot.png';

const kalmanFilter = new KalmanFilter({
	dynamic: {
		covariance: [3, 4],
		name: 'constant-position',
	},
	observation: {
		name: 'sensor',
		sensorDimension: 2,
	},
});
const icons = { redDot, redStar };
const iconSize = 40;
const fontSize = 40;

interface Props {
	label: Label;
	scale: number;
}
const PointLabel: React.FC<Props> = (props: Props) => {
	const prevCorrectedRef = React.useRef(null);
	const textRef = React.useRef<SVGTextElement>(null);
	const map = useMap();
	const { angle, lat, lng, name } = props.label;
	const [path, setPath] = React.useState('');
	const [offset, setOffset] = React.useState({ x: 0, y: 0 });
	const [position, setPosition] = React.useState({ x: 0, y: 0 });
	React.useEffect(() => {
		const { x, y } = map.latLngToContainerPoint([lat, lng]);
		setPosition({ x, y });
		const correctedPosition = kalmanFilter.filter({
			observation: [x, y],
			previousCorrected: prevCorrectedRef.current,
		});
		prevCorrectedRef.current = correctedPosition;
	}, [lat, lng, map]);
	React.useEffect(() => {
		if (!textRef.current) throw new Error('Cannot get text for label');
		const { height, width, x, y } = textRef.current.getBBox();
		setOffset(getLabelOffsetAtAngle(angle, width, height, fontSize + 20));
		setPath(getLabelHolderPath(angle, x, y, width, height));
	}, [angle, name, path]);
	useMapEvent('move', () => {
		if (map.getZoom() < 2) return;
		const position = map.latLngToContainerPoint([lat, lng]);
		const correctedPosition = kalmanFilter.filter({
			observation: [position.x, position.y],
			previousCorrected: prevCorrectedRef.current,
		});
		setPosition({ x: correctedPosition.mean[0][0], y: correctedPosition.mean[1][0] });
		prevCorrectedRef.current = correctedPosition;
	});
	return (
		<g
			className="label"
			style={{
				cursor: 'default',
				pointerEvents: 'all',
				transform: `translate3d(${position.x}px, ${position.y}px, 0`,
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
					strokeWidth="1px"
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
