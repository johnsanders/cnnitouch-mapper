import {
	Box,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	SelectChangeEvent,
	Table,
} from '@mui/material';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Label } from '../types';
import LabelsSortable from './LabelsSortable';
import React from 'react';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';

interface Props {
	handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
	handleIconChange: (e: SelectChangeEvent<string>) => void;
	handleLabelNameChange: (id: string, value: string) => void;
	handleLabelPositionChange: (e: SelectChangeEvent<number>) => void;
	inputRef: React.MutableRefObject<HTMLInputElement | null>;
	labels: Label[];
	setLabels: (labels: Label[]) => void;
}

const LabelsChooser: React.FC<Props> = (props) => (
	<Box>
		<FormControl fullWidth={true} size="small" sx={{ marginBottom: '1em' }}>
			<InputLabel htmlFor="locationSearch">Location Search</InputLabel>
			<OutlinedInput
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							onClick={() => void (props.inputRef.current && (props.inputRef.current.value = ''))}
							size="small"
						>
							<Icon icon={faTimes} />
						</IconButton>
					</InputAdornment>
				}
				id="locationSearch"
				inputRef={props.inputRef}
				label="Location Search"
			/>
		</FormControl>
		<Table>
			<colgroup>
				<col style={{ width: '30%' }} />
				<col style={{ width: '30%' }} />
				<col style={{ width: '30%' }} />
				<col style={{ width: '10%' }} />
			</colgroup>
			<LabelsSortable
				handleDelete={props.handleDelete}
				handleIconChange={props.handleIconChange}
				handleLabelNameChange={props.handleLabelNameChange}
				handleLabelPositionChange={props.handleLabelPositionChange}
				labels={props.labels}
				setLabels={props.setLabels}
			/>
		</Table>
	</Box>
);
export default LabelsChooser;
