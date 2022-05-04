import {
	Autocomplete,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { Hilite } from '../map/types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import InlineEdit from './InlineEdit';
import React from 'react';
import { countryNames } from './HilitesChooserContainer';
import { faTrash } from '@fortawesome/pro-solid-svg-icons';

interface Props {
	handleAddHilite: (_e: React.SyntheticEvent, value: string | null) => Promise<void>;
	handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
	handleNameChange: (id: string, value: string) => void;
	handleLabelChange: (e: SelectChangeEvent) => void;
	hilites: Hilite[];
	searchValue: string;
	setSearchValue: (value: string) => void;
}

const HilitesChooser: React.FC<Props> = (props) => {
	return (
		<Box>
			<Autocomplete
				clearIcon={null}
				clearOnBlur={true}
				freeSolo={true}
				inputValue={props.searchValue}
				onChange={props.handleAddHilite}
				onInputChange={(_e, value) => props.setSearchValue(value)}
				options={countryNames}
				renderInput={(params) => <TextField {...params} label="Country Name" />}
				style={{ marginBottom: '1em' }}
				value={props.searchValue}
			/>
			<Table>
				<colgroup>
					<col style={{ width: '50%' }} />
					<col style={{ width: '40%' }} />
					<col style={{ width: '10%' }} />
				</colgroup>
				<TableBody>
					{props.hilites.map((hilite) => (
						<TableRow key={hilite.name} style={{ backgroundColor: '#f8f8f8' }}>
							<TableCell>
								{!hilite.label ? (
									<span>{hilite.name}</span>
								) : (
									<InlineEdit
										id={hilite.id}
										updateValue={props.handleNameChange}
										value={hilite.label.name}
									/>
								)}
							</TableCell>
							<TableCell>
								<FormControl fullWidth={true} size="small">
									<InputLabel id="labelPosition">Label</InputLabel>
									<Select
										label="Position"
										labelId="labelPosition"
										name={hilite.id}
										onChange={props.handleLabelChange}
										size="small"
										value={(typeof hilite?.label?.angle === 'number'
											? hilite.label.angle
											: 'none'
										).toString()}
									>
										<MenuItem value="none">None</MenuItem>
										<MenuItem value={-1}>Center</MenuItem>
										<MenuItem value={0}>East</MenuItem>
										<MenuItem value={Math.PI * 0.25}>South-East</MenuItem>
										<MenuItem value={Math.PI * 0.5}>South</MenuItem>
										<MenuItem value={Math.PI * 0.75}>South-West</MenuItem>
										<MenuItem value={Math.PI}>West</MenuItem>
										<MenuItem value={Math.PI * 1.25}>North-West</MenuItem>
										<MenuItem value={Math.PI * 1.5}>North</MenuItem>
										<MenuItem value={Math.PI * 1.75}>North-East</MenuItem>
									</Select>
								</FormControl>
							</TableCell>
							<TableCell align="right">
								<IconButton
									aria-label="delete"
									data-name={hilite.name}
									onClick={props.handleDelete}
									size="small"
								>
									<Icon icon={faTrash} />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
};

export default HilitesChooser;
