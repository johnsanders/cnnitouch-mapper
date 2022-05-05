import { Label } from './labels/types';
import { LatLngBounds } from 'leaflet';

export type Pos = [number, number];

export interface MapSettings {
	bannerText: string;
	boundsEnd: LatLngBounds;
	boundsStart: LatLngBounds;
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

export interface RenderSettings {
	bannerText: string;
	boundsEnd: string;
	boundsStart: string;
	hilites: Hilite[];
	labels: Label[];
	mode: 'render' | 'edit';
	subheadText: string;
	zoomDuration: number;
}
