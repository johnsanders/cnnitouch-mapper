import { HiliteAnimationConfig } from '../types';
import { LatLngBounds } from 'leaflet';
import { hiliteFadeOutThreshold } from './config';

const specialCases: { [key: string]: { ne: [number, number]; sw: [number, number] } } = {
	'United States of America': {
		ne: [71.41254400921397, -66],
		sw: [18.906055400595918, -179.14374202951348],
	},
};

const testHilitesAtFrame = (
	frame: number,
	hilitesAnimConfigs: HiliteAnimationConfig[],
	hiliteBounds: LatLngBounds[],
	mapBounds: LatLngBounds,
) => {
	hilitesAnimConfigs.forEach((hiliteAnimConfig, i) => {
		const correctedBounds = !specialCases[hiliteAnimConfig.name]
			? hiliteBounds[i]
			: new LatLngBounds(
					specialCases[hiliteAnimConfig.name].sw,
					specialCases[hiliteAnimConfig.name].ne,
			  );

		const hiliteSw = correctedBounds.getSouthWest();
		const hiliteNe = correctedBounds.getNorthEast();
		const hiliteMaxLat = hiliteNe.lat;
		const hiliteMaxLng = hiliteNe.lng;
		const hiliteMinLat = hiliteSw.lat;
		const hiliteMinLng = hiliteSw.lng;

		const mapSw = mapBounds.getSouthWest();
		const mapNe = mapBounds.getNorthEast();
		const mapMaxLat = mapNe.lat;
		const mapMaxLng = mapNe.lng;
		const mapMinLat = mapSw.lat;
		const mapMinLng = mapSw.lng;

		const mapLatDegrees = mapNe.lat - mapSw.lat;
		const mapLngDegrees = mapNe.lng - mapSw.lng;
		const mapDegreesArea = mapLatDegrees * mapLngDegrees;

		const offscreenDegreesNorth = Math.max(0, hiliteMaxLat - mapMaxLat);
		const offscreenDegreesEast = Math.max(0, hiliteMaxLng - mapMaxLng);
		const offscreenDegreesSouth = Math.max(0, mapMinLat - hiliteMinLat);
		const offscreenDegreesWest = Math.max(0, mapMinLng - hiliteMinLng);

		const hiliteFullLatDegrees = hiliteNe.lat - hiliteSw.lat;
		const hiliteFullLngDegrees = hiliteNe.lng - hiliteSw.lng;

		const hiliteVisibleLatDegrees =
			hiliteFullLatDegrees - offscreenDegreesNorth - offscreenDegreesSouth;
		const hiliteVisibleLngDegrees =
			hiliteFullLngDegrees - offscreenDegreesEast - offscreenDegreesWest;
		const hiliteDegreesArea = hiliteVisibleLatDegrees * hiliteVisibleLngDegrees;

		const hilitePercentOfScreen = hiliteDegreesArea / mapDegreesArea;

		if (hilitePercentOfScreen >= hiliteFadeOutThreshold) hiliteAnimConfig.endFrame = frame;
	});
};

export default testHilitesAtFrame;
