import './styles.css';
import 'leaflet/dist/leaflet.css';
import BordersLayer from './BordersLayer';
import { Box } from '@mui/material';
import GoogleFont from './GoogleFont';
import HiliteLayer from './HiliteLayer';
import LabelsLayer from './LabelsLayer';
import { LatLngBoundsExpression } from 'leaflet';
import { MapContainer as LeafletContainer } from 'react-leaflet';
import MapAnimator from './MapAnimator';
import MapEventHandlers from './MapEventHandlers';
import { MapSettings } from './types';
import React from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import SvgFiltersDefs from '../../img/SvgFiltersDefs';
import googleApiKey from '../../config/googleApiKey_disableGit';

interface Props {
	compHeight: number;
	settings: MapSettings;
	setBounds?: (bounds: LatLngBoundsExpression) => void;
}

const Map: React.FC<Props> = (props) => {
	const scale = props.compHeight / 1080;
	const elements = {
		edit: (
			<>
				<ReactLeafletGoogleLayer
					apiKey={props.settings.mode === 'renderMap' ? googleApiKey : undefined}
					type="satellite"
				/>
				<BordersLayer />
				<HiliteLayer hilites={props.settings.hilites} />
				<GoogleFont scale={scale} />
				<LabelsLayer labels={props.settings.labels} scale={scale} />
			</>
		),
		renderMap: (
			<>
				<ReactLeafletGoogleLayer
					apiKey={props.settings.mode === 'renderMap' ? googleApiKey : undefined}
					type="satellite"
				/>
				<BordersLayer />
				<HiliteLayer hilites={props.settings.hilites} />
			</>
		),
		renderOverlay: (
			<>
				<div style={{ backgroundColor: 'green', height: '100%', width: '100%' }} />
				<LabelsLayer labels={props.settings.labels} scale={scale} />
			</>
		),
	};
	return (
		<Box height="100%" position="relative" width="100%">
			<SvgFiltersDefs />
			<LeafletContainer
				fadeAnimation={true}
				maxBounds={[
					[-90, -270],
					[90, 270],
				]}
				maxZoom={18}
				minZoom={1}
				scrollWheelZoom={true}
				style={{
					filter: 'brightness(1.15) saturate(1.3)',
					height: '100%',
					width: '100%',
				}}
				zoom={2}
				zoomAnimation={true}
				zoomControl={props.settings.mode === 'edit'}
				zoomSnap={0}
			>
				<MapEventHandlers initialBounds={props.settings.boundsStart} setBounds={props.setBounds} />
				{elements[props.settings.mode]}
				{props.settings.mode === 'edit' ? null : (
					<MapAnimator
						endBounds={props.settings.boundsEnd}
						startBounds={props.settings.boundsStart}
					/>
				)}
			</LeafletContainer>
		</Box>
	);
};

export default Map;
