import { Easing, continueRender, delayRender, interpolate, useCurrentFrame } from 'remotion';
import { LatLngBoundsExpression } from 'leaflet';
import React from 'react';
import { useMap } from 'react-leaflet';

const zoomDuration = 10 * 30;

const defaultBounds: LatLngBoundsExpression = [
	[69.77895, 174.726562],
	[-69.2872, -174.023437],
];

interface Props {
	endBounds?: LatLngBoundsExpression;
	startBounds?: LatLngBoundsExpression;
}

const MapAnimator: React.FC<Props> = (props: Props) => {
	const startBounds = props.startBounds || defaultBounds;
	const endBounds = props.endBounds || defaultBounds;
	const map = useMap();
	const frame = useCurrentFrame();
	React.useEffect(() => {
		if (!startBounds || !endBounds) return;
		const delayId = delayRender();
		const bounds1Lat = interpolate(frame, [0, zoomDuration], [startBounds[0][0], endBounds[0][0]], {
			easing: Easing.inOut(Easing.sin),
			extrapolateRight: 'clamp',
		});
		const bounds1Lng = interpolate(frame, [0, zoomDuration], [startBounds[0][1], endBounds[0][1]], {
			easing: Easing.inOut(Easing.sin),
			extrapolateRight: 'clamp',
		});
		const bounds2Lat = interpolate(frame, [0, zoomDuration], [startBounds[1][0], endBounds[1][0]], {
			easing: Easing.inOut(Easing.sin),
			extrapolateRight: 'clamp',
		});
		const bounds2Lng = interpolate(frame, [0, zoomDuration], [startBounds[1][1], endBounds[1][1]], {
			easing: Easing.inOut(Easing.sin),
			extrapolateRight: 'clamp',
		});
		map.fitBounds([
			[bounds1Lat, bounds1Lng],
			[bounds2Lat, bounds2Lng],
		]);
		setTimeout(() => continueRender(delayId), 100);
	});

	return null;
};

export default MapAnimator;
