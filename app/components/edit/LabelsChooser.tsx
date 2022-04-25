import {
	Box,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	List,
	ListItem,
	OutlinedInput,
} from '@mui/material';
import { faTimes, faTrash } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Label } from '../map/types';
import React from 'react';
import { v4 as uuid } from 'uuid';

interface Props {
	labels: Label[];
	setLabels: (labels: Label[]) => void;
}

const PlaceSearch: React.FC<Props> = (props) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const { labels, setLabels } = props;
	React.useEffect(() => {
		if (!inputRef.current) throw new Error('Input ref is undefined');
		const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();
			const lat = place.geometry?.location?.lat();
			const lng = place.geometry?.location?.lng();
			const name = place.name;
			if (!lat || !lng || !name) throw new Error('Could not get place info');
			const label: Label = {
				iconType: 'redDot',
				id: uuid(),
				lat,
				lng,
				name,
				relativePosition: [0, 0],
				type: 'point',
			};
			setLabels([...labels, label]);
			if (inputRef.current) inputRef.current.value = '';
		});
	}, [labels, setLabels]);
	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		const idToDelete = e.currentTarget.dataset.id;
		if (!idToDelete) throw new Error('Cannot get id to delete');
		props.setLabels(props.labels.filter((label) => label.id !== idToDelete));
	};
	return (
		<Box>
			<FormControl fullWidth={true}>
				<InputLabel htmlFor="locationSearch">Location Search</InputLabel>
				<OutlinedInput
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								onClick={() => void (inputRef.current && (inputRef.current.value = ''))}
								size="small"
							>
								<Icon icon={faTimes} />
							</IconButton>
						</InputAdornment>
					}
					id="locationSearch"
					inputRef={inputRef}
					label="Location Search"
				/>
			</FormControl>
			<List>
				{props.labels.map((label) => (
					<ListItem
						key={label.id}
						secondaryAction={
							<IconButton
								aria-label="delete"
								data-id={label.id}
								onClick={handleDelete}
								size="small"
							>
								<Icon icon={faTrash} />
							</IconButton>
						}
					>
						{label.name}
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default PlaceSearch;
