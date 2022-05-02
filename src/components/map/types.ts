import { LatLngBoundsExpression } from 'leaflet';

export type Pos = [number, number];

export interface MapSettings {
	bannerText: string;
	boundsEnd: LatLngBoundsExpression;
	boundsStart: LatLngBoundsExpression;
	disableDrag: boolean;
	hilites: Hilite[];
	labels: Label[];
	mode: 'render' | 'edit';
	subheadText: string;
	zoomDuration: number;
}

export interface Hilite {
	name: string;
	type: string;
}

export interface Label {
	angle: number;
	iconType: 'none' | 'redStar' | 'redDot';
	id: string;
	name: string;
	lat: number;
	lng: number;
	relativePosition: Pos;
}
