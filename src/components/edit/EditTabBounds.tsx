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
			<p>Drag and zoom the map to the view you want to start from.</p>
			<p>This is where your animation with start, before we zoom into your final map.</p>
			<p>You probably want either the whole world or a continent.</p>
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
