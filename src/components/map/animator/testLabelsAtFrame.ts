import { fadeDuration, hiliteLabelThreshold } from './config';
import { LabelAnimationConfig } from '../../types';
import { Map } from 'leaflet';
import calcLabelOverlapClashes from './calcLabelOverlapClashes';
import getMapSizeInPixels from '../../../misc/getMapSizeInPixels';
import setLabelDomStylesAtFrame from './setLabelDomStylesAtFrame';

const testLabelsAtFrame = (
	labelAnimationConfigs: LabelAnimationConfig[],
	frame: number,
	map: Map,
) => {
	const mapSizeInPixels = getMapSizeInPixels();
	labelAnimationConfigs.forEach((labelAnimConfig) =>
		setLabelDomStylesAtFrame(labelAnimConfig, frame),
	);
	const labelOverlapClashes = calcLabelOverlapClashes(labelAnimationConfigs);
	labelAnimationConfigs.forEach((labelAnimConfig, i) => {
		if (
			labelAnimConfig.startFrame !== null ||
			labelOverlapClashes[i] ||
			map.getZoom() < labelAnimConfig.label.minZoom
		)
			return;
		setLabelDomStylesAtFrame(labelAnimConfig, frame);
		if (!labelAnimConfig.isHiliteLabel)
			labelAnimConfig.startFrame = Math.max(frame - fadeDuration, 0);
		else {
			if (!labelAnimConfig.hiliteEl)
				throw new Error(`Hilite label ${labelAnimConfig.label.id} is missing hilite element`);
			const hiliteBounds = labelAnimConfig.hiliteEl.getBoundingClientRect();
			const hiliteSizeInPixels = hiliteBounds.height * hiliteBounds.width;
			const hilitePercentOfScreen = hiliteSizeInPixels / mapSizeInPixels;
			const hiliteIsBigEnoughToLabel = hilitePercentOfScreen > hiliteLabelThreshold;
			if (hiliteIsBigEnoughToLabel) labelAnimConfig.startFrame = Math.max(frame - fadeDuration, 0);
		}
	});
};

export default testLabelsAtFrame;
