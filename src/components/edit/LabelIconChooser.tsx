import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Label } from '../../types';
import React from 'react';

interface Props {
	handleIconChange: (e: SelectChangeEvent<string>) => void;
	label: Label;
}

const LabelIconChooser: React.FC<Props> = (props) => (
	<FormControl fullWidth={true}>
		<InputLabel id="labelPosition">Icon</InputLabel>
		<Select
			label="Icon"
			labelId="icon"
			name={props.label.id}
			onChange={props.handleIconChange}
			size="small"
			value={props.label.iconType}
		>
			<MenuItem dense={true} value="none">
				None
			</MenuItem>
			<MenuItem dense={true} value="redDot">
				Dot
			</MenuItem>
			<MenuItem dense={true} value="redStar">
				Star
			</MenuItem>
		</Select>
	</FormControl>
);

export default LabelIconChooser;
