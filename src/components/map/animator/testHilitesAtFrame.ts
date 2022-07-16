import { HiliteAnimationConfig } from '../../../types';
import { LatLngBounds } from 'leaflet';
import calcAggregateBounds from './calcAggregateBounds';
import hiliteBoundsSpecialCases from '../../../misc/hiliteBoundsSpecialCases';
import { hiliteFadeOutThreshold } from './config';

export const boundsExceedsThreshold = (hiliteBounds: LatLngBounds, mapBounds: LatLngBounds) => {
	const hiliteSw = hiliteBounds.getSouthWest();
	const hiliteNe = hiliteBounds.getNorthEast();
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
	return hilitePercentOfScreen >= hiliteFadeOutThreshold;
};

const testHilitesAtFrame = (
	frame: number,
	hilitesAnimConfigs: HiliteAnimationConfig[],
	hiliteBounds: LatLngBounds[],
	mapBounds: LatLngBounds,
) => {
	const correctedHiliteBounds = hilitesAnimConfigs.map((hiliteAnimConfig, i) =>
		!hiliteBoundsSpecialCases[hiliteAnimConfig.name]
			? hiliteBounds[i]
			: new LatLngBounds(hiliteBoundsSpecialCases[hiliteAnimConfig.name]),
	);
	const aggregateBounds = calcAggregateBounds(correctedHiliteBounds);
	if (boundsExceedsThreshold(aggregateBounds, mapBounds))
		hilitesAnimConfigs.forEach((hiliteAnimConfig) => (hiliteAnimConfig.endFrame = frame));
};

export default testHilitesAtFrame;
