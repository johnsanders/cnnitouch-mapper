import { EditAction, EditSettings } from './types';
import Edit from './Edit';
import { LatLngBounds } from 'leaflet';
import React from 'react';

const defaultBounds = new LatLngBounds([
	[-57.84, -132.74],
	[69.21, 166.72],
]);

const initialState: EditSettings = {
	activeTab: 'banner',
	mapSettings: {
		bannerText: '',
		boundsEnd: defaultBounds,
		boundsStart: defaultBounds,
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
	else {
		if (key === 'bounds') {
			if (state.activeTab === 'boundsStart')
				newState = {
					...state,
					mapSettings: { ...state.mapSettings, boundsStart: value },
				};
			else
				newState = {
					...state,
					mapSettings: { ...state.mapSettings, boundsEnd: value },
				};
		} else newState = { ...state, mapSettings: { ...state.mapSettings, [key]: value } };
	}
	return newState;
};

const EditContainer: React.FC = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	return <Edit dispatch={dispatch} state={state} />;
};

export default EditContainer;
