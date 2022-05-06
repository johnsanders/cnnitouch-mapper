import { continueRender, delayRender } from 'remotion';
import { useMap, useMapEvents } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import React from 'react';
import { debounce } from 'lodash-es';

interface Props {
	setBounds?: (bounds: LatLngBounds) => void;
	initialBounds: LatLngBounds;
	mode: string;
}

const MapEventHandlers: React.FC<Props> = (props: Props): null => {
	const map = useMap();
	const { initialBounds, mode } = props;
	React.useEffect(() => {
		map.fitBounds(initialBounds);
		const afterResize = debounce(() => map.invalidateSize(), 1000);
		window.addEventListener('resize', afterResize);
		return () => window.removeEventListener('resize', afterResize);
	}, [initialBounds, map]);
	React.useEffect(() => {
		if (mode === 'edit') return;
		const delayId = delayRender();
		setTimeout(() => continueRender(delayId), 2000);
		return () => continueRender(delayId);
	}, [mode]);
	const handleBoundsChange = () => {
		if (!props.setBounds) return;
		props.setBounds(map.getBounds());
	};
	useMapEvents({
		moveend: handleBoundsChange,
		zoomend: handleBoundsChange,
	});
	return null;
};

export default MapEventHandlers;
