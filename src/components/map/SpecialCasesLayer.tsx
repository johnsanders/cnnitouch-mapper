import { GeoJSON } from 'react-leaflet';
import React from 'react';
import { StyleFunction } from 'leaflet';
import golanData from '../../data/golan.topo.json';
import kashmirData from '../../data/kashmir.topo.json';
import { feature as topojsonFeature } from 'topojson-client';

const golanTopo = (golanData as any).objects.golan;
const golanGeo = topojsonFeature(golanData as any, golanTopo) as any;
const kashmirTopo = (kashmirData as any).objects.kashmir;
const kashmirGeo = topojsonFeature(kashmirData as any, kashmirTopo) as any;

const hatchStyle: StyleFunction = (feature) => {
	if (feature)
		return {
			fillColor: `url(#hatch-${feature.properties.NAME})`,
			fillOpacity: 1,
			weight: 0,
		};
	return {};
};
const darkenStyle: StyleFunction = (feature) => {
	if (feature)
		return {
			fillColor: 'black',
			fillOpacity: 0.3,
			weight: 0,
		};
	return {};
};

interface Props {
	hiliteNames: string[];
}

const SpecialCasesLayer: React.FC<Props> = (props) => (
	<>
		{kashmirGeo.features.map((feature: any) => (
			<GeoJSON data={feature} key={feature.properties.NAME} pane="markerPane" style={hatchStyle} />
		))}
		{golanGeo.features.map((feature: any) => (
			<GeoJSON data={feature} key={feature.properties.NAME} pane="markerPane" style={hatchStyle} />
		))}
		{!props.hiliteNames.includes('Israel')
			? null
			: golanGeo.features.map((feature: any) => (
					<GeoJSON
						data={feature}
						key={feature.properties.NAME}
						pane="markerPane"
						style={darkenStyle}
					/>
			  ))}
		{golanGeo.features.map((feature: any) => (
			<GeoJSON data={feature} key={feature.properties.NAME} pane="markerPane" style={hatchStyle} />
		))}
	</>
);

export default SpecialCasesLayer;
