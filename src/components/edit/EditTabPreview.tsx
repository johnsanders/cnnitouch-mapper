import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import EditTabNavButtons from './EditTabNavButtons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faImage } from '@fortawesome/pro-solid-svg-icons';
import { fps } from '../map/animator/config';

const previewImageUrl =
	'https://cnn-toolbox-resources.s3.eu-central-1.amazonaws.com/render-previews';

interface Props {
	everyNthFrame: number;
	filenames: string[];
	getPreview: () => void;
	id: string;
	onNext?: () => void;
	onPrevious?: () => void;
	renderStatus: string;
	rendering: boolean;
}

const EditTabPreview: React.FC<Props> = (props: Props) => (
	<Grid item={true} md={8} xs={12}>
		<Box mb={2} textAlign="center">
			<Box margin="auto" maxWidth="40em">
				<Box>
					<Button
						color="secondary"
						disabled={props.rendering}
						onClick={props.getPreview}
						size="small"
						startIcon={<Icon icon={faImage} />}
						variant="contained"
					>
						Get Preview
					</Button>
					<Box
						display={`${props.rendering ? 'inline' : 'none'}`}
						left="0.5em"
						position="relative"
						top="2px"
					>
						<Box left={0} position="absolute" top={0} width={0}>
							<CircularProgress color="secondary" size="1.25em" />
						</Box>
					</Box>
				</Box>
				<Box mt={2}>
					{props.filenames.map((filename, i) => {
						const url = `${previewImageUrl}/${props.id}/${filename}`;
						return (
							<Box alignItems="center" display="inline-flex" flexDirection="column" key={filename}>
								<a href={url} rel="noreferrer" target="_BLANK">
									<img
										className="previewImage"
										src={`${previewImageUrl}/${props.id}/${filename}`}
										style={{ marginBottom: 0 }}
									/>
								</a>
								<Typography variant="caption">
									{`0:${Math.round((i * props.everyNthFrame) / fps)
										.toString()
										.padStart(2, '0')}`}
								</Typography>
							</Box>
						);
					})}
				</Box>
				<Box mt={2}>
					If you&apos;d like, you can get some preview frames showing how your render will look.
				</Box>
				<Box>
					If you&apos;re happy with it, click &quot;Next&quot; to queue up your render. If not, you
					can go back and make changes.
				</Box>
				<Box fontWeight="bold" mt={2}>
					{props.renderStatus}
				</Box>
			</Box>
		</Box>
		<EditTabNavButtons onNext={props.onNext} onPrevious={props.onPrevious} />
	</Grid>
);
export default EditTabPreview;
