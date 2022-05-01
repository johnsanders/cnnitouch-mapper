import { Easing, continueRender, delayRender, interpolate, useCurrentFrame } from 'remotion';
import { LatLngBoundsExpression } from 'leaflet';
import React from 'react';
import { useMap } from 'react-leaflet';

const easing = Easing.bezier(0.21, 0.84, 0, 1);
const fadeDuration = 15;

interface Props {
	endBounds: LatLngBoundsExpression;
	startBounds: LatLngBoundsExpression;
	zoomDuration: number;
}

const MapAnimator: React.FC<Props> = (props: Props) => {
	const prevZoomRef = React.useRef(0);
	const { endBounds, startBounds, zoomDuration } = props;
	const map = useMap();
	const frame = useCurrentFrame();
	const hilitesOut = zoomDuration * 0.5;
	const labelsIn = zoomDuration * 0.75;
	React.useEffect(() => {
		if (!startBounds || !endBounds) return;
		const delayId = delayRender();
		const hilitesOpacity = interpolate(frame, [hilitesOut, hilitesOut + fadeDuration], [1, 0], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});
		const hilitesPane = document.querySelector('.leaflet-overlay-pane') as HTMLDivElement;
		if (hilitesPane) hilitesPane.style.opacity = hilitesOpacity.toString();
		const labelsOpacity = interpolate(frame, [labelsIn, labelsIn + fadeDuration], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});
		const labelsPane = document.querySelector('#labels') as HTMLDivElement;
		if (labelsPane) labelsPane.style.opacity = labelsOpacity.toString();
		const bounds1Lat = interpolate(frame, [0, zoomDuration], [startBounds[0][0], endBounds[0][0]], {
			easing: easing,
			extrapolateRight: 'clamp',
		});
		const bounds1Lng = interpolate(frame, [0, zoomDuration], [startBounds[0][1], endBounds[0][1]], {
			easing: easing,
			extrapolateRight: 'clamp',
		});
		const bounds2Lat = interpolate(frame, [0, zoomDuration], [startBounds[1][0], endBounds[1][0]], {
			easing: easing,
			extrapolateRight: 'clamp',
		});
		const bounds2Lng = interpolate(frame, [0, zoomDuration], [startBounds[1][1], endBounds[1][1]], {
			easing: easing,
			extrapolateRight: 'clamp',
		});
		map.fitBounds([
			[bounds1Lat, bounds1Lng],
			[bounds2Lat, bounds2Lng],
		]);
		const currentZoom = map.getZoom();
		const delay = Math.floor(currentZoom) === Math.floor(prevZoomRef.current) ? 300 : 2000;
		setTimeout(() => continueRender(delayId), delay);
		prevZoomRef.current = currentZoom;
	}, [endBounds, frame, hilitesOut, labelsIn, map, startBounds, zoomDuration]);

	return null;
};

export default MapAnimator;
