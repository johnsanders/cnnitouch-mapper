import { Hilite, MapSettings } from '../map/types';
import { Label } from '../map/labels/types';
import { LatLngBoundsExpression } from 'leaflet';

export interface EditSettings {
	activeTab: TabName;
	mapSettings: MapSettings;
	showBanner: boolean;
}

export type EditAction =
	| { key: 'activeTab'; value: TabName }
	| { key: 'bannerText' | 'subheadText'; value: string }
	| { key: 'bounds'; value: LatLngBoundsExpression }
	| { key: 'showBanner'; value: boolean }
	| { key: 'hilites'; value: Hilite[] }
	| { key: 'labels'; value: Label[] }
	| { key: 'mapDims'; value: [number, number] };

export type TabName = 'banner' | 'boundsStart' | 'boundsEnd' | 'hilites' | 'labels' | 'render';
