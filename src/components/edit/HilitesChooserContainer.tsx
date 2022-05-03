import { Hilite } from '../map/types';
import HilitesChooser from './HilitesChooser';
import { Label } from '../map/labels/types';
import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import createLabelByName from './createLabelByName';
import hilitesData from '../../data/ne_10m_admin_0_countries.topo.json';
import { v4 as uuid } from 'uuid';

export const countryNames: string[] = (
	hilitesData as any
).objects.ne_10m_admin_0_countries.geometries
	.map((geom: any) => geom.properties.NAME)
	.sort();

interface Props {
	hilites: Hilite[];
	setHilites: (hilites: Hilite[]) => void;
}

const HilitesChooserContainer: React.FC<Props> = (props) => {
	const labelsCreatedRef = React.useRef<{ [key: string]: Label }>({});
	const [searchValue, setSearchValue] = React.useState('');
	const handleAddHilite = async (_e: React.SyntheticEvent, value: string | null) => {
		const hiliteNames = props.hilites.map((hilite) => hilite.name);
		if (!value || hiliteNames.includes(value)) return;
		const label = (await createLabelByName(value)) || undefined;
		if (label) labelsCreatedRef.current[value] = label;
		props.setHilites([...props.hilites, { id: uuid(), label, name: value }]);
		setSearchValue('');
	};
	const handleLabelChange = async (e: SelectChangeEvent) => {
		const newHilitesPromises = props.hilites.map(async (hilite): Promise<Hilite> => {
			if (hilite.id !== e.target.name) return hilite;
			if (e.target.value === 'none') {
				const { label, ...rest } = hilite;
				if (label) labelsCreatedRef.current[hilite.name] = label;
				return rest;
			}
			const angle = parseFloat(e.target.value);
			if (hilite.label) return { ...hilite, label: { ...hilite.label, angle } };
			const newLabel =
				labelsCreatedRef.current[hilite.name] || (await createLabelByName(hilite.name));
			if (newLabel) {
				labelsCreatedRef.current[hilite.name] = newLabel;
				return { ...hilite, label: { ...newLabel, angle } };
			} else return { ...hilite };
		});
		const newHilites = await Promise.all(newHilitesPromises);
		props.setHilites(newHilites);
	};
	const handleNameChange = (id: string, name: string) =>
		props.setHilites(
			props.hilites.map((hilite) => {
				if (hilite.id !== id || !hilite.label) return hilite;
				return { ...hilite, label: { ...hilite.label, name } };
			}),
		);

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		const nameToDelete = e.currentTarget.dataset.name;
		if (!nameToDelete) throw new Error('Cannot get name to delete');
		props.setHilites(props.hilites.filter((hilite) => hilite.name !== nameToDelete));
	};
	return (
		<HilitesChooser
			handleAddHilite={handleAddHilite}
			handleDelete={handleDelete}
			handleLabelChange={handleLabelChange}
			handleNameChange={handleNameChange}
			hilites={props.hilites}
			searchValue={searchValue}
			setSearchValue={setSearchValue}
		/>
	);
};

export default HilitesChooserContainer;
