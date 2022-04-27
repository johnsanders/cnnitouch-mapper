import { useMap, useMapEvents } from 'react-leaflet';
import { Bounds } from './types';
import React from 'react';
import { debounce } from 'lodash-es';

interface Props {
	setBounds?: (bounds: Bounds) => void;
}

const MapEventHandlers: React.FC<Props> = (props: Props): null => {
	const map = useMap();
	React.useEffect(() => {
		const afterResize = debounce(() => map.invalidateSize(), 1000);
		window.addEventListener('resize', afterResize);
		return () => window.removeEventListener('resize', afterResize);
	}, [map]);
	const handleBoundsChange = () => {
		if (!props.setBounds) return;
		// const boundsObj = map.getBounds();
		// props.setBounds([boundsObj.getSouthWest(), boundsObj.getNorthEast()]);
	};
	useMapEvents({
		moveend: handleBoundsChange,
		zoomend: handleBoundsChange,
	});

	return null;
};

export default MapEventHandlers;
