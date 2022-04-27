import { Hilite, Label, MapSettings } from '../map/types';
import { LatLngBoundsExpression } from 'leaflet';

export interface EditSettings {
	activeTab: TabName;
	mapSettings: MapSettings;
}

export type EditAction =
	| { key: 'activeTab'; value: TabName }
	| { key: 'bounds'; value: LatLngBoundsExpression }
	| { key: 'hilites'; value: Hilite[] }
	| { key: 'labels'; value: Label[] }
	| { key: 'mapDims'; value: [number, number] };

export type TabName = 'boundsStart' | 'boundsEnd' | 'hilites' | 'labels' | 'render';
