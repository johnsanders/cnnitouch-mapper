import { Box, Button, Grid } from '@mui/material';
import { Hilite } from '../map/types';
import HiliteChooser from './HilitesChooser';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons';

interface Props {
	active: boolean;
	hilites: Hilite[];
	onNext: () => void;
	setHilites: (hilites: Hilite[]) => void;
}

const EditTabHilites: React.FC<Props> = (props: Props) =>
	!props.active ? null : (
		<Grid item={true} md={6} sm={8} xs={12}>
			<Box mb={2} textAlign="center">
				Search for and select the countries you want to highlight.
			</Box>
			<HiliteChooser hilites={props.hilites} setHilites={props.setHilites} />
			<Box mt={2} textAlign="center">
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

export default EditTabHilites;
