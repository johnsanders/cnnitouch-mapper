import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	Switch,
	TextField,
	useTheme,
} from '@mui/material';
import { RenderAction, RenderState } from './types';
import { faArrowLeft, faFilm, faRedo } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';

const playbackChoices = [
	{ code: 'ATL', name: 'Atlanta' },
	{ code: 'NYH', name: 'New York' },
	{ code: 'DC', name: 'DC' },
];

interface Props {
	active: boolean;
	handlePlaybackChange: (e: React.ChangeEvent<HTMLInputElement>, value: boolean) => void;
	dispatch: React.Dispatch<RenderAction>;
	handleSubmit: () => void;
	onPrevious?: () => void;
	state: RenderState;
}

const EditTabRender: React.FC<Props> = (props) => {
	const theme = useTheme();
	return !props.active ? null : (
		<Grid id="editTabRender" item={true} md={6} sm={8} xs={12}>
			<form onSubmit={props.handleSubmit}>
				<Box mb={2} textAlign="center">
					<TextField
						label="Slug"
						onChange={(e) => props.dispatch({ key: 'slug', value: e.currentTarget.value })}
						sx={{ marginRight: '1em', width: '45%' }}
						value={props.state.slug}
						variant="outlined"
					/>
					<TextField
						label="Your Email"
						onChange={(e) => props.dispatch({ key: 'email', value: e.currentTarget.value })}
						sx={{ width: '45%' }}
						value={props.state.email}
						variant="outlined"
					/>
				</Box>
				<Box mb={2} textAlign="center">
					<FormControl component="fieldset" variant="standard">
						<FormLabel component="legend">Playback Destinations</FormLabel>
						<FormGroup sx={{ flexDirection: 'row' }}>
							{playbackChoices.map((playbackChoice) => (
								<FormControlLabel
									control={
										<Switch
											checked={props.state.playback[playbackChoice.code]}
											inputProps={{ name: playbackChoice.code }}
											onChange={props.handlePlaybackChange}
										/>
									}
									key={playbackChoice.code}
									label={playbackChoice.name}
								/>
							))}
						</FormGroup>
					</FormControl>
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
						disabled={props.state.submitted}
						endIcon={<Icon icon={faFilm} />}
						onClick={props.handleSubmit}
						sx={{ margin: '0 5px' }}
						variant="contained"
					>
						Render
					</Button>
					<Box display="inline" position="relative" width={0}>
						<Box
							display={props.state.loading ? 'inline' : 'none'}
							left="0.5em"
							position="absolute"
							top="2px"
						>
							<CircularProgress size="1.25em" />
						</Box>
					</Box>
				</Box>
			</form>
			<Box color={theme.palette.error.main} mt={1} textAlign="center">
				{props.state.errorText}
			</Box>
			<Box color={theme.palette.success.dark} mt={1} textAlign="center">
				{props.state.confirmText}
			</Box>
			{!props.state.submitted ? null : (
				<Box mt={3} textAlign="center">
					<Button
						color="secondary"
						onClick={() => window.location.reload()}
						startIcon={<Icon icon={faRedo} />}
						variant="contained"
					>
						Start Over
					</Button>
				</Box>
			)}
		</Grid>
	);
};

export default EditTabRender;
