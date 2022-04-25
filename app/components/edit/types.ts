import { Bounds, Hilite } from '../../types';
import { LatLng } from 'leaflet';

export interface EditState {
	activeTab: TabName;
	bounds: [LatLng, LatLng];
	hilites: Hilite[];
	mapDims: [number, number];
}

export type EditAction =
	| { key: 'activeTab'; value: string }
	| { key: 'bounds'; value: Bounds }
	| { key: 'hilites'; value: Hilite[] }
	| { key: 'mapDims'; value: [number, number] };

export type TabName = 'bounds' | 'hilites' | 'labels' | 'render';
