import { GeoJSON } from 'react-leaflet';
import React from 'react';
import { hiliteStyle } from './overlayStyles';
import kashmirData from '../../data/kashmir.topo.json';
import { feature as topojsonFeature } from 'topojson-client';

const topoData = (kashmirData as any).objects.kashmir;
const geoData = topojsonFeature(kashmirData as any, topoData);

const SpecialCasesLayer: React.FC = () => (
	<>
		{(geoData as any).features.map((feature: any) => (
			<GeoJSON data={feature} key={feature.properties.NAME} style={hiliteStyle} />
		))}
	</>
);

export default SpecialCasesLayer;
