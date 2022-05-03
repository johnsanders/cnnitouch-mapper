import { Box, Grid } from '@mui/material';
import EditTabNavButtons from './EditTabNavButtons';
import { Label } from '../map/labels/types';
import LabelsChooserContainer from './LabelsChooserContainer';
import React from 'react';

interface Props {
	active: boolean;
	labels: Label[];
	onNext?: () => void;
	onPrevious?: () => void;
	setLabels: (labels: Label[]) => void;
}

const EditTabLabels: React.FC<Props> = (props: Props) =>
	!props.active ? null : (
		<Grid item={true} md={6} sm={8} xs={12}>
			<Box mb={2} textAlign="center">
				Search for and select places you want to label. When the label appears on the map, use the
				controls in the list below to select the best position.
			</Box>
			<LabelsChooserContainer labels={props.labels} setLabels={props.setLabels} />
			<EditTabNavButtons onNext={props.onNext} onPrevious={props.onPrevious} />
		</Grid>
	);

export default EditTabLabels;
