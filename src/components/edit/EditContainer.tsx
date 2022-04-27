import { EditAction, EditSettings } from './types';
import Edit from './Edit';
import { LatLngBoundsExpression } from 'leaflet';
import React from 'react';

const defaultBounds: LatLngBoundsExpression = [
	[69.21, 166.72],
	[-57.84, -132.74],
];

const initialState: EditSettings = {
	activeTab: 'labels',
	mapSettings: {
		boundsEnd: defaultBounds,
		boundsStart: defaultBounds,
		hilites: [],
		labels: [],
	},
};

const reducer = (state: EditSettings, action: EditAction) => {
	const { key, value } = action;
	let newState = { ...state };
	if (key === 'activeTab') newState = { ...state, [key]: value };
	else {
		if (key === 'bounds') {
			if (state.activeTab === 'boundsStart')
				newState = { ...state, mapSettings: { ...state.mapSettings, boundsStart: value } };
			else newState = { ...state, mapSettings: { ...state.mapSettings, boundsEnd: value } };
		} else newState = { ...state, mapSettings: { ...state.mapSettings, [key]: value } };
	}
	return newState;
};

const EditContainer: React.FC = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	return <Edit dispatch={dispatch} state={state} />;
};

export default EditContainer;
