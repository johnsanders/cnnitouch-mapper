import { LatLngBoundsLiteral, Map } from 'leaflet';
import waitFor from '../../../../misc/waitFor';

const strategies = [
	async (map: Map, bounds: LatLngBoundsLiteral) => {
		console.log('Zomming out');
		map.setZoom(map.getZoom() - 1);
		await waitFor(2000);
		console.log('Resetting zoom');
		map.fitBounds(bounds);
		await waitFor(3000);
		console.log('Finished strategy 1');
	},
	/*
	async (map: Map, bounds: LatLngBoundsLiteral) => {
		console.log('Zomming out');
		map.setZoom(1);
		await waitFor(2000);
		console.log('Resetting zoom');
		map.fitBounds(bounds);
		await waitFor(3000);
		console.log('Finished strategy 1');
	},
	async (map: Map, bounds: LatLngBoundsLiteral) => {
		map.setZoom(10);
		map.panTo([51.51, -0.08]);
		await waitFor(2000);
		map.fitBounds(bounds);
		await waitFor(3000);
	},
	async (map: Map, bounds: LatLngBoundsLiteral) => {
		map.setZoom(1);
		await waitFor(2000);
		map.fitBounds(bounds);
		await waitFor(3000);
	},
	async (map: Map, bounds: LatLngBoundsLiteral) => {
		map.setZoom(10);
		map.panTo([41.3, -97.9]);
		await waitFor(2000);
		map.fitBounds(bounds);
		await waitFor(3000);
	},
	*/
];

export default strategies;
