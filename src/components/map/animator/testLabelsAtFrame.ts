import { fadeDuration, hiliteLabelThreshold } from './config';
import { LabelAnimationConfig } from '../types';
import { Map } from 'leaflet';
import calcLabelsOverlapVisibility from './calcLabelsOverlapVisibility';
import setLabelDomStylesAtFrame from './setLabelDomStylesAtFrame';

const testLabelsAtFrame = (
	labelAnimationConfigs: LabelAnimationConfig[],
	frame: number,
	map: Map,
) => {
	const mapRect = document.getElementById('mapContainer')?.getBoundingClientRect();
	if (!mapRect) throw new Error('Cannot get map container element');
	const mapPixels = mapRect.height * mapRect.width;
	labelAnimationConfigs.forEach((labelAnimConfig) =>
		setLabelDomStylesAtFrame(labelAnimConfig, frame, map),
	);
	const labelsDisplayableInFrame = calcLabelsOverlapVisibility(labelAnimationConfigs);
	labelAnimationConfigs.forEach((labelAnimConfig, i) => {
		if (
			labelAnimConfig.startFrame !== null ||
			!labelsDisplayableInFrame[i] ||
			map.getZoom() < labelAnimConfig.minZoom
		)
			setLabelDomStylesAtFrame(labelAnimConfig, frame, map);
		if (!labelAnimConfig.isHiliteLabel)
			labelAnimConfig.startFrame = Math.max(frame - fadeDuration, 0);
		else {
			if (!labelAnimConfig.hiliteEl)
				throw new Error(`Hilite label ${labelAnimConfig.id} is missing hilite element`);
			const hiliteBounds = labelAnimConfig.hiliteEl.getBoundingClientRect();
			const hilitePixels = hiliteBounds.height * hiliteBounds.width;
			const hilitePercentOfScreen = hilitePixels / mapPixels;
			const hiliteIsBigEnoughToLabel = hilitePercentOfScreen > hiliteLabelThreshold;
			if (hiliteIsBigEnoughToLabel) labelAnimConfig.startFrame = Math.max(frame - fadeDuration, 0);
		}
	});
};

export default testLabelsAtFrame;
