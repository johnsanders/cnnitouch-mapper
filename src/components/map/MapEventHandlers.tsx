import { useMap, useMapEvents } from 'react-leaflet';
import { LatLngBoundsExpression } from 'leaflet';
import React from 'react';
import { debounce } from 'lodash-es';

interface Props {
	setBounds?: (bounds: LatLngBoundsExpression) => void;
	initialBounds: LatLngBoundsExpression;
}

const MapEventHandlers: React.FC<Props> = (props: Props): null => {
	const didInitRef = React.useRef(false);
	const map = useMap();
	const { initialBounds } = props;
	React.useEffect(() => {
		if (!didInitRef.current) {
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
