import { Box, Button, CircularProgress, Grid, TextField, useTheme } from '@mui/material';
import { faArrowLeft, faFilm } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
	active: boolean;
	confirmText: string;
	email: string;
	errorText: string;
	handleSubmit: () => void;
	loading: boolean;
	onPrevious?: () => void;
	setEmail: (email: string) => void;
	setSlug: (slug: string) => void;
	slug: string;
	submitted: boolean;
}

const EditTabRender: React.FC<Props> = (props: Props) => {
	const theme = useTheme();
	return !props.active ? null : (
		<Grid item={true} md={6} sm={8} xs={12}>
			<Box mb={2} textAlign="center">
				<form onSubmit={props.handleSubmit}>
					<TextField
						label="Slug"
						onChange={(e) => props.setSlug(e.currentTarget.value)}
						sx={{ marginRight: '1em', width: '45%' }}
						value={props.slug}
						variant="outlined"
					/>
					<TextField
						label="Your Email"
						onChange={(e) => props.setEmail(e.currentTarget.value)}
						sx={{ width: '45%' }}
						value={props.email}
						variant="outlined"
					/>
				</form>
			</Box>
			<Box textAlign="center">
				<Button
					color="secondary"
					onClick={props.onPrevious}
					startIcon={<Icon icon={faArrowLeft} />}
					sx={{ margin: '0 5px' }}
					variant="contained"
				>
					Back
				</Button>
				<Button
					color="primary"
					disabled={props.submitted}
					endIcon={<Icon icon={faFilm} />}
					onClick={props.handleSubmit}
					sx={{ margin: '0 5px' }}
					variant="contained"
				>
					Render
				</Button>
				<Box display="inline" position="relative" width={0}>
					<Box
						display={props.loading ? 'inline' : 'none'}
						left="0.5em"
						position="absolute"
						top="2px"
					>
						<CircularProgress size="1.25em" />
					</Box>
				</Box>
			</Box>
			<Box color={theme.palette.error.main} mt={1} textAlign="center">
				{props.errorText}
			</Box>
			<Box color={theme.palette.success.dark} mt={1} textAlign="center">
				{props.confirmText}
			</Box>
		</Grid>
	);
};

export default EditTabRender;
