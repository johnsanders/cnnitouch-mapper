import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Label } from '../../types';
import React from 'react';

interface Props {
	handleLabelPositionChange: (e: SelectChangeEvent<number>) => void;
	label: Label;
}

const LabelPositionChooser: React.FC<Props> = (props: Props) => (
	<FormControl fullWidth={true}>
		<InputLabel id="labelPosition">Position</InputLabel>
		<Select
			label="Position"
			labelId="labelPosition"
			name={props.label.id}
			onChange={props.handleLabelPositionChange}
			size="small"
			value={props.label.angle}
		>
			<MenuItem dense={true} value={0}>
				East
			</MenuItem>
			<MenuItem dense={true} value={Math.PI * 0.25}>
				South-East
			</MenuItem>
			<MenuItem dense={true} value={Math.PI * 0.5}>
				South
			</MenuItem>
			<MenuItem dense={true} value={Math.PI * 0.75}>
				South-West
			</MenuItem>
			<MenuItem dense={true} value={Math.PI}>
				West
			</MenuItem>
			<MenuItem dense={true} value={Math.PI * 1.25}>
				North-West
			</MenuItem>
			<MenuItem dense={true} value={Math.PI * 1.5}>
				North
			</MenuItem>
			<MenuItem dense={true} value={Math.PI * 1.75}>
				North-East
			</MenuItem>
		</Select>
	</FormControl>
);

export default LabelPositionChooser;
