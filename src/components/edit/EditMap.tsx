import { EditAction, EditSettings } from './types';
import { FormControlLabel, FormGroup, Grid, Switch, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { LatLngBoundsExpression } from 'leaflet';
import Map from '../map/Map';
import React from 'react';
import bannerOverlay from '../../img/banner_overlay.png';
import bugOverlay from '../../img/bug_overlay.png';
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';

interface Props {
	dispatch: React.Dispatch<EditAction>;
	state: EditSettings;
}

const EditMap: React.FC<Props> = (props: Props) => {
	const theme = useTheme();
	return (
		<>
			<Grid item={true} justifyContent="center" xs={12}>
				<Box height="405px" mt={3} mx="auto" position="relative" width="720px">
					<Map
						compHeight={405}
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
				<Box margin="auto" width="720px">
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
							top="1px"
						>
							<Icon icon={faExclamationTriangle} style={{ marginRight: '0.5em' }} />
							The control room may need to drop the banner!
						</Box>
					)}
				</Box>
			</Grid>
		</>
	);
};

export default EditMap;
