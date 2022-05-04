import {
	Box,
	Container,
	CssBaseline,
	FormControlLabel,
	FormGroup,
	Grid,
	Switch,
	Tab,
	Tabs,
	useTheme,
} from '@mui/material';
import { EditAction, EditSettings } from './types';
import EditTabBanner from './EditTabBanner';
import EditTabBounds from './EditTabBounds';
import EditTabHilites from './EditTabHilites';
import EditTabLabels from './EditTabLabels';
import EditTabRender from './EditTabRender';
import { Hilite } from '../map/types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Label } from '../map/labels/types';
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

const Edit: React.FC<Props> = (props) => {
	const theme = useTheme();
	return (
		<>
			<CssBaseline />
			<Container>
				<Grid container={true} justifyContent="center">
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
											onChange={(e) =>
												props.dispatch({ key: 'showBanner', value: e.target.checked })
											}
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
					<Grid item={true} xs={12}>
						<Tabs
							centered={true}
							onChange={(_e, value) => props.dispatch({ key: 'activeTab', value })}
							sx={{ marginBottom: '1em' }}
							value={props.state.activeTab}
						>
							<Tab label="Banner" value="banner" />
							<Tab label="Map Start" value="boundsStart" />
							<Tab label="Map End" value="boundsEnd" />
							<Tab label="Highlights" value="hilites" />
							<Tab label="Labels" value="labels" />
							<Tab label="Render" value="render" />
						</Tabs>
					</Grid>
					<EditTabBanner
						active={props.state.activeTab === 'banner'}
						bannerText={props.state.mapSettings.bannerText}
						onNext={() => props.dispatch({ key: 'activeTab', value: 'boundsStart' })}
						setBanner={(value) => props.dispatch({ key: 'bannerText', value })}
						setSubhead={(value) => props.dispatch({ key: 'subheadText', value })}
						subheadText={props.state.mapSettings.subheadText}
					/>
					<EditTabBounds
						active={
							props.state.activeTab === 'boundsStart' || props.state.activeTab === 'boundsEnd'
						}
						onNext={() =>
							props.dispatch({
								key: 'activeTab',
								value: props.state.activeTab === 'boundsStart' ? 'boundsEnd' : 'hilites',
							})
						}
						onPrevious={() =>
							props.dispatch({
								key: 'activeTab',
								value: props.state.activeTab === 'boundsStart' ? 'banner' : 'boundsStart',
							})
						}
						tabName={props.state.activeTab}
					/>
					<EditTabHilites
						active={props.state.activeTab === 'hilites'}
						hilites={props.state.mapSettings.hilites}
						onNext={() => props.dispatch({ key: 'activeTab', value: 'labels' })}
						onPrevious={() => props.dispatch({ key: 'activeTab', value: 'boundsEnd' })}
						setHilites={(hilites: Hilite[]) => props.dispatch({ key: 'hilites', value: hilites })}
					/>
					<EditTabLabels
						active={props.state.activeTab === 'labels'}
						labels={props.state.mapSettings.labels}
						onNext={() => props.dispatch({ key: 'activeTab', value: 'render' })}
						onPrevious={() => props.dispatch({ key: 'activeTab', value: 'hilites' })}
						setLabels={(labels: Label[]) => props.dispatch({ key: 'labels', value: labels })}
					/>
					<EditTabRender
						active={props.state.activeTab === 'render'}
						onPrevious={() => props.dispatch({ key: 'activeTab', value: 'labels' })}
					/>
				</Grid>
			</Container>
		</>
	);
};

export default Edit;
