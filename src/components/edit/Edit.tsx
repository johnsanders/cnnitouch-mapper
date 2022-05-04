import { Container, CssBaseline, Grid, Tab, Tabs } from '@mui/material';
import { EditAction, EditSettings } from './types';
import EditMap from './EditMap';
import EditTabBanner from './EditTabBanner';
import EditTabBounds from './EditTabBounds';
import EditTabHilites from './EditTabHilites';
import EditTabLabels from './EditTabLabels';
import EditTabRender from './EditTabRender';
import { Hilite } from '../map/types';
import { Label } from '../map/labels/types';
import React from 'react';

interface Props {
	dispatch: React.Dispatch<EditAction>;
	state: EditSettings;
}

const Edit: React.FC<Props> = (props) => {
	return (
		<>
			<CssBaseline />
			<Container>
				<EditMap dispatch={props.dispatch} state={props.state} />
				<Grid container={true} justifyContent="center">
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
