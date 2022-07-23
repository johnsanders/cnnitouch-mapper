import { Box, Grid } from '@mui/material';
import EditTabNavButtons from './EditTabNavButtons';
import { Hilite } from '../../types';
import HiliteChooserContainer from './HilitesChooserContainer';
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
		<Grid id="editTabHilites" item={true} md={6} sm={8} xs={12}>
			<Box mb={2} textAlign="center">
				Search for and select the countries you want to highlight.
			</Box>
			<HiliteChooserContainer hilites={props.hilites} setHilites={props.setHilites} />
			<EditTabNavButtons onNext={props.onNext} onPrevious={props.onPrevious} />
		</Grid>
	);

export default EditTabHilites;
