import { Autocomplete, IconButton, List, ListItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Hilite } from '../map/types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faTrash } from '@fortawesome/pro-solid-svg-icons';
import hilitesData from '../../data/ne_10m_admin_0_countries.topo.json';

const countryNames: string[] = (hilitesData as any).objects.ne_10m_admin_0_countries.geometries
	.map((geom: any) => geom.properties.NAME)
	.sort();

interface Props {
	hilites: Hilite[];
	setHilites: (hilites: Hilite[]) => void;
}

const HilitesChooser: React.FC<Props> = (props) => {
	const [searchValue, setSearchValue] = React.useState('');
	const hiliteNames = props.hilites.map((hilite) => hilite.name);
	const handleSelect = (_e: React.SyntheticEvent<Element, Event>, value: string | null) => {
		if (!value || hiliteNames.includes(value)) return;
		props.setHilites([...props.hilites, { name: value, type: 'primary' }]);
		setSearchValue('');
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
				onChange={handleSelect}
				onInputChange={(_e, value) => setSearchValue(value)}
				options={countryNames}
				renderInput={(params) => <TextField {...params} label="Country Name" />}
				value={searchValue}
			/>
			<List>
				{props.hilites.map((hilite) => (
					<ListItem
						key={hilite.name}
						secondaryAction={
							<IconButton
								aria-label="delete"
								data-name={hilite.name}
								onClick={handleDelete}
								size="small"
							>
								<Icon icon={faTrash} />
							</IconButton>
						}
					>
						{hilite.name}
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default HilitesChooser;
