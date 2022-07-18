import { Box, Button, Grid } from '@mui/material';
import EditTabNavButtons from './EditTabNavButtons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faImage } from '@fortawesome/pro-solid-svg-icons';

const previewImageUrl =
	'https://cnn-toolbox-resources.s3.eu-central-1.amazonaws.com/render-previews';

interface Props {
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
				</Box>
				<Box mt={2}>
					{props.filenames.map((filename) => (
						<img
							className="previewImage"
							key={filename}
							src={`${previewImageUrl}/${props.id}/${filename}`}
						/>
					))}
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
