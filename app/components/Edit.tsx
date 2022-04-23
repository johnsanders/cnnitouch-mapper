import { LatLngExpression, Map } from 'leaflet';
import MapContainer from './MapContainer';
import React from 'react';
import { debounce } from 'lodash-es';

const Edit: React.FC = () => {
	const mapRef = React.useRef<Map>(null);
	const [dims, setDims] = React.useState<[number, number]>([1280, 720]);
	const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
		// e.preventDefault();
		const boundsObj = mapRef.current?.getBounds();
		const southWest = boundsObj?.getSouthWest();
		const northEast = boundsObj?.getNorthEast();
		const bounds = [
			[southWest?.lat, southWest?.lng],
			[northEast?.lat, northEast?.lng],
		];
		console.log(JSON.stringify(bounds));
	};
	setTimeout(handleSave, 3000);
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
				<MapContainer dims={dims} ref={mapRef} type="edit" />
			</div>
			<div>
				<button onClick={handleSave}>Save</button>
			</div>
		</div>
	);
};

export default Edit;
