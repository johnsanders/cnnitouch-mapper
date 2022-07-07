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

export interface Label {
	angle: number;
	iconType: 'none' | 'redStar' | 'redDot';
	id: string;
	minZoom: number;
	name: string;
	lat: number;
	lng: number;
	type: 'area' | 'point';
}
export interface LabelWithVisibility extends Label {
	visible: boolean;
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

export interface LabelAnimationConfig {
	getElement: () => HTMLElement;
	hiliteEl?: HTMLElement;
	id: string;
	isHiliteLabel: boolean;
	lat: number;
	lng: number;
	minZoom: number;
	startFrame: number | null;
}

export interface HiliteAnimationConfig {
	element: SVGPathElement;
	endFrame: number;
	id: string;
	name: string;
}
