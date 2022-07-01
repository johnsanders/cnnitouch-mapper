import { LatLngBoundsLiteral } from 'leaflet';

const hiliteBoundsSpecialCases: { [key: string]: LatLngBoundsLiteral } = {
	'United States of America': [
		[18.906055400595918, -179.14374202951348],
		[71.41254400921397, -66],
	],
	// TODO:  we need Russia here
};

export default hiliteBoundsSpecialCases;
