import { Hilite, Label, MapSettings } from '../map/types';
import { LatLngBounds } from 'leaflet';

export interface EditSettings {
	activeTab: TabName;
	mapSettings: MapSettings;
	showBanner: boolean;
}

export type EditAction =
	| { key: 'activeTab'; value: TabName }
	| { key: 'bannerText' | 'subheadText'; value: string }
	| { key: 'bounds'; value: LatLngBounds }
	| { key: 'showBanner'; value: boolean }
	| { key: 'hilites'; value: Hilite[] }
	| { key: 'labels'; value: Label[] }
	| { key: 'mapDims'; value: [number, number] };

export type TabName = 'banner' | 'boundsStart' | 'boundsEnd' | 'hilites' | 'labels' | 'render';

export interface RenderState {
	confirmText: string;
	email: string;
	errorText: string;
	loading: boolean;
	playback: { ATL: boolean; DC: boolean; NYH: boolean };
	slug: string;
	submitted: boolean;
}
export interface RenderAction {
	key:
		| 'confirmText'
		| 'email'
		| 'errorText'
		| 'loading'
		| 'playbackATL'
		| 'playbackNYH'
		| 'playbackDC'
		| 'slug'
		| 'submitted';
	value: string | boolean;
}
