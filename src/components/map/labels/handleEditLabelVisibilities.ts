import { Hilite, Label, LabelWithVisibility } from '../../types';
import calcLabelsOverlapVisibility from '../animator/calcLabelsOverlapVisibility';
import createLabelAnimConfigs from '../animator/createLabelAnimConfigs';
import getDomId from '../../../misc/getDomId';
import { hiliteLabelThreshold } from '../animator/config';

const handleEditLabelVisibilities = (
	hilites: Hilite[],
	labels: Label[],
	mapSizeInPixels: number,
	mapZoom: number,
): LabelWithVisibility[] => {
	// Get hilite labels with visibility set if their hilite is big enough to label and we're above minZoom
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
	// Get normal labels with visibility set if we're above minZoom
	const normalLabelsWithAboveMinZoomVisibilityInfo: LabelWithVisibility[] = labels.map((label) => ({
		...label,
		visible: label.minZoom <= mapZoom,
	}));
	// Concat all our labels and calculate overlaps
	const allLabelsWithVisibilityInfo = [
		...hiliteLabelsWithVisibilityInfo,
		...normalLabelsWithAboveMinZoomVisibilityInfo,
	];
	const visibility = calcLabelsOverlapVisibility(
		createLabelAnimConfigs(allLabelsWithVisibilityInfo, []).normalLabelAnimConfigs,
	);
	// Set visibility based on visibility calculation from above && overlap visibility
	const labelsWithFinalVisibilityInfo: LabelWithVisibility[] = allLabelsWithVisibilityInfo.map(
		(label, i) => ({
			...label,
			visible: label.visible && visibility[i],
		}),
	);
	return labelsWithFinalVisibilityInfo;
};

export default handleEditLabelVisibilities;
