import { GeoJSON, useMap, useMapEvent } from 'react-leaflet';
import { LatLngBounds, GeoJSON as LeafletGeoJSON } from 'leaflet';
import { Hilite } from '../types';
import React from 'react';
import { boundsExceedsThreshold } from './animator/testHilitesAtFrame';
import calcAggregateBounds from './animator/calcAggregateBounds';
import getDomId from '../../misc/getDomId';
import hiliteBoundsSpecialCases from '../../misc/hiliteBoundsSpecialCases';
import hilitesData from '../../data/ne_10m_admin_0_countries.topo.json';
import { feature as topojsonFeature } from 'topojson-client';

const topoData = (hilitesData as any).objects.ne_10m_admin_0_countries;
const geoData = topojsonFeature(hilitesData as any, topoData);

interface Props {
	hilites: Hilite[];
	mode: 'edit' | 'render';
	setHilitesAreHidden?: (hilitesAreHidden: boolean) => void;
}

const HiliteLayer: React.FC<Props> = (props) => {
	const layerRef = React.useRef<LeafletGeoJSON[]>([]);
	const boundsRef = React.useRef<LatLngBounds[]>([]);
	const [hilitesVisible, setHilitesVisible] = React.useState(true);
	const map = useMap();
	const { hilites, mode, setHilitesAreHidden } = props;
	const checkEditVisibilities = React.useCallback(() => {
		if (mode !== 'edit' || hilites.length === 0) return;
		const mapBounds = map.getBounds();
		const correctedBounds = hilites.map((hilite, i) =>
			!hiliteBoundsSpecialCases[hilite.name]
				? boundsRef.current[i]
				: new LatLngBounds(hiliteBoundsSpecialCases[hilite.name]),
		);
		const hiliteAggregateBounds = calcAggregateBounds(correctedBounds);
		const hilitesExceedThreshold = boundsExceedsThreshold(hiliteAggregateBounds, mapBounds);
		setHilitesVisible(!hilitesExceedThreshold);
		if (setHilitesAreHidden) setHilitesAreHidden(hilitesExceedThreshold);
	}, [hilites, map, mode, setHilitesAreHidden]);
	useMapEvent('zoomend', checkEditVisibilities);
	React.useEffect(() => {
		boundsRef.current = layerRef.current.map((layer) => layer.getBounds());
		checkEditVisibilities();
	}, [checkEditVisibilities]);
	return (
		<>
			{hilites.map((hilite, i) => {
				const feature = (geoData as any).features.find(
					(feature: any) => feature.properties.NAME === hilite.name,
				);
				if (!feature) throw new Error(`Cannot find feature ${hilite.name}`);
				return (
					<GeoJSON
						data={feature}
						key={feature.properties.NAME}
						ref={(el) => el && (layerRef.current[i] = el)}
						style={() => ({
							className: getDomId('hilite', hilite.id),
							color: '#000000',
							fillColor: '#ffaf38',
							fillOpacity: hilitesVisible ? 1 : 0,
							weight: 1,
						})}
					/>
				);
			})}
		</>
	);
};

export default HiliteLayer;
