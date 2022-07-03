import { Label } from '../types';
import geoSearch from '../../misc/geoSearch';
import { v4 as uuid } from 'uuid';

const createLabelByName = async (name: string, angle = 0, minZoom = 3): Promise<Label | null> => {
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
			minZoom,
			name,
			type: 'area',
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};

export default createLabelByName;
