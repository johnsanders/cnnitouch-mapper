import './styles.css';
import { Bounds, Label } from './types';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import BordersLayer from './BordersLayer';
import { Box } from '@mui/material';
import { Hilite } from './types';
import HiliteLayer from './HiliteLayer';
import LabelsLayer from './LabelsLayer';
import { MapContainer as LeafletContainer } from 'react-leaflet';
import MapAnimator from './MapAnimator';
import MapEventHandlers from './MapEventHandlers';
import React from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import SvgFiltersDefs from '../../img/SvgFiltersDefs';

export const mapWidthPct = 0.65;
const initialWidth = window.innerWidth * mapWidthPct;
const initialHeight = initialWidth * 0.5625;

interface Props {
	center?: LatLngExpression;
	endBounds?: LatLngBoundsExpression;
	hilites: Hilite[];
	labels: Label[];
	mode: 'render' | 'edit';
	setBounds?: (bounds: Bounds) => void;
	startBounds?: LatLngBoundsExpression;
	zoom?: number;
}

const Map: React.FC<Props> = (props) => {
	const [dims, setDims] = React.useState([initialWidth, initialHeight]);
	return (
		<Box height={dims[1]} margin="auto" position="relative" width={dims[0]}>
			<SvgFiltersDefs />
			{props.mode === 'render' ? <div id="googleCourtesy">Google Earth</div> : null}
			<LeafletContainer
				center={props.center || [0, 0]}
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
				zoom={props.zoom || 2}
				zoomAnimation={props.mode === 'edit'}
				zoomControl={props.mode === 'edit'}
				zoomSnap={0}
			>
				<ReactLeafletGoogleLayer type={'satellite'} />
				<BordersLayer />
				<HiliteLayer hilites={props.hilites} />
				<LabelsLayer labels={props.labels} />
				<MapEventHandlers setBounds={props.setBounds} setDims={setDims} />
				{props.mode !== 'render' ? null : (
					<MapAnimator endBounds={props.endBounds} startBounds={props.startBounds} />
				)}
			</LeafletContainer>
		</Box>
	);
};

export default Map;
