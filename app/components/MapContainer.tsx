import { MapContainer as LeafletContainer } from 'react-leaflet';
import { Map } from 'leaflet';
import React from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import SvgFiltersDefs from '../img/SvgFiltersDefs';
import TopoJSON from './TopoJSON';
import admin0 from '../data/ne_10m_admin_0_countries.topo.json';
import { borderStyle } from '../styles/mapStyles';
import googleApiKey from '../config/googleApiKey_disableGit.json';

interface Props {
	initialCenter?: L.LatLngExpression;
	dims: [number, number];
	mode: 'render' | 'edit';
	initialZoom?: number;
}

const MapContainer: React.ForwardRefRenderFunction<Map, Props> = (props, ref) => {
	return (
		<div style={{ height: props.dims[1], position: 'absolute', width: props.dims[0] }}>
			<SvgFiltersDefs />
			{props.mode === 'render' ? <div id="googleCourtesy">Google Earth</div> : null}
			<LeafletContainer
				center={props.initialCenter || [0, 0]}
				fadeAnimation={props.mode === 'edit'}
				maxBounds={[
					[-90, -270],
					[90, 270],
				]}
				maxZoom={18}
				minZoom={2}
				ref={ref}
				scrollWheelZoom={true}
				style={{
					filter: 'brightness(1.15) saturate(1.3)',
					height: '100%',
					width: '100%',
				}}
				zoom={props.initialZoom || 2}
				zoomAnimation={props.mode === 'edit'}
				zoomControl={props.mode === 'edit'}
				zoomSnap={0}
			>
				<ReactLeafletGoogleLayer apiKey={googleApiKey.key} type={'satellite'} />
				<TopoJSON data={admin0} style={borderStyle} />
			</LeafletContainer>
		</div>
	);
};

export default React.forwardRef(MapContainer);
