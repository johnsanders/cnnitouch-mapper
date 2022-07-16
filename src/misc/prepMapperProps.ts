import { LatLngBounds } from 'leaflet';
import { MapSettingsInput } from '../types';

const prepMapperProps = (renderSettings: MapSettingsInput) => {
	const boundsEndString = renderSettings.boundsEnd || '0,0,0,0';
	const boundsStartString = renderSettings.boundsStart || '0,0,0,0';
	const boundsEnd = boundsEndString.split(',').map((string) => parseFloat(string));
	const boundsStart = boundsStartString.split(',').map((string) => parseFloat(string));
	const props = {
		...renderSettings,
		boundsEnd: new LatLngBounds([boundsEnd[1], boundsEnd[0]], [boundsEnd[3], boundsEnd[2]]),
		boundsStart: new LatLngBounds(
			[boundsStart[1], boundsStart[0]],
			[boundsStart[3], boundsStart[2]],
		),
		compHeight: renderSettings.compHeight || 2160,
		compWidth: renderSettings.compWidth || 3840,
		fps: renderSettings.fps || 30,
	};
	return props;
};

export default prepMapperProps;
