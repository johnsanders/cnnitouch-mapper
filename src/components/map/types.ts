import { LatLngBoundsExpression } from 'leaflet';

export type Pos = [number, number];

export interface MapSettings {
	boundsEnd: LatLngBoundsExpression;
	boundsStart: LatLngBoundsExpression;
	hilites: Hilite[];
	labels: Label[];
	mode: 'renderMap' | 'renderOverlay' | 'edit';
}

export interface Hilite {
	name: string;
	type: string;
}

export interface Label {
	iconType: 'none' | 'redStar' | 'redDot';
	id: string;
	name: string;
	lat: number;
	lng: number;
	relativePosition: Pos;
}
