import { Container, CssBaseline, Grid, Tab, Tabs, Typography } from '@mui/material';
import { EditAction, EditSettings } from './types';
import { Hilite, Label } from '../../types';
import EditMap from './EditMap';
import EditTabBanner from './EditTabBanner';
import EditTabBounds from './EditTabBounds';
import EditTabHilites from './EditTabHilites';
import EditTabLabels from './EditTabLabels';
import EditTabPreviewContainer from './EditTabPreviewContainer';
import EditTabRenderContainer from './EditTabRenderContainer';
import Nav from '@johnsand/nav';
import React from 'react';
import SpecialCasesInfo from './SpecialCasesInfo';

interface Props {
	dispatch: React.Dispatch<EditAction>;
	state: EditSettings;
}

const Edit: React.FC<Props> = (props) => {
	const hiliteNames = props.state.mapSettings.hilites.map((hilite) => hilite.name);
	const labelNames = props.state.mapSettings.labels.map((label) => label.name);
	const { activeTab, mapSettings } = props.state;
	return (
		<>
			<CssBaseline />
			<Nav />
			<Container sx={{ marginBottom: '2em', marginTop: '1em' }}>
				<Grid container={true} justifyContent="center">
					<Typography variant="h4">Mapper</Typography>
					<EditMap dispatch={props.dispatch} state={props.state} />
					<SpecialCasesInfo names={[...hiliteNames, ...labelNames]} />
					<Grid item={true} xs={12}>
						<Tabs
							centered={true}
							onChange={(_e, value) => props.dispatch({ key: 'activeTab', value })}
							sx={{ marginBottom: '1em' }}
							value={activeTab}
						>
							<Tab label="Banner" value="banner" />
							<Tab label="Highlights" value="hilites" />
							<Tab label="Map Start" value="boundsStart" />
							<Tab label="Map End" value="boundsEnd" />
							<Tab label="Labels" value="labels" />
							<Tab label="Preview" value="preview" />
							<Tab label="Render" value="render" />
						</Tabs>
					</Grid>
					<EditTabBanner
						active={activeTab === 'banner'}
						bannerText={mapSettings.bannerText}
						onNext={() => props.dispatch({ key: 'activeTab', value: 'hilites' })}
						setBanner={(value) => props.dispatch({ key: 'bannerText', value })}
						setSubhead={(value) => props.dispatch({ key: 'subheadText', value })}
						subheadText={mapSettings.subheadText}
					/>
					<EditTabHilites
						active={activeTab === 'hilites'}
						hilites={mapSettings.hilites}
						onNext={() => props.dispatch({ key: 'activeTab', value: 'boundsStart' })}
						onPrevious={() => props.dispatch({ key: 'activeTab', value: 'banner' })}
						setHilites={(hilites: Hilite[]) => props.dispatch({ key: 'hilites', value: hilites })}
					/>
					<EditTabBounds
						active={activeTab === 'boundsStart' || activeTab === 'boundsEnd'}
						onNext={() =>
							props.dispatch({
								key: 'activeTab',
								value: activeTab === 'boundsStart' ? 'boundsEnd' : 'labels',
							})
						}
						onPrevious={() =>
							props.dispatch({
								key: 'activeTab',
								value: activeTab === 'boundsStart' ? 'hilites' : 'boundsStart',
							})
						}
						tabName={activeTab}
					/>
					<EditTabLabels
						active={activeTab === 'labels'}
						labels={mapSettings.labels}
						onNext={() => props.dispatch({ key: 'activeTab', value: 'preview' })}
						onPrevious={() => props.dispatch({ key: 'activeTab', value: 'boundsEnd' })}
						setLabels={(labels: Label[]) => props.dispatch({ key: 'labels', value: labels })}
					/>
					<EditTabPreviewContainer
						active={activeTab === 'preview'}
						mapSettings={mapSettings}
						onNext={() => props.dispatch({ key: 'activeTab', value: 'render' })}
						onPrevious={() => props.dispatch({ key: 'activeTab', value: 'labels' })}
					/>
					<EditTabRenderContainer
						active={activeTab === 'render'}
						mapSettings={mapSettings}
						onPrevious={() => props.dispatch({ key: 'activeTab', value: 'preview' })}
					/>
				</Grid>
			</Container>
		</>
	);
};

export default Edit;
