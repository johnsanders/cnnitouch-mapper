import { Label } from '../map/labels/types';
import geoSearch from '../../misc/geoSearch';
import { v4 as uuid } from 'uuid';

const createLabelByName = async (name: string, angle = 0): Promise<Label | null> => {
	try {
		const geoResults = await geoSearch(name);
		const location = geoResults[0].geometry?.location;
		if (!location) return null;
		return {
			angle,
			iconType: 'none',
			id: uuid(),
			lat: location.lat(),
			lng: location.lng(),
			minZoom: 3,
			name,
			type: 'area',
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};

export default createLabelByName;
