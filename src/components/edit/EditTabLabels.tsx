import { Box, Grid } from '@mui/material';
import EditTabNavButtons from './EditTabNavButtons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Label } from '../types';
import LabelsChooserContainer from './LabelsChooserContainer';
import React from 'react';
import { faEdit } from '@fortawesome/pro-solid-svg-icons';

interface Props {
	active: boolean;
	labels: Label[];
	onNext?: () => void;
	onPrevious?: () => void;
	setLabels: (labels: Label[]) => void;
}

const EditTabLabels: React.FC<Props> = (props: Props) =>
	!props.active ? null : (
		<Grid item={true} md={8} xs={12}>
			<Box mb={2} textAlign="center">
				<Box margin="auto" maxWidth="40em">
					<Box>Search for and select places you want to label.</Box>
					<Box>Use the controls below to select the best label position.</Box>
					<Box>
						Change the label text by clicking the
						<Icon
							className="fa-sm"
							icon={faEdit}
							style={{ marginLeft: '0.5em', marginRight: '0.5em' }}
						/>
						button.
					</Box>
				</Box>
			</Box>
			<LabelsChooserContainer labels={props.labels} setLabels={props.setLabels} />
			<EditTabNavButtons onNext={props.onNext} onPrevious={props.onPrevious} />
		</Grid>
	);

export default EditTabLabels;
