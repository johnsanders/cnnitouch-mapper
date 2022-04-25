import { GeoJSON } from 'react-leaflet';
import { Hilite } from '../../types';
import React from 'react';
import { hiliteStyle } from './overlayStyles';
import hilitesData from '../..//data/ne_10m_admin_0_countries.topo.json';
import { feature as topojsonFeature } from 'topojson-client';

const topoData = (hilitesData as any).objects.ne_10m_admin_0_countries;
const geoData = topojsonFeature(hilitesData as any, topoData);

interface Props {
	hilites: Hilite[];
}

const HiliteLayer: React.FC<Props> = (props) => {
	const hiliteNames = props.hilites.map((hilite) => hilite.name);
	return (
		<>
			{(geoData as any).features
				.filter((feature: any) => hiliteNames.includes(feature.properties.NAME))
				.map((feature: any) => (
					<GeoJSON data={feature} key={feature.properties.NAME} style={hiliteStyle} />
				))}
		</>
	);
};

export default HiliteLayer;
