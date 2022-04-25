import './styles.css';
import BordersLayer from './BordersLayer';
import { Bounds } from '../../types';
import { Box } from '@mui/material';
import { Hilite } from '../../types';
import HiliteLayer from './HiliteLayer';
import { MapContainer as LeafletContainer } from 'react-leaflet';
import MapEventHandlers from './MapEventHandlers';
import React from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import SvgFiltersDefs from '../../img/SvgFiltersDefs';

export const mapWidthPct = 0.65;
const initialWidth = window.innerWidth * mapWidthPct;
const initialHeight = initialWidth * 0.5625;

interface Props {
	hilites: Hilite[];
	setBounds?: (bounds: Bounds) => void;
	initialCenter?: L.LatLngExpression;
	mode: 'render' | 'edit';
	initialZoom?: number;
}

const Map: React.FC<Props> = (props) => {
	const [dims, setDims] = React.useState([initialWidth, initialHeight]);
	return (
		<Box height={dims[1]} margin="auto" position="relative" width={dims[0]}>
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
				<ReactLeafletGoogleLayer type={'satellite'} />
				<BordersLayer />
				<HiliteLayer hilites={props.hilites} />
				<MapEventHandlers setBounds={props.setBounds} setDims={setDims} />
			</LeafletContainer>
		</Box>
	);
};

export default Map;
