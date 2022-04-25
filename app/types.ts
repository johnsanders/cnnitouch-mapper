import { LatLng } from 'leaflet';

export interface Hilite {
	name: string;
	type: string;
}

export type Bounds = [LatLng, LatLng];
