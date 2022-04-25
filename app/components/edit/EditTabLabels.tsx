import { Box, Button, Grid } from '@mui/material';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import PlaceSearch from './LabelsChooser';
import React from 'react';
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons';

interface Props {
	active: boolean;
	onNext: () => void;
}

const EditTabLabels: React.FC<Props> = (props: Props) =>
	!props.active ? null : (
		<Grid item={true} md={6} sm={8} xs={12}>
			<Box mb={2} textAlign="center">
				Search for and select places you want to label. When the label appears on the map, drag it
				to the best position.
			</Box>
			<PlaceSearch />
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

export default EditTabLabels;
