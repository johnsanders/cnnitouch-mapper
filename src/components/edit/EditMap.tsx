import { EditAction, EditSettings } from './types';
import { FormControlLabel, FormGroup, Grid, IconButton, Switch, Tooltip } from '@mui/material';
import { LatLngBounds, Map as LeafletMap } from 'leaflet';
import { faExclamationTriangle, faQuestionCircle } from '@fortawesome/pro-solid-svg-icons';
import { Box } from '@mui/system';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Map from '../map/Map';
import React from 'react';
import bannerOverlay from '../../img/banner_overlay.png';
import bugOverlay from '../../img/bug_overlay.png';
import { useTheme } from '@mui/material';

interface Props {
	dispatch: React.Dispatch<EditAction>;
	handleBoundsChange: (bounds: LatLngBounds) => void;
	hilitesAreHidden: boolean;
	labelsAreHidden: boolean;
	mapRef: React.RefObject<LeafletMap>;
	setHilitesAreHidden: (value: boolean) => void;
	setLabelsAreHidden: (value: boolean) => void;
	state: EditSettings;
}

const EditMap: React.FC<Props> = (props) => {
	const theme = useTheme();
	return (
		<>
			<Grid item={true} justifyContent="center" xs={12}>
				<Box
					height="405px"
					mt={3}
					mx="auto"
					position="relative"
					sx={{ pointerEvents: props.state.activeTab.startsWith('bounds') ? 'all' : 'none' }}
					width="720px"
				>
					<Map
						ref={props.mapRef}
						setBounds={props.handleBoundsChange}
						setHilitesAreHidden={props.setHilitesAreHidden}
						setLabelsAreHidden={props.setLabelsAreHidden}
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
								label="Lower Third Guide"
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
						{!props.labelsAreHidden ? null : (
							<Box textAlign="right">
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
						{!props.hilitesAreHidden ? null : (
							<Box textAlign="right">
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
