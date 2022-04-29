import { Box, Container, CssBaseline, Grid, Tab, Tabs } from '@mui/material';
import { EditAction, EditSettings } from './types';
import { Hilite, Label } from '../map/types';
import EditTabBounds from './EditTabBounds';
import EditTabHilites from './EditTabHilites';
import EditTabLabels from './EditTabLabels';
import EditTabRender from './EditTabRender';
import { LatLngBoundsExpression } from 'leaflet';
import Map from '../map/Map';
import React from 'react';

interface Props {
	dispatch: React.Dispatch<EditAction>;
	state: EditSettings;
}

const Edit: React.FC<Props> = (props) => (
	<>
		<CssBaseline />
		<Container>
			<Grid container={true} justifyContent="center">
				<Grid item={true} justifyContent="center" xs={12}>
					<Box height="360px" m="auto" position="relative" width="640px">
						<Map
							compHeight={360}
							setBounds={(bounds: LatLngBoundsExpression) =>
								props.dispatch({ key: 'bounds', value: bounds })
							}
							settings={props.state.mapSettings}
						/>
					</Box>
				</Grid>
				<Grid item={true} xs={12}>
					<Tabs
						centered={true}
						onChange={(_e, value) => props.dispatch({ key: 'activeTab', value })}
						sx={{ marginBottom: '1em' }}
						value={props.state.activeTab}
					>
						<Tab label="Map View Start" value="boundsStart" />
						<Tab label="Map View End" value="boundsEnd" />
						<Tab label="Highlights" value="hilites" />
						<Tab label="Labels" value="labels" />
						<Tab label="Render" value="render" />
					</Tabs>
				</Grid>
				<EditTabBounds
					active={props.state.activeTab === 'boundsStart' || props.state.activeTab === 'boundsEnd'}
					onNext={() => props.dispatch({ key: 'activeTab', value: 'hilites' })}
					tabName={props.state.activeTab}
				/>
				<EditTabHilites
					active={props.state.activeTab === 'hilites'}
					hilites={props.state.mapSettings.hilites}
					onNext={() => props.dispatch({ key: 'activeTab', value: 'labels' })}
					setHilites={(hilites: Hilite[]) => props.dispatch({ key: 'hilites', value: hilites })}
				/>
				<EditTabLabels
					active={props.state.activeTab === 'labels'}
					labels={props.state.mapSettings.labels}
					onNext={() => props.dispatch({ key: 'activeTab', value: 'render' })}
					setLabels={(labels: Label[]) => props.dispatch({ key: 'labels', value: labels })}
				/>
				<EditTabRender active={props.state.activeTab === 'render'} />
			</Grid>
		</Container>
	</>
);

export default Edit;
