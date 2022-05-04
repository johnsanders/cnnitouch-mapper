import { GeoJSON } from 'react-leaflet';
import React from 'react';
import { StyleFunction } from 'leaflet';
import bordersData from '../../data/borders.topo.json';
import { feature as topojsonFeature } from 'topojson-client';

const topoData = (bordersData as any).objects.ne_10m_admin_0_countries;

const borderStyle: StyleFunction = (feature) => {
	if (feature)
		return {
			color: '#d4e2b0',
			weight: 1,
		};
	return {};
};
const geoData = topojsonFeature(bordersData as any, topoData);

const BordersLayer: React.FC = () => <GeoJSON data={geoData} style={borderStyle} />;

export default BordersLayer;
