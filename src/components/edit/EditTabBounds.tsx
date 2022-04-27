import { Box, Button, Grid } from '@mui/material';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons';

interface Props {
	active: boolean;
	onNext: () => void;
}

const EditTabBounds: React.FC<Props> = (props: Props) =>
	!props.active ? null : (
		<Grid item={true} xs={12}>
			<Box mb={2} textAlign="center">
				Drag and zoom the map to the view you want to show.
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
