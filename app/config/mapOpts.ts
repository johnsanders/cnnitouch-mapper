import { MapOptions } from 'leaflet';

const mapOpts: MapOptions = {
	doubleClickZoom: true,
	maxZoom: 18,
	minZoom: 1.5,
	scrollWheelZoom: true,
	zoomAnimation: true,
	zoomControl: true,
	zoomSnap: 0,
};

export default mapOpts;
