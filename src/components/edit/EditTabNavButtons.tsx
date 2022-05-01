import { Box, Button } from '@mui/material';
import { faArrowLeft, faArrowRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
	onNext?: () => void;
	onPrevious?: () => void;
}

const EditTabNavButtons: React.FC<Props> = (props: Props) => (
	<Box mt={2} textAlign="center">
		{!props.onPrevious ? null : (
			<Button
				color="secondary"
				onClick={props.onPrevious}
				startIcon={<Icon icon={faArrowLeft} />}
				sx={{ margin: '0 5px' }}
				variant="contained"
			>
				Back
			</Button>
		)}
		{!props.onNext ? null : (
			<Button
				color="secondary"
				endIcon={<Icon icon={faArrowRight} />}
				onClick={props.onNext}
				sx={{ margin: '0 5px' }}
				variant="contained"
			>
				Next
			</Button>
		)}
	</Box>
);

export default EditTabNavButtons;
