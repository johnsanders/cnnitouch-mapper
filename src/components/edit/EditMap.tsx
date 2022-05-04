import { EditAction, EditSettings } from './types';
import {
	FormControlLabel,
	FormGroup,
	Grid,
	IconButton,
	Switch,
	Tooltip,
	useTheme,
} from '@mui/material';
import { LatLngBoundsExpression, LeafletEventHandlerFn, Map as LeafletMap } from 'leaflet';
import { faExclamationTriangle, faInfoCircle } from '@fortawesome/pro-solid-svg-icons';
import { Box } from '@mui/system';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Map from '../map/Map';
import React from 'react';
import bannerOverlay from '../../img/banner_overlay.png';
import bugOverlay from '../../img/bug_overlay.png';

interface Props {
	dispatch: React.Dispatch<EditAction>;
	state: EditSettings;
}

const EditMap: React.FC<Props> = (props: Props) => {
	const mapRef = React.useRef<LeafletMap>(null);
	const [mapZoom, setMapZoom] = React.useState(20);
	const theme = useTheme();
	React.useEffect(() => {
		const handleZoomChange: LeafletEventHandlerFn = () => {
			if (mapRef.current) setMapZoom(mapRef.current.getZoom());
		};
		const addListeners = () => {
			if (mapRef.current) {
				mapRef.current.addEventListener('zoomend', handleZoomChange);
				setMapZoom(mapRef.current.getZoom());
			} else setTimeout(addListeners, 1000);
		};
		addListeners();
	}, []);
	const labelsAreHidden = props.state.mapSettings.labels.some((label) => label.minZoom > mapZoom);
	return (
		<>
			<Grid item={true} justifyContent="center" xs={12}>
				<Box height="405px" mt={3} mx="auto" position="relative" width="720px">
					<Map
						compHeight={405}
						ref={mapRef}
						setBounds={(bounds: LatLngBoundsExpression) =>
							props.dispatch({ key: 'bounds', value: bounds })
						}
						settings={props.state.mapSettings}
					/>
					<img
						src={props.state.showBanner ? bannerOverlay : bugOverlay}
						style={{ pointerEvents: 'none', position: 'absolute', top: 0, width: '100%' }}
					/>
				</Box>
			</Grid>
			<Grid item={true} xs={12}>
				<Box display="flex" justifyContent="space-between" margin="auto" width="720px">
					<Box>
						<FormGroup sx={{ display: 'inline' }}>
							<FormControlLabel
								control={
									<Switch
										checked={props.state.showBanner}
										onChange={(e) => props.dispatch({ key: 'showBanner', value: e.target.checked })}
									/>
								}
								label="Banner Guide"
							/>
						</FormGroup>
						{props.state.showBanner ? null : (
							<Box
								color={theme.palette.warning.dark}
								display="inline"
								fontStyle="italic"
								fontWeight={500}
								position="relative"
							>
								<Icon icon={faExclamationTriangle} style={{ marginRight: '0.5em' }} />
								Control room may need to drop banner!
							</Box>
						)}
					</Box>
					<Box color={theme.palette.secondary.main} mt="6px">
						{!labelsAreHidden ? null : (
							<>
								<Tooltip title="Some labels are not visible at this zoom level. Zoom in to view.">
									<IconButton size="small">
										<Icon icon={faInfoCircle} />
									</IconButton>
								</Tooltip>
								<Box display="inline">Some labels are hidden</Box>
							</>
						)}
					</Box>
				</Box>
			</Grid>
		</>
	);
};

export default EditMap;
