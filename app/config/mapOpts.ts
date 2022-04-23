import L from 'leaflet';
export const mapOpts: L.MapOptions = {
	doubleClickZoom: true,
	maxZoom: 18,
	minZoom: 1.5,
	scrollWheelZoom: true,
	zoomAnimation: true,
	zoomControl: true,
	zoomSnap: 0.01,
};
