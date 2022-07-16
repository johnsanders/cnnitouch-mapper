import { LatLngBoundsLiteral, Map } from 'leaflet';
import strategies from './strategies';
import tilesAreMissing from './tilesAreMissing';

let running = false;
const checkTiles = async (map: Map, bounds: LatLngBoundsLiteral) =>
	new Promise<void>(async (resolve, reject) => {
		if (running) {
			console.log('checkTiles called, but we are already running');
			return;
		}
		running = true;
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
		if (tilesAreMissing()) reject('Failed to load tiles');
		else resolve();
		resolve();
	});

export default checkTiles;
