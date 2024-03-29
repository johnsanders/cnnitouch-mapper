import { Hilite, Label, LabelWithVisibility } from '../../../types';
import calcLabelOverlaps from '../animator/calcLabelOverlapClashes';
import createLabelAnimConfigs from '../animator/createLabelAnimConfigs';
import getDomId from '../../../misc/getDomId';
import { hiliteLabelThreshold } from '../animator/config';

const handleEditLabelVisibilities = (
	hilites: Hilite[],
	labels: Label[],
	mapSizeInPixels: number,
	mapZoom: number,
): LabelWithVisibility[] => {
	// Create animConfigs and use it to calculate overlaps
	// We need to
	const normalLabelsWithVisibilityInfo: LabelWithVisibility[] = labels.map((label) => ({
		...label,
		visible: label.minZoom <= mapZoom,
	}));
	const labelAnimConfigs = createLabelAnimConfigs(normalLabelsWithVisibilityInfo, hilites);
	// Get normal labels with visibility set according to whether we're above minZoom
	const overlapClashes = calcLabelOverlaps([
		...labelAnimConfigs.hiliteLabelAnimConfigs,
		...labelAnimConfigs.normalLabelAnimConfigs,
	]);
	const hiliteLabelsWithVisibilityInfo = hilites.reduce<LabelWithVisibility[]>((acc, hilite) => {
		if (!hilite.label) return acc;
		if (hilite.label && hilite.label.minZoom > mapZoom)
			return [...acc, { ...hilite.label, visible: false }];
		const hiliteEl = document.querySelector(`.${getDomId('hilite', hilite.id)}`);
		if (!hiliteEl) throw new Error(`No hilite element for ${hilite.id}`);
		const hiliteRect = hiliteEl.getBoundingClientRect();
		const hiliteSizeInPixels = hiliteRect.width * hiliteRect.height;
		const hilitePercentOfScreen = hiliteSizeInPixels / mapSizeInPixels;
		const hiliteIsBigEnoughToLabel = hilitePercentOfScreen > hiliteLabelThreshold;
		return [
			...acc,
			{ ...hilite.label, visible: hiliteIsBigEnoughToLabel && hilite.label.minZoom <= mapZoom },
		];
	}, []);
	// Set visibility based on visibility calculation from above && overlap visibility
	const labelsWithFinalVisibilityInfo: LabelWithVisibility[] = [
		...hiliteLabelsWithVisibilityInfo,
		...normalLabelsWithVisibilityInfo,
	].map((label, i) => ({
		...label,
		visible: label.visible && !overlapClashes[i],
	}));
	return labelsWithFinalVisibilityInfo;
};

export default handleEditLabelVisibilities;
