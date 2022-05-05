import { continueRender, delayRender } from 'remotion';
import { useMap, useMapEvents } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import React from 'react';
import { debounce } from 'lodash-es';

interface Props {
	setBounds?: (bounds: LatLngBounds) => void;
	initialBounds: LatLngBounds;
}

const MapEventHandlers: React.FC<Props> = (props: Props): null => {
	const didInitRef = React.useRef(false);
	const map = useMap();
	const { initialBounds } = props;
	React.useEffect(() => {
		const delayId = delayRender();
		setTimeout(() => continueRender(delayId), 3000);
	}, []);
	React.useEffect(() => {
		if (didInitRef.current) return;
		else {
			map.fitBounds(initialBounds);
			didInitRef.current = true;
		}
		const afterResize = debounce(() => map.invalidateSize(), 1000);
		window.addEventListener('resize', afterResize);
		return () => window.removeEventListener('resize', afterResize);
	}, [initialBounds, map]);
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
