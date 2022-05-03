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
import { Label } from '../map/labels/types';
import React from 'react';
import { faTrash } from '@fortawesome/pro-solid-svg-icons';
import geoSearch from '../..//misc/geoSearch';
import hilitesData from '../../data/ne_10m_admin_0_countries.topo.json';
import { v4 as uuid } from 'uuid';

const countryNames: string[] = (hilitesData as any).objects.ne_10m_admin_0_countries.geometries
	.map((geom: any) => geom.properties.NAME)
	.sort();

const createLabelByName = async (name: string): Promise<Label | null> => {
	try {
		const geoResults = await geoSearch(name);
		const location = geoResults[0].geometry?.location;
		if (!location) return null;
		return {
			angle: 0,
			iconType: 'none',
			id: uuid(),
			lat: location.lat(),
			lng: location.lng(),
			name,
			type: 'area',
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};

interface Props {
	hilites: Hilite[];
	setHilites: (hilites: Hilite[]) => void;
}

const HilitesChooser: React.FC<Props> = (props) => {
	const [searchValue, setSearchValue] = React.useState('');
	const handleAddHilite = async (_e: React.SyntheticEvent, value: string | null) => {
		const hiliteNames = props.hilites.map((hilite) => hilite.name);
		if (!value || hiliteNames.includes(value)) return;
		const label = (await createLabelByName(value)) || undefined;
		props.setHilites([...props.hilites, { id: uuid(), label, name: value }]);
		setSearchValue('');
	};
	const handleLabelChange = async (e: SelectChangeEvent) => {
		const newHilitesPromises = props.hilites.map(async (hilite): Promise<Hilite> => {
			if (hilite.id !== e.target.name) return hilite;
			const angle = parseFloat(e.target.value);
			if (hilite.label) return { ...hilite, label: { ...hilite.label, angle } };
			const newLabel = await createLabelByName(hilite.name);
			if (newLabel) return { ...hilite, label: { ...newLabel, angle } };
			else return { ...hilite };
		});
		const newHilites = await Promise.all(newHilitesPromises);
		props.setHilites(newHilites);
	};
	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		const nameToDelete = e.currentTarget.dataset.name;
		if (!nameToDelete) throw new Error('Cannot get name to delete');
		props.setHilites(props.hilites.filter((hilite) => hilite.name !== nameToDelete));
	};
	return (
		<Box>
			<Autocomplete
				clearIcon={null}
				clearOnBlur={true}
				freeSolo={true}
				inputValue={searchValue}
				onChange={handleAddHilite}
				onInputChange={(_e, value) => setSearchValue(value)}
				options={countryNames}
				renderInput={(params) => <TextField {...params} label="Country Name" />}
				style={{ marginBottom: '1em' }}
				value={searchValue}
			/>
			<Table>
				<TableBody>
					{props.hilites.map((hilite) => (
						<TableRow key={hilite.name} style={{ backgroundColor: '#f8f8f8' }}>
							<TableCell>{hilite.name}</TableCell>
							<TableCell>
								<FormControl fullWidth={true}>
									<InputLabel id="labelPosition">Position</InputLabel>
									<Select
										label="Position"
										labelId="labelPosition"
										name={hilite.id}
										onChange={handleLabelChange}
										size="small"
										value={(hilite?.label?.angle || -1).toString()}
									>
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
									onClick={handleDelete}
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
