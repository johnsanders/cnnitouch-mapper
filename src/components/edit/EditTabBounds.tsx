import { Box, Grid } from '@mui/material';
import EditTabNavButtons from './EditTabNavButtons';
import React from 'react';
import { TabName } from './types';

interface Props {
	active: boolean;
	onNext?: () => void;
	onPrevious?: () => void;
	tabName: TabName;
}

const messages = {
	boundsEnd: (
		<div>
			<p>Drag and zoom the map to the view you want to show at the end of your animation</p>
			<p>This is the main view.</p>
		</div>
	),
	boundsStart: (
		<div>
			<p>This is where your animation will start, before we zoom into your final map.</p>
			<p>
				You probably want to either leave it where it is, the whole world, or maybe slightly zoom in
				to start on a continent.
			</p>
			<p>
				If you want to change this start point, drag and zoom the map to the view you want your
				animation to begin with.
			</p>
		</div>
	),
};

const EditTabBounds: React.FC<Props> = (props: Props) =>
	!props.active ? null : (
		<Grid item={true} xs={12}>
			<Box mb={2} textAlign="center">
				{messages[props.tabName]}
			</Box>
			<EditTabNavButtons onNext={props.onNext} onPrevious={props.onPrevious} />
		</Grid>
	);

export default EditTabBounds;
