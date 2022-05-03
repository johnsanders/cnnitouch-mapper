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
} from '@mui/material';
import { faTimes, faTrash } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Label } from '../map/labels/types';
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
				angle: 0.3,
				iconType: 'redDot',
				id: uuid(),
				lat,
				lng,
				name,
				relativePosition: [0, 0],
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
	const handleLabelPositionChange = (e: SelectChangeEvent<number>) => {
		props.setLabels(
			props.labels.map((label) =>
				label.id === e.target.name ? ({ ...label, angle: e.target.value } as Label) : label,
			),
		);
	};
	return (
		<Box>
			<FormControl fullWidth={true} sx={{ marginBottom: '1em' }}>
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
			<Table>
				<TableBody>
					{props.labels.map((label) => (
						<TableRow key={label.id} sx={{ backgroundColor: '#f8f8f8' }}>
							<TableCell>{label.name}</TableCell>
							<TableCell>
								<FormControl fullWidth={true}>
									<InputLabel id="labelPosition">Position</InputLabel>
									<Select
										label="Position"
										labelId="labelPosition"
										name={label.id}
										onChange={handleLabelPositionChange}
										size="small"
										value={label.angle}
									>
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
									data-id={label.id}
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

export default PlaceSearch;
