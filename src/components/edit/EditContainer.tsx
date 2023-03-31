import { EditAction, EditSettings } from './types';
import Edit from './Edit';
import { LatLngBounds } from 'leaflet';
import React from 'react';
import { fps } from '../map/animator/config';

const defaultBounds = new LatLngBounds([
	[-57.84, -132.74],
	[69.21, 166.72],
]);

const initialState: EditSettings = {
	activeTab: 'boundsStart',
	mapSettings: {
		bannerText: '',
		boundsEnd: defaultBounds,
		boundsStart: defaultBounds,
		compHeight: 405,
		compWidth: 405 * 1.7777,
		fps,
		hilites: [],
		labels: [],
		mode: 'edit',
		subheadText: '',
		zoomDuration: 150,
	},
	showBanner: true,
};
const reducer = (state: EditSettings, action: EditAction) => {
	const { key, value } = action;
	let newState = { ...state };
	if (key === 'activeTab' || key === 'showBanner') newState = { ...state, [key]: value };
	else newState = { ...state, mapSettings: { ...state.mapSettings, [key]: value } };
	return newState;
};

const EditContainer: React.FC = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	return <Edit dispatch={dispatch} state={state} />;
};

export default EditContainer;
