import { LatLngBounds } from 'leaflet';

export type Pos = [number, number];

export interface MapSettings {
	bannerText: string;
	boundsEnd: LatLngBounds;
	boundsStart: LatLngBounds;
	compHeight: number;
	compWidth: number;
	fps: number;
	hilites: Hilite[];
	labels: Label[];
	mode: 'render' | 'edit';
	subheadText: string;
	zoomDuration: number;
}
export type MapSettingsInput = Omit<
	MapSettings,
	'boundsEnd' | 'boundsStart' | 'compHeight' | 'compWidth' | 'fps'
> & {
	boundsEnd: string;
	boundsStart: string;
	compHeight?: number;
	compWidth?: number;
	fps?: number;
};
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
export interface LabelAnimationConfig {
	getElement: () => HTMLElement;
	label: Label;
	hiliteEl?: HTMLElement;
	isHiliteLabel: boolean;
	startFrame: number | null;
	visible?: boolean;
}
export interface HiliteAnimationConfig {
	element: SVGPathElement;
	endFrame: number;
	id: string;
	name: string;
}
export interface Bounds {
	bottom: number;
	left: number;
	right: number;
	top: number;
}
