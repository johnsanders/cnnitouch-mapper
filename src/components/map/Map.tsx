/* eslint-disable react/display-name */
import './styles.css';
import 'leaflet/dist/leaflet.css';
import { LatLngBounds, Map as LeafletMap } from 'leaflet';
import Banner from './Banner';
import BordersLayer from './BordersLayer';
import GoogleFont from './GoogleFont';
import HiliteLayer from './HiliteLayer';
import { Label } from './labels/types';
import LabelsLayer from './labels/LabelsLayer';
import { MapContainer as LeafletContainer } from 'react-leaflet';
import MapAnimator from './MapAnimator';
import MapEventHandlers from './MapEventHandlers';
import { MapSettings } from './types';
import React from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import SpecialCasesLayer from './SpecialCasesLayer';
import SvgDefs from './SvgDefs';
import getSpecialLabels from './labels/getSpecialLabels';
import googleApiKey from '../../config/googleApiKey_disableGit';

interface Props {
	compHeight: number;
	settings: MapSettings;
	setBounds?: (bounds: LatLngBounds) => void;
}

const Map = React.forwardRef<LeafletMap, Props>((props, ref) => {
	const scale = props.compHeight / 1080;
	const hiliteNames = props.settings.hilites.map((hilite) => hilite.name);
	const allLabels = [
		...props.settings.labels,
		...getSpecialLabels(hiliteNames),
		...props.settings.hilites.reduce<Label[]>(
			(acc, hilite) => (hilite.label ? [...acc, hilite.label] : acc),
			[],
		),
	];
	return (
		<div
			className={props.settings.bannerText ? 'hasBanner' : undefined}
			id="mapContainer"
			style={{ height: '100%', position: 'relative', width: '100%' }}
		>
			{props.settings.bannerText ? (
				<Banner
					headlineText={props.settings.bannerText}
					note="Google Earth"
					scale={scale}
					subheadText={props.settings.subheadText}
				/>
			) : (
				<GoogleFont scale={scale} />
			)}
			<LeafletContainer
				fadeAnimation={true}
				maxBounds={[
					[-90, -270],
					[90, 270],
				]}
				maxZoom={18}
				minZoom={1}
				ref={ref}
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
				<MapEventHandlers
					initialBounds={props.settings.boundsStart}
					mode={props.settings.mode}
					setBounds={props.setBounds}
				/>
				<ReactLeafletGoogleLayer
					apiKey={props.settings.mode === 'render' ? googleApiKey : undefined}
					type="satellite"
				/>
				<BordersLayer />
				<HiliteLayer hilites={props.settings.hilites} />
				<SpecialCasesLayer hiliteNames={hiliteNames} />
				<LabelsLayer labels={allLabels} mode={props.settings.mode} scale={scale} />
				<SvgDefs hiliteNames={hiliteNames} />
				{props.settings.mode === 'edit' ? null : (
					<MapAnimator
						endBounds={props.settings.boundsEnd}
						mode={props.settings.mode}
						startBounds={props.settings.boundsStart}
						zoomDuration={props.settings.zoomDuration}
					/>
				)}
			</LeafletContainer>
		</div>
	);
});

export default Map;
