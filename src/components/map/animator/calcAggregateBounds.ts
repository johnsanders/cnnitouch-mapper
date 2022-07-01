import { LatLngBounds } from 'leaflet';

const calcAggregateBounds = (allBounds: LatLngBounds[]) => {
	const ret = {
		maxLat: -90,
		maxLng: -180,
		minLat: 90,
		minLng: 180,
	};
	allBounds.forEach((bounds) => {
		const sw = bounds.getSouthWest();
		const ne = bounds.getNorthEast();
		ret.minLng = Math.min(ret.minLng, sw.lng);
		ret.minLat = Math.min(ret.minLat, sw.lat);
		ret.maxLat = Math.max(ret.maxLat, ne.lat);
		ret.maxLng = Math.max(ret.maxLng, ne.lng);
	});
	return new LatLngBounds([
		[ret.minLat, ret.minLng],
		[ret.maxLat, ret.maxLng],
	]);
};

export default calcAggregateBounds;
