import { Bounds, Hilite, Label } from '../map/types';
import { LatLng } from 'leaflet';

export interface EditState {
	activeTab: TabName;
	bounds: [LatLng, LatLng];
	hilites: Hilite[];
	labels: Label[];
	mapDims: [number, number];
}

export type EditAction =
	| { key: 'activeTab'; value: string }
	| { key: 'bounds'; value: Bounds }
	| { key: 'hilites'; value: Hilite[] }
	| { key: 'labels'; value: Label[] }
	| { key: 'mapDims'; value: [number, number] };

export type TabName = 'bounds' | 'hilites' | 'labels' | 'render';
