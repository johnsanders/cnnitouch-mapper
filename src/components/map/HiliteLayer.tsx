import { GeoJSON } from 'react-leaflet';
import { Hilite } from './types';
import React from 'react';
import hilitesData from '../..//data/ne_10m_admin_0_countries.topo.json';
import { feature as topojsonFeature } from 'topojson-client';

const topoData = (hilitesData as any).objects.ne_10m_admin_0_countries;
const geoData = topojsonFeature(hilitesData as any, topoData);
const hiliteStyle = (feature: any): any => {
	if (feature)
		return {
			color: '#000000',
			fillColor: '#ffaf38',
			fillOpacity: 1,
			weight: 1,
		};
};

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
