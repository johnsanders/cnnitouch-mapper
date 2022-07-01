import { LatLngBounds } from 'leaflet';

const hiliteBoundsSpecialCases: { [key: string]: LatLngBounds } = {
	'United States of America': new LatLngBounds(
		[18.906055400595918, -179.14374202951348],
		[71.41254400921397, -66],
	),
	// TODO:  we need Russia here
};

export default hiliteBoundsSpecialCases;
