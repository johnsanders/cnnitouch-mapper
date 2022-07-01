import './styles.css';
import 'leaflet/dist/leaflet.css';
import { Hilite, Label, MapSettings } from './types';
import Banner from './Banner';
import BordersLayer from './BordersLayer';
import GoogleFont from './GoogleFont';
import HiliteLayer from './HiliteLayer';
import LabelsLayer from './labels/LabelsLayer';
import { LatLngBounds } from 'leaflet';
import { MapContainer as LeafletContainer } from 'react-leaflet';
import MapAnimator from './animator/MapAnimator';
import MapEventHandlers from './MapEventHandlers';
import React from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import SpecialCasesLayer from './SpecialCasesLayer';
import SvgDefs from './SvgDefs';
import getSpecialLabels from './labels/getSpecialLabels';
import googleApiKey from '../../config/googleApiKey_disableGit';

const collateLabels = (hilites: Hilite[], labels: Label[]) => [
	...hilites.reduce<Label[]>((acc, hilite) => (hilite.label ? [...acc, hilite.label] : acc), []),
	...labels,
	...getSpecialLabels(hilites.map((hilite) => hilite.name)),
];

interface Props {
	compHeight: number;
	setHilitesAreHidden?: (hilitesAreHidden: boolean) => void;
	setLabelsAreHidden?: (labelsAreHidden: boolean) => void;
	settings: MapSettings;
	setBounds?: (bounds: LatLngBounds) => void;
}

const Map: React.FC<Props> = (props) => {
	const scale = props.compHeight / 2160;
	const hiliteNames = props.settings.hilites.map((hilite) => hilite.name);
	const [allLabels, setAllLabels] = React.useState(
		collateLabels(props.settings.hilites, props.settings.labels),
	);
	const { bannerText, boundsEnd, boundsStart, hilites, labels, mode, subheadText, zoomDuration } =
		props.settings;
	React.useEffect(() => setAllLabels(collateLabels(hilites, labels)), [hilites, labels]);
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
				<HiliteLayer
					hilites={hilites}
					mode={mode}
					setHilitesAreHidden={props.setHilitesAreHidden}
				/>
				<SpecialCasesLayer hiliteNames={hiliteNames} />
				<LabelsLayer
					labels={allLabels}
					mode={props.settings.mode}
					scale={scale}
					setLabelsAreHidden={props.setLabelsAreHidden}
				/>
				<SvgDefs hiliteNames={hiliteNames} />
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
};

export default Map;
