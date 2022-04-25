import { Bounds, Hilite, Label } from '../map/types';
import { Container, CssBaseline, Grid, Tab, Tabs } from '@mui/material';
import { EditAction, EditState } from './types';
import EditTabBounds from './EditTabBounds';
import EditTabHilites from './EditTabHilites';
import EditTabLabels from './EditTabLabels';
import EditTabRender from './EditTabRender';
import Map from '../map/Map';
import React from 'react';

interface Props {
	dispatch: React.Dispatch<EditAction>;
	state: EditState;
}

const Edit: React.FC<Props> = (props) => {
	return (
		<>
			<CssBaseline />
			<Container>
				<Grid container={true} justifyContent="center">
					<Grid item={true} xs={12}>
						<Map
							hilites={props.state.hilites}
							labels={props.state.labels}
							mode="edit"
							setBounds={(bounds: Bounds) => props.dispatch({ key: 'bounds', value: bounds })}
						/>
					</Grid>
					<Grid item={true} xs={12}>
						<Tabs
							centered={true}
							onChange={(_e, value) => props.dispatch({ key: 'activeTab', value })}
							sx={{ marginBottom: '1em' }}
							value={props.state.activeTab}
						>
							<Tab label="Map View" value="bounds" />
							<Tab label="Highlights" value="hilites" />
							<Tab label="Labels" value="labels" />
							<Tab label="Render" value="render" />
						</Tabs>
					</Grid>
					<EditTabBounds
						active={props.state.activeTab === 'bounds'}
						onNext={() => props.dispatch({ key: 'activeTab', value: 'hilites' })}
					/>
					<EditTabHilites
						active={props.state.activeTab === 'hilites'}
						hilites={props.state.hilites}
						onNext={() => props.dispatch({ key: 'activeTab', value: 'labels' })}
						setHilites={(hilites: Hilite[]) => props.dispatch({ key: 'hilites', value: hilites })}
					/>
					<EditTabLabels
						active={props.state.activeTab === 'labels'}
						labels={props.state.labels}
						onNext={() => props.dispatch({ key: 'activeTab', value: 'render' })}
						setLabels={(labels: Label[]) => props.dispatch({ key: 'labels', value: labels })}
					/>
					<EditTabRender active={props.state.activeTab === 'render'} />
				</Grid>
			</Container>
		</>
	);
};

export default Edit;
