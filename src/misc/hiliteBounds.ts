import { LatLngBoundsLiteral } from 'leaflet';
import hiliteBoundsBase from './hiliteBoundsBase';
import hiliteBoundsSpecialCases from './hiliteBoundsSpecialCases';

const hiliteBounds: { [key: string]: LatLngBoundsLiteral } = {
	...hiliteBoundsBase,
	...hiliteBoundsSpecialCases,
};

export default hiliteBounds;
