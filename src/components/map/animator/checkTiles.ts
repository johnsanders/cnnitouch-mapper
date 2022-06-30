import { LatLngBoundsLiteral, Map } from 'leaflet';
import waitFor from '../../../misc/waitFor';

const strategies = [
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
];

let running = false;
const checkTiles = async (map: Map, bounds: LatLngBoundsLiteral) =>
	new Promise<void>(async (resolve, reject) => {
		if (running) {
			console.log('checkTiles called, but we are already running');
			return;
		}
		running = true;
		const tilesAreMissing = () => {
			const tilesPending = document.querySelectorAll('[data-pending="1"]');
			return tilesPending.length > 0;
		};
		if (!tilesAreMissing()) {
			running = false;
			resolve();
			return;
		}
		let count = 0;
		for (const strategy of strategies) {
			count += 1;
			console.log(`Trying tile reload strategy ${count}`);
			await strategy(map, bounds).catch(() => (running = false));
			console.log(`Done with tile reload strategy ${count}`);
			if (!tilesAreMissing()) {
				running = false;
				resolve();
				break;
			}
			console.log('Tiles are missing.  Trying next strategy.');
		}
		running = false;
		if (tilesAreMissing()) reject('Failed to load tiles');
		else resolve();
	});

export default checkTiles;
