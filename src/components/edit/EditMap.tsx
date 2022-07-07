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
import { LatLngBounds, Map as LeafletMap } from 'leaflet';
import { faExclamationTriangle, faQuestionCircle } from '@fortawesome/pro-solid-svg-icons';
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

const EditMap = (props: Props) => {
	const mapRef = React.useRef<LeafletMap>(null);
	const prevActiveTabRef = React.useRef(props.state.activeTab);
	const firstBoundsStartVisitRef = React.useRef(true);
	const firstBoundsEndVisitRef = React.useRef(true);
	const theme = useTheme();
	const [hilitesAreHidden, setHilitesAreHidden] = React.useState(false);
	const [labelsAreHidden, setLabelsAreHidden] = React.useState(false);
	const {
		dispatch,
		state: {
			activeTab,
			mapSettings: { boundsEnd, boundsStart },
		},
	} = props;
	const handleBoundsChange = (bounds: LatLngBounds) => {
		if (props.state.activeTab === 'boundsStart')
			props.dispatch({ key: 'boundsStart', value: bounds });
		else if (props.state.activeTab === 'boundsEnd')
			props.dispatch({ key: 'boundsEnd', value: bounds });
	};
	React.useEffect(() => {
		if (activeTab === prevActiveTabRef.current || !mapRef.current) return;
		prevActiveTabRef.current = activeTab;
		if (activeTab === 'boundsStart')
			if (firstBoundsStartVisitRef.current && mapRef.current) {
				firstBoundsStartVisitRef.current = false;
				dispatch({ key: 'boundsStart', value: mapRef.current.getBounds() });
			} else mapRef.current.fitBounds(boundsStart);
		else if (activeTab === 'boundsEnd') {
			if (firstBoundsEndVisitRef.current && mapRef.current) {
				firstBoundsEndVisitRef.current = false;
				dispatch({ key: 'boundsEnd', value: mapRef.current.getBounds() });
			} else mapRef.current.fitBounds(boundsEnd);
		}
	}, [activeTab, boundsEnd, boundsStart, dispatch]);
	return (
		<>
			<Grid item={true} justifyContent="center" xs={12}>
				<Box height="405px" mt={3} mx="auto" position="relative" width="720px">
					<Map
						compHeight={405}
						ref={mapRef}
						setBounds={handleBoundsChange}
						setHilitesAreHidden={setHilitesAreHidden}
						setLabelsAreHidden={setLabelsAreHidden}
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
							<Box>
								<Box display="inline">Why are some labels faded</Box>
								<Tooltip
									title={`
										Some labels are faded because they won't be in the animation at this zoom level.
										They'll appear when you zoom to a level that allows them.
										This happens automatically in the final animation.
									`}
								>
									<IconButton size="small">
										<Icon icon={faQuestionCircle} />
									</IconButton>
								</Tooltip>
							</Box>
						)}
						{!hilitesAreHidden ? null : (
							<Box>
								<Box display="inline">Why are hilights not showing?</Box>
								<Tooltip
									title={`
										Hilites are hidden at this zoom level because they would cover most of the map.
										They'll appear when you zoom out.
										This happens automatically in the final animation.
									`}
								>
									<IconButton size="small">
										<Icon icon={faQuestionCircle} />
									</IconButton>
								</Tooltip>
							</Box>
						)}
					</Box>
				</Box>
			</Grid>
		</>
	);
};

export default EditMap;
