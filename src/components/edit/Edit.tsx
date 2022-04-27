import { Container, CssBaseline, Grid, Tab, Tabs } from '@mui/material';
import { EditAction, EditState } from './types';
import { Hilite, Label } from '../map/types';
import EditTabBounds from './EditTabBounds';
import EditTabHilites from './EditTabHilites';
import EditTabLabels from './EditTabLabels';
import EditTabRender from './EditTabRender';
import Map from '../map/Map';
import { Player } from '@remotion/player';
import React from 'react';
import { debounce } from 'lodash-es';

export const mapWidthPct = 0.65;
const getMapDims = () => {
	const width = Math.round(window.innerWidth * mapWidthPct);
	const height = Math.round(width * 0.5625);
	return [width, height];
};

interface Props {
	dispatch: React.Dispatch<EditAction>;
	state: EditState;
}

const Edit: React.FC<Props> = (props) => {
	const [dims, setDims] = React.useState(getMapDims());
	React.useEffect(() => {
		const updateDims = debounce(() => setDims(getMapDims()), 250);
		window.addEventListener('resize', updateDims);
		return () => window.removeEventListener('resize', updateDims);
	}, [setDims]);
	return (
		<>
			<CssBaseline />
			<Container>
				<Grid container={true} justifyContent="center">
					<Grid item={true} justifyContent="center" xs={12}>
						<Player
							component={Map}
							compositionHeight={dims[1]}
							compositionWidth={dims[0]}
							controls={true}
							durationInFrames={300}
							fps={30}
							inputProps={{
								endBounds: [
									[36.24573, -5.15903],
									[36.039, -5.61413],
								],
								hilites: props.state.hilites,
								labels: props.state.labels,
								mode: 'render',
								// setBounds: (bounds: Bounds) => props.dispatch({ key: 'bounds', value: bounds }),
								startBounds: [
									[69.77895, 174.726562],
									[-69.2872, -174.023437],
								],
							}}
							numberOfSharedAudioTags={0}
							style={{ margin: 'auto' }}
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
