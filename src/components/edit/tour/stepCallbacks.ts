import { EditAction } from '../types';

type Dispatch = React.Dispatch<EditAction>;

const stepCallbacks = [
	{
		fn: async (dispatch: Dispatch) => {
			dispatch({ key: 'activeTab', value: 'banner' });
		},
		name: 'The Banner',
	},
	{
		fn: async (dispatch: Dispatch) => {
			dispatch({ key: 'activeTab', value: 'hilites' });
		},
		name: 'Highlights',
	},
	{
		fn: async (dispatch: Dispatch) => {
			dispatch({ key: 'activeTab', value: 'labels' });
		},
		name: 'Labels',
	},
	{
		fn: async (dispatch: Dispatch) => {
			dispatch({ key: 'activeTab', value: 'preview' });
		},
		name: 'Preview',
	},
	{
		fn: async (dispatch: Dispatch) => {
			dispatch({ key: 'activeTab', value: 'render' });
		},
		name: 'Render',
	},
];

export default stepCallbacks;
