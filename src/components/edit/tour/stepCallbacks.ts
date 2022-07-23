import { EditAction } from '../types';
import typeText from './typeText';
import waitFor from '../../../misc/waitFor';

type Dispatch = React.Dispatch<EditAction>;

const stepCallbacks = [
	{
		fn: async (dispatch: Dispatch) => {
			dispatch({ key: 'activeTab', value: 'banner' });
			await waitFor(100);
			typeText('thingdsja', '#BannerInput');
			console.log('fjdskl');
		},
		name: 'The Banner',
	},
	{
		fn: async (dispatch: Dispatch) => {
			dispatch({ key: 'activeTab', value: 'hilites' });
			await waitFor(100);
		},
		name: 'Highlights',
	},
];

export default stepCallbacks;
