import { Label } from './labels/types';
import { LatLngBoundsExpression } from 'leaflet';

export type Pos = [number, number];

export interface MapSettings {
	bannerText: string;
	boundsEnd: LatLngBoundsExpression;
	boundsStart: LatLngBoundsExpression;
	hilites: Hilite[];
	labels: Label[];
	mode: 'render' | 'edit';
	subheadText: string;
	zoomDuration: number;
}

export interface Hilite {
	id: string;
	label?: Label;
	name: string;
}
