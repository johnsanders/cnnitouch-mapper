import { Box, Button, Grid } from '@mui/material';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { TabName } from './types';
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons';

interface Props {
	active: boolean;
	onNext: () => void;
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
		</div>
	),
};

const EditTabBounds: React.FC<Props> = (props: Props) =>
	!props.active ? null : (
		<Grid item={true} xs={12}>
			<Box mb={2} textAlign="center">
				{messages[props.tabName]}
			</Box>
			<Box textAlign="center">
				<Button
					color="secondary"
					endIcon={<Icon icon={faArrowRight} />}
					onClick={props.onNext}
					variant="contained"
				>
					Next
				</Button>
			</Box>
		</Grid>
	);

export default EditTabBounds;
