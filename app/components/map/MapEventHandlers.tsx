import { useMap, useMapEvents } from 'react-leaflet';
import { Bounds } from './types';
import React from 'react';
import { debounce } from 'lodash-es';
import { mapWidthPct } from './Map';

interface Props {
	setBounds?: (bounds: Bounds) => void;
	setDims: (dims: [number, number]) => void;
}

const MapEventHandlers: React.FC<Props> = (props: Props): null => {
	const map = useMap();
	const handleBoundsChange = () => {
		if (!props.setBounds) return;
		const boundsObj = map.getBounds();
		props.setBounds([boundsObj.getSouthWest(), boundsObj.getNorthEast()]);
	};
	useMapEvents({
		moveend: handleBoundsChange,
		zoomend: handleBoundsChange,
	});
	const { setDims } = props;
	React.useEffect(() => {
		const updateDims = debounce(() => {
			const width = window.innerWidth * mapWidthPct;
			const height = width * 0.5625;
			setDims([width, height]);
			setTimeout(() => map.invalidateSize(), 100);
		}, 500);
		window.addEventListener('resize', updateDims);
		return () => window.removeEventListener('resize', updateDims);
	}, [map, setDims]);

	return null;
};

export default MapEventHandlers;
