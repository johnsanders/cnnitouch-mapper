import * as topojson from 'topojson-client';
import { GeoJSON, GeoJSONProps } from 'react-leaflet';
import React, { useEffect, useRef } from 'react';
import { Feature } from 'geojson';
import { Layer } from 'leaflet';

interface Props extends GeoJSONProps {
	data: any;
}

const TopoJSON: React.FC<Props> = (props) => {
	const layerRef = useRef(null);
	const { data } = props;
	const addData = (layer: any, jsonData: any) => {
		if (jsonData.type === 'Topology') {
			for (const key in jsonData.objects) {
				const geojson = topojson.feature(jsonData, jsonData.objects[key]);
				layer.addData(geojson);
			}
		} else {
			layer.addData(jsonData);
		}
	};
	const onEachFeature = (feature: Feature, layer: Layer) => {
		if (feature.properties) {
			// console.log(feature.properties.ADMIN);
			// const { VARNAME_3, NAME_0 } = feature.properties;
			// layer.bindPopup(`${VARNAME_3}, ${NAME_0}`);
		}
	};
	useEffect(() => addData(layerRef.current, data), [data]);
	const GeoJsonAny = GeoJSON as any;
	return <GeoJsonAny onEachFeature={onEachFeature} ref={layerRef} style={props.style} />;
};

export default TopoJSON;
