import {
	Box,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';

const PlaceSearch: React.FC = () => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	React.useEffect(() => {
		if (!inputRef.current) throw new Error('Input ref is undefined');
		const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();
			console.log(place.geometry?.location?.lat());
			console.log(place.geometry?.location?.lng());
		});
	}, []);
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
		</Box>
	);
};

export default PlaceSearch;
