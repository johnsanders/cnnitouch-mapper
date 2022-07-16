import { LabelAnimationConfig } from '../../types';

const hitTest = (rect1: DOMRect, rect2: DOMRect) =>
	!(
		rect2.left > rect1.right ||
		rect2.right < rect1.left ||
		rect2.top > rect1.bottom ||
		rect2.bottom < rect1.top
	);

const calcLabelOverlapClashes = (labelAnimConfigs: LabelAnimationConfig[]): boolean[] => {
	const overlaps = labelAnimConfigs.map((thisAnimConfig, thisIndex) =>
		labelAnimConfigs.map((thatAnimConfig, thatIndex) => {
			// If we're comparing the label to itself, there's no overlap
			if (thatAnimConfig.label.id === thisAnimConfig.label.id) return false;
			// If we're at a lower index than the other label, we get priority
			if (thisIndex < thatIndex) return false;
			// If the other label is a hiliteLabel, we treat is as visible even if it's not
			// Otherwise, if one of the labels is not visible, there's no overlap
			if (
				!thatAnimConfig.isHiliteLabel &&
				(thisAnimConfig.visible === false || thatAnimConfig.visible === false)
			)
				return false;
			return hitTest(
				thisAnimConfig.getElement().getBoundingClientRect(),
				thatAnimConfig.getElement().getBoundingClientRect(),
			);
		}),
	);
	const clashes = overlaps.map((overlap, labelIndex) => {
		if (overlap.every((o) => !o)) return false;
		for (let overlapIndex = 0; overlapIndex < overlaps.length; overlapIndex += 1)
			if (overlaps[overlapIndex] && overlapIndex < labelIndex) return true;
		return false;
	});
	return clashes;
};

export default calcLabelOverlapClashes;
