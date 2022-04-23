import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Map } from 'leaflet';
import MapContainer from './MapContainer';
import React from 'react';
import { debounce } from 'lodash-es';
import googleApiKey from '../config/googleApiKey_disableGit.json';

const Edit: React.FC = () => {
	const mapRef = React.useRef<Map>(null);
	const [dims, setDims] = React.useState<[number, number]>([1280, 720]);
	const [place, setPlace] = React.useState(null);
	const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
		const boundsObj = mapRef.current?.getBounds();
		const southWest = boundsObj?.getSouthWest();
		const northEast = boundsObj?.getNorthEast();
		const bounds = [
			[southWest?.lat, southWest?.lng],
			[northEast?.lat, northEast?.lng],
		];
		console.log(JSON.stringify(bounds));
	};
	React.useEffect(() => {
		const calculateDims = debounce(() => {
			const width = window.innerWidth / 2;
			const height = width / 1.777777;
			setDims([width, height]);
			setTimeout(() => mapRef.current?.invalidateSize(), 100);
		}, 500);
		calculateDims();
		window.addEventListener('resize', calculateDims);
		return () => window.removeEventListener('resize', calculateDims);
	}, []);
	return (
		<div style={{ display: 'flex', position: 'relative' }}>
			<div style={{ width: '50%' }}>
				<MapContainer dims={dims} mode="edit" ref={mapRef} />
			</div>
			<div style={{ width: '50%' }}>
				<button onClick={handleSave}>Save</button>
				<GooglePlacesAutocomplete
					apiKey={googleApiKey.key}
					selectProps={{ onChange: setPlace, value: place }}
				/>
			</div>
		</div>
	);
};

export default Edit;
