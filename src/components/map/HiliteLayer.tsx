import { LatLngBounds, GeoJSON as LeafletGeoJSON } from 'leaflet';
import { GeoJSON } from 'react-leaflet';
import { Hilite } from './types';
import React from 'react';
import getDomId from '../../misc/getDomId';
import hilitesData from '../../data/ne_10m_admin_0_countries.topo.json';
import { feature as topojsonFeature } from 'topojson-client';

const topoData = (hilitesData as any).objects.ne_10m_admin_0_countries;
const geoData = topojsonFeature(hilitesData as any, topoData);

interface Props {
	hilites: Hilite[];
	setBounds: (bounds: LatLngBounds[]) => void;
}

const HiliteLayer: React.FC<Props> = (props) => {
	const layerRef = React.useRef<LeafletGeoJSON[]>([]);
	const { setBounds } = props;
	React.useEffect(() => {
		if (layerRef.current) setBounds(layerRef.current.map((layer) => layer.getBounds()));
	}, [setBounds]);
	return (
		<>
			{props.hilites.map((hilite, i) => {
				const feature = (geoData as any).features.find(
					(feature: any) => feature.properties.NAME === hilite.name,
				);
				if (!feature) throw new Error(`Cannot find feature ${hilite.name}`);
				return (
					<GeoJSON
						data={feature}
						key={feature.properties.NAME}
						ref={(el) => {
							if (el) layerRef.current[i] = el;
						}}
						style={() => ({
							className: getDomId('hilite', hilite.id),
							color: '#000000',
							fillColor: '#ffaf38',
							fillOpacity: 1,
							weight: 1,
						})}
					/>
				);
			})}
		</>
	);
};

export default HiliteLayer;
