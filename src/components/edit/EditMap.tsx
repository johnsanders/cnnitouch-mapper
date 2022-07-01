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
import { faExclamationTriangle, faInfoCircle } from '@fortawesome/pro-solid-svg-icons';
import { Box } from '@mui/system';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { LatLngBounds } from 'leaflet';
import Map from '../map/Map';
import React from 'react';
import bannerOverlay from '../../img/banner_overlay.png';
import bugOverlay from '../../img/bug_overlay.png';

interface Props {
	dispatch: React.Dispatch<EditAction>;
	state: EditSettings;
}

const EditMap: React.FC<Props> = (props: Props) => {
	const [hilitesAreHidden, setHilitesAreHidden] = React.useState(false);
	const [labelsAreHidden, setLabelsAreHidden] = React.useState(false);
	const theme = useTheme();
	return (
		<>
			<Grid item={true} justifyContent="center" xs={12}>
				<Box height="405px" mt={3} mx="auto" position="relative" width="720px">
					<Map
						compHeight={405}
						setBounds={(bounds: LatLngBounds) => props.dispatch({ key: 'bounds', value: bounds })}
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
								<Tooltip title="Some labels are hidden at this zoom level because they overlap. They'll appear when you zoom in.">
									<IconButton size="small">
										<Icon icon={faInfoCircle} />
									</IconButton>
								</Tooltip>
								<Box display="inline">Some labels are hidden</Box>
							</Box>
						)}
						{!hilitesAreHidden ? null : (
							<Box>
								<Tooltip title="Hilites hidden at this zoom level because they would completely cover the map. They'll appear when you zoom out.">
									<IconButton size="small">
										<Icon icon={faInfoCircle} />
									</IconButton>
								</Tooltip>
								<Box display="inline">Hilites are hidden</Box>
							</Box>
						)}
					</Box>
				</Box>
			</Grid>
		</>
	);
};

export default EditMap;
