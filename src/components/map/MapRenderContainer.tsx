import { continueRender, delayRender, useVideoConfig } from 'remotion';
import { LatLngBoundsExpression } from 'leaflet';
import Map from './Map';
import { MapSettings } from '../edit/types';
import React from 'react';
import googleApiKey from '../../config/googleApiKey_disableGit';
import injectScript from '../../misc/injectScript';

const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;

interface Props {
	settings: MapSettings;
	mode: 'render' | 'edit';
	setBounds?: (bounds: LatLngBoundsExpression) => void;
}

const MapRenderContainer: React.FC<Props> = (props: Props): JSX.Element => {
	const { height: compHeight } = useVideoConfig();
	React.useEffect(() => {
		const awaitInject = async () => {
			await injectScript(scriptUrl);
			continueRender(delayId);
		};
		const delayId = delayRender();
		awaitInject();
	}, []);
	return <Map {...props} compHeight={compHeight} />;
};

export default MapRenderContainer;
