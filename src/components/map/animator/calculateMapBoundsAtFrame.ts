import { LatLngBounds, LatLngBoundsLiteral } from 'leaflet';
import { interpolate } from 'remotion';

const calculateBoundsAtFrame = (
	frame: number,
	zoomDuration: number,
	startBounds: LatLngBounds,
	endBounds: LatLngBounds,
	easing: (t: number) => number,
): LatLngBoundsLiteral => {
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
	return [
		[southWestLat, southWestLng],
		[northEastLat, northEastLng],
	];
};

export default calculateBoundsAtFrame;
