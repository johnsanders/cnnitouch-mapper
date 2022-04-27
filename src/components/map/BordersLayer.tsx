import { GeoJSON } from 'react-leaflet';
import React from 'react';
import { borderStyle } from './overlayStyles';
import bordersData from '../../data/borders.topo.json';
import { feature as topojsonFeature } from 'topojson-client';

const topoData = (bordersData as any).objects.ne_10m_admin_0_countries;
const geoData = topojsonFeature(bordersData as any, topoData);

const BordersLayer: React.FC = () => <GeoJSON data={geoData} style={borderStyle} />;

export default BordersLayer;
