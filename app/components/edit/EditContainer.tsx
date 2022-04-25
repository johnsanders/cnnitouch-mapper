import { EditAction, EditState } from './types';
import Edit from './Edit';
import { LatLng } from 'leaflet';
import React from 'react';

const initialState: EditState = {
	activeTab: 'bounds',
	bounds: [new LatLng(1, 1), new LatLng(1, 1)],
	hilites: [],
	labels: [],
	mapDims: [1280, 720],
};
const reducer = (state: EditState, action: EditAction) => {
	const newState = {
		...state,
		[action.key]: action.value,
	};
	return newState;
};

const EditContainer: React.FC = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	return <Edit dispatch={dispatch} state={state} />;
};

export default EditContainer;
