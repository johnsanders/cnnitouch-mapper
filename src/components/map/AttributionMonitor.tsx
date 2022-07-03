import React from 'react';

interface Props {
	setAttribution: (attribution: string) => void;
}

const AttributionMonitor: React.FC<Props> = (props) => {
	const attributionNodes = document.querySelectorAll('.leaflet-control-attribution');
	let attribution = '';
	for (const node of Array.from(attributionNodes)) {
		const spans = node.querySelectorAll('span');
		for (const span of Array.from(spans)) {
			if (span.innerHTML.includes('Imagery')) {
				attribution = span.innerHTML.replace(/Imagery .+?[0-9]{4}\s+/i, '');
				break;
			}
		}
		if (attribution) break;
	}
	props.setAttribution(attribution);
	return null;
};

export default AttributionMonitor;
