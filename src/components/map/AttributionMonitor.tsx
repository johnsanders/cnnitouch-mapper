import React from 'react';
import { useMapEvents } from 'react-leaflet';

interface Props {
	setAttribution: (attribution: string) => void;
}

const AttributionMonitor: React.FC<Props> = (props) => {
	const prevAttributionRef = React.useRef('');
	const { setAttribution } = props;
	const handleAttributionChange = React.useCallback(() => {
		const attributionNodes = document.querySelectorAll('.leaflet-control-attribution');
		let attribution = '';
		for (const node of Array.from(attributionNodes)) {
			const spans = node.querySelectorAll('span');
			for (const span of Array.from(spans)) {
				if (span.innerHTML.includes('Imagery')) {
					attribution = span.innerHTML.replace(/Imagery.+?[0-9]{4}(\s|,)+/i, '');
					break;
				}
			}
			if (attribution) break;
		}
		if (attribution !== prevAttributionRef.current) setAttribution(attribution);
		prevAttributionRef.current = attribution;
	}, [setAttribution]);
	useMapEvents({ moveend: handleAttributionChange, zoomend: handleAttributionChange });
	return null;
};

export default AttributionMonitor;
