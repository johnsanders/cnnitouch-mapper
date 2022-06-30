import { GeoJSON, useMap } from 'react-leaflet';
import { continueRender, delayRender, useCurrentFrame } from 'remotion';
import React from 'react';
import { StyleFunction } from 'leaflet';
import bordersData from '../../data/borders.topo.json';
import { feature as topojsonFeature } from 'topojson-client';

const topoData = (bordersData as any).objects.ne_10m_admin_0_countries;
const geoData = topojsonFeature(bordersData as any, topoData);

interface Props {
	mode: 'edit' | 'render';
}

const BordersLayer: React.FC<Props> = (props) => {
	const [key, setKey] = React.useState('1');
	React.useEffect(() => {
		const delayId = delayRender();
		const timeout = setTimeout(() => {
			setKey('2');
			continueRender(delayId);
		}, 2000);
		return () => {
			continueRender(delayId);
			clearTimeout(timeout);
		};
	}, []);
	useCurrentFrame();
	const map = useMap();
	const zoom = map.getZoom();
	const borderStyle: StyleFunction = (feature) => {
		if (feature)
			return {
				className: 'borderLayer',
				color: '#d4e2b0',
				weight: props.mode === 'render' ? zoom : zoom / 2,
			};
		return {};
	};
	return <GeoJSON data={geoData} key={key} style={borderStyle} />;
};

export default BordersLayer;
