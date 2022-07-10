import { LabelAnimationConfig } from '../../types';

const hitTest = (rect1: DOMRect, rect2: DOMRect) =>
	!(
		rect2.left > rect1.right ||
		rect2.right < rect1.left ||
		rect2.top > rect1.bottom ||
		rect2.bottom < rect1.top
	);

const calcLabelsOverlapVisibility = (labels: LabelAnimationConfig[]): boolean[] => {
	const overlaps = labels.map((thisLabel) =>
		labels.map((thatLabel) => {
			// If we're comparing the label to itself, there's no overlap
			if (thatLabel.id === thisLabel.id) return false;
			// If the other label is a hiliteLabel, we treat is as visible even if it's not
			// Otherwise, if one of the labels is not visible, there's no overlap
			console.log(thisLabel, thatLabel);
			if (!thatLabel.isHiliteLabel && (thisLabel.visible === false || thatLabel.visible === false))
				return false;
			console.log('fjdskl');
			return hitTest(
				thisLabel.getElement().getBoundingClientRect(),
				thatLabel.getElement().getBoundingClientRect(),
			);
		}),
	);
	console.log(overlaps);
	const visibilities = overlaps.map((overlap, labelIndex) => {
		if (overlap.every((o) => !o)) return true;
		for (let overlapIndex = 0; overlapIndex < overlaps.length; overlapIndex += 1)
			if (overlaps[overlapIndex] && overlapIndex < labelIndex) return false;
		return true;
	});
	console.log();
	return visibilities;
};

export default calcLabelsOverlapVisibility;
