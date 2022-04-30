import { Easing, continueRender, delayRender, interpolate, useCurrentFrame } from 'remotion';
import { LatLngBoundsExpression } from 'leaflet';
import React from 'react';
import { useMap } from 'react-leaflet';

const zoomDuration = 6 * 30;
const easing = Easing.bezier(0.21, 0.84, 0, 1);

interface Props {
	endBounds: LatLngBoundsExpression;
	startBounds: LatLngBoundsExpression;
}

const MapAnimator: React.FC<Props> = (props: Props) => {
	const prevZoomRef = React.useRef(0);
	const { endBounds, startBounds } = props;
	const map = useMap();
	const frame = useCurrentFrame();
	React.useEffect(() => {
		if (!startBounds || !endBounds) return;
		const delayId = delayRender();
		const hilitesOpacity = interpolate(frame, [zoomDuration / 2, zoomDuration / 2 + 15], [1, 0], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});
		const hilitesPane = document.querySelector('.leaflet-overlay-pane') as HTMLDivElement;
		if (hilitesPane) hilitesPane.style.opacity = hilitesOpacity.toString();
		const labelsOpacity = interpolate(frame, [zoomDuration - 60, zoomDuration - 45], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});
		const labelsPane = document.querySelector('#labels') as HTMLDivElement;
		if (labelsPane) labelsPane.style.opacity = labelsOpacity.toString();
		const bounds1Lat = interpolate(frame, [0, zoomDuration], [startBounds[0][0], endBounds[0][0]], {
			easing,
			extrapolateRight: 'clamp',
		});
		const bounds1Lng = interpolate(frame, [0, zoomDuration], [startBounds[0][1], endBounds[0][1]], {
			easing,
			extrapolateRight: 'clamp',
		});
		const bounds2Lat = interpolate(frame, [0, zoomDuration], [startBounds[1][0], endBounds[1][0]], {
			easing,
			extrapolateRight: 'clamp',
		});
		const bounds2Lng = interpolate(frame, [0, zoomDuration], [startBounds[1][1], endBounds[1][1]], {
			easing,
			extrapolateRight: 'clamp',
		});
		map.fitBounds([
			[bounds1Lat, bounds1Lng],
			[bounds2Lat, bounds2Lng],
		]);
		const currentZoom = map.getZoom();
		const delay = Math.floor(currentZoom) === Math.floor(prevZoomRef.current) ? 250 : 1000;
		setTimeout(() => continueRender(delayId), delay);
		prevZoomRef.current = currentZoom;
	}, [endBounds, frame, map, startBounds]);

	return null;
};

export default MapAnimator;
