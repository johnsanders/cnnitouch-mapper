/* eslint-disable react/display-name */
import './styles.css';
import 'leaflet/dist/leaflet.css';
import { Label, MapSettings } from './types';
import { LatLngBounds, Map as LeafletMap } from 'leaflet';
import Banner from './Banner';
import BordersLayer from './BordersLayer';
import GoogleFont from './GoogleFont';
import HiliteLayer from './HiliteLayer';
import LabelsLayer from './labels/LabelsLayer';
import { MapContainer as LeafletContainer } from 'react-leaflet';
import MapAnimator from './animator/MapAnimator';
import MapEventHandlers from './MapEventHandlers';
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
	const scale = props.compHeight / 2160;
	const hiliteNames = props.settings.hilites.map((hilite) => hilite.name);
	const [hiliteBounds, setHiliteBounds] = React.useState<LatLngBounds[]>([]);
	const allLabelsRef = React.useRef([
		...props.settings.hilites.reduce<Label[]>(
			(acc, hilite) => (hilite.label ? [...acc, hilite.label] : acc),
			[],
		),
		...props.settings.labels,
		...getSpecialLabels(hiliteNames),
	]);
	const { bannerText, boundsEnd, boundsStart, hilites, labels, mode, subheadText, zoomDuration } =
		props.settings;
	return (
		<div
			className={bannerText ? 'hasBanner' : undefined}
			id="mapContainer"
			style={{ height: '100%', position: 'relative', width: '100%' }}
		>
			{bannerText ? (
				<Banner
					headlineText={bannerText}
					note="Google Earth"
					scale={scale}
					subheadText={subheadText}
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
				zoomControl={mode === 'edit'}
				zoomSnap={0}
			>
				<MapEventHandlers initialBounds={boundsStart} mode={mode} setBounds={props.setBounds} />
				<ReactLeafletGoogleLayer
					apiKey={mode === 'render' ? googleApiKey : undefined}
					type="satellite"
				/>
				<BordersLayer mode={mode} />
				<HiliteLayer hilites={hilites} setBounds={setHiliteBounds} />
				<SpecialCasesLayer hiliteNames={hiliteNames} />
				<LabelsLayer labels={allLabelsRef.current} mode={props.settings.mode} scale={scale} />
				<SvgDefs hiliteNames={hiliteNames} />
				{props.settings.mode === 'edit' || hiliteBounds.length !== hilites.length ? null : (
					<MapAnimator
						endBounds={boundsEnd}
						hiliteBounds={hiliteBounds}
						hilites={hilites}
						labels={labels}
						startBounds={boundsStart}
						zoomDuration={zoomDuration}
					/>
				)}
			</LeafletContainer>
		</div>
	);
});

export default Map;
