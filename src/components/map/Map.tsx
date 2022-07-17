import './styles.css';
import 'leaflet/dist/leaflet.css';
import { LatLngBounds, Map as LeafletMap } from 'leaflet';
import Attribution from './Attribution';
import AttributionMonitor from './AttributionMonitor';
import Banner from './Banner';
import BordersLayer from './BordersLayer';
import GoogleFont from './GoogleFont';
import HiliteLayer from './HiliteLayer';
import LabelsLayer from './labels/LabelsLayer';
import { MapContainer as LeafletContainer } from 'react-leaflet';
import MapAnimator from './animator/MapAnimator';
import MapEventHandlers from './MapEventHandlers';
import { MapSettings } from '../../types';
import React from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import SpecialCasesLayer from './SpecialCasesLayer';
import SvgDefs from './SvgDefs';
import googleApiKey from '../../config/googleApiKey_disableGit';

interface Props {
	setHilitesAreHidden?: (hilitesAreHidden: boolean) => void;
	setLabelsAreHidden?: (labelsAreHidden: boolean) => void;
	settings: MapSettings;
	setBounds?: (bounds: LatLngBounds) => void;
}

const Map = React.forwardRef<LeafletMap, Props>((props, ref) => {
	const [attribution, setAttribution] = React.useState('');
	const scale = props.settings.compHeight / 2160;
	const hiliteNames = props.settings.hilites.map((hilite) => hilite.name);
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
			<Attribution scale={scale} text={attribution} />
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
				<BordersLayer mode={mode} scale={scale} />
				<HiliteLayer
					hilites={hilites}
					mode={mode}
					setHilitesAreHidden={props.setHilitesAreHidden}
				/>
				<SpecialCasesLayer hiliteNames={hiliteNames} />
				<LabelsLayer
					hilites={hilites}
					labels={labels}
					mode={props.settings.mode}
					scale={scale}
					setLabelsAreHidden={props.setLabelsAreHidden}
				/>
				<SvgDefs hiliteNames={hiliteNames} />
				<AttributionMonitor setAttribution={setAttribution} />
				{props.settings.mode === 'edit' ? null : (
					<MapAnimator
						boundsEnd={boundsEnd}
						boundsStart={boundsStart}
						hilites={hilites}
						labels={labels}
						zoomDuration={zoomDuration}
					/>
				)}
			</LeafletContainer>
		</div>
	);
});
Map.displayName = 'Map';

export default Map;
