import { Box, Grid } from '@mui/material';
import EditTabNavButtons from './EditTabNavButtons';
import { Hilite } from '../map/types';
import HiliteChooser from './HilitesChooser';
import React from 'react';

interface Props {
	active: boolean;
	hilites: Hilite[];
	onNext?: () => void;
	onPrevious?: () => void;
	setHilites: (hilites: Hilite[]) => void;
}

const EditTabHilites: React.FC<Props> = (props: Props) =>
	!props.active ? null : (
		<Grid item={true} md={6} sm={8} xs={12}>
			<Box mb={2} textAlign="center">
				Search for and select the countries you want to highlight.
			</Box>
			<HiliteChooser hilites={props.hilites} setHilites={props.setHilites} />
			<EditTabNavButtons onNext={props.onNext} onPrevious={props.onPrevious} />
		</Grid>
	);

export default EditTabHilites;
