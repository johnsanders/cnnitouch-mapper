import { Easing, continueRender, delayRender, interpolate, useCurrentFrame } from 'remotion';
import { LatLngBounds } from 'leaflet';
import React from 'react';
import { useMap } from 'react-leaflet';

const easing = Easing.bezier(0.21, 0.84, 0, 1);
const hiliteZoomThreshold = 8;
const fadeDuration = 15;

interface Props {
	endBounds: LatLngBounds;
	startBounds: LatLngBounds;
	zoomDuration: number;
}

const MapAnimator: React.FC<Props> = (props: Props) => {
	const prevZoomRef = React.useRef(0);
	const hiliteFadeStartFrameRef = React.useRef<number>();
	const { endBounds, startBounds, zoomDuration } = props;
	const map = useMap();
	const frame = useCurrentFrame();
	const labelsIn = zoomDuration * 0.3;
	React.useEffect(() => {
		if (!startBounds || !endBounds) return;
		const delayId = delayRender();
		const currentZoom = map.getZoom();
		console.log(currentZoom);
		if (currentZoom > hiliteZoomThreshold) {
			console.log('yep');
			if (!hiliteFadeStartFrameRef.current) hiliteFadeStartFrameRef.current = frame;
			console.log('transframe', frame - hiliteFadeStartFrameRef.current);
			const hilitesOpacity = interpolate(
				frame - hiliteFadeStartFrameRef.current,
				[0, fadeDuration],
				[1, 0],
				{
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				},
			);
			console.log('opacity', hilitesOpacity);
			const hilitesPane = document.querySelector('.leaflet-overlay-pane') as HTMLDivElement;
			if (hilitesPane) hilitesPane.style.opacity = hilitesOpacity.toString();
		}
		const labelsOpacity = interpolate(frame, [labelsIn, labelsIn + fadeDuration], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});
		const labelsPane = document.querySelector('#labels') as HTMLDivElement;
		if (labelsPane) labelsPane.style.opacity = labelsOpacity.toString();
		const startSouthWest = startBounds.getSouthWest();
		const startNorthEast = startBounds.getNorthEast();
		const endSouthWest = endBounds.getSouthWest();
		const endNorthEast = endBounds.getNorthEast();
		const southWestLat = interpolate(
			frame,
			[0, zoomDuration],
			[startSouthWest.lat, endSouthWest.lat],
			{
				easing: easing,
				extrapolateRight: 'clamp',
			},
		);
		const southWestLng = interpolate(
			frame,
			[0, zoomDuration],
			[startSouthWest.lng, endSouthWest.lng],
			{
				easing: easing,
				extrapolateRight: 'clamp',
			},
		);
		const northEastLat = interpolate(
			frame,
			[0, zoomDuration],
			[startNorthEast.lat, endNorthEast.lat],
			{
				easing: easing,
				extrapolateRight: 'clamp',
			},
		);
		const northEastLng = interpolate(
			frame,
			[0, zoomDuration],
			[startNorthEast.lng, endNorthEast.lng],
			{
				easing: easing,
				extrapolateRight: 'clamp',
			},
		);
		map.fitBounds([
			[southWestLat, southWestLng],
			[northEastLat, northEastLng],
		]);
		const delay = Math.floor(currentZoom) === Math.floor(prevZoomRef.current) ? 10 : 2000;
		setTimeout(async () => {
			// TODO: move this to its own promise returning function that tries mulitple fixes
			const tilesPending = document.querySelectorAll('[data-pending="1"]');
			if (tilesPending.length === 0) continueRender(delayId);
			else {
				map.setZoom(1);
				setTimeout(() => {
					map.fitBounds([
						[southWestLat, southWestLng],
						[northEastLat, northEastLng],
					]);
					setTimeout(() => continueRender(delayId), 5000);
				}, 5000);
			}
		}, delay);
		prevZoomRef.current = currentZoom;
	}, [endBounds, frame, labelsIn, map, startBounds, zoomDuration]);

	return null;
};

export default MapAnimator;
