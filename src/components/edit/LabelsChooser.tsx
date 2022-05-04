import {
	Box,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Tooltip,
} from '@mui/material';
import { faTimes, faTrash } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import InlineEdit from './InlineEdit';
import { Label } from '../map/labels/types';
import React from 'react';

interface Props {
	handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
	handleIconChange: (e: SelectChangeEvent<string>) => void;
	handleLabelNameChange: (id: string, value: string) => void;
	handleLabelPositionChange: (e: SelectChangeEvent<number>) => void;
	inputRef: React.MutableRefObject<HTMLInputElement | null>;
	labels: Label[];
	setLabels: (labels: Label[]) => void;
}

const PlaceSearch: React.FC<Props> = (props) => (
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
				<col style={{ width: '45%' }} />
				<col style={{ width: '5%' }} />
			</colgroup>
			<TableBody>
				{props.labels.map((label) => (
					<TableRow key={label.id} sx={{ backgroundColor: '#f8f8f8' }}>
						<TableCell>
							<InlineEdit
								id={label.id}
								updateValue={props.handleLabelNameChange}
								value={label.name}
							/>
						</TableCell>
						<TableCell>
							<FormControl fullWidth={true}>
								<InputLabel id="labelPosition">Icon</InputLabel>
								<Select
									label="Icon"
									labelId="icon"
									name={label.id}
									onChange={props.handleIconChange}
									size="small"
									value={label.iconType}
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
						</TableCell>
						<TableCell>
							<FormControl fullWidth={true}>
								<InputLabel id="labelPosition">Position</InputLabel>
								<Select
									label="Position"
									labelId="labelPosition"
									name={label.id}
									onChange={props.handleLabelPositionChange}
									size="small"
									value={label.angle}
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
						</TableCell>
						<TableCell align="right">
							<Tooltip arrow={true} placement="top" title="Delete">
								<IconButton
									aria-label="delete"
									data-id={label.id}
									onClick={props.handleDelete}
									size="small"
								>
									<Icon icon={faTrash} />
								</IconButton>
							</Tooltip>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</Box>
);
export default PlaceSearch;
