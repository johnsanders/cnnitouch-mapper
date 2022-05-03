import { GeoJSON } from 'react-leaflet';
import React from 'react';
import kashmirData from '../../data/kashmir.topo.json';
import { feature as topojsonFeature } from 'topojson-client';

const topoData = (kashmirData as any).objects.kashmir;
const geoData = topojsonFeature(kashmirData as any, topoData);

const hiliteStyle = (feature: any): any => {
	if (feature)
		return {
			color: '#000000',
			fillColor: 'url(#diagonalHatch)',
			fillOpacity: 1,
			weight: 1,
		};
};

const SpecialCasesLayer: React.FC = () => (
	<>
		{(geoData as any).features.map((feature: any) => (
			<GeoJSON data={feature} key={feature.properties.NAME} style={hiliteStyle} />
		))}
	</>
);

export default SpecialCasesLayer;
