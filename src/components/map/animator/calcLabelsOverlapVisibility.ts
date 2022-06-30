import { LabelAnimationConfig } from '../types';

const hitTest = (rect1: DOMRect, rect2: DOMRect) =>
	!(
		rect2.left > rect1.right ||
		rect2.right < rect1.left ||
		rect2.top > rect1.bottom ||
		rect2.bottom < rect1.top
	);

const calcLabelsOverlapVisibility = (labels: LabelAnimationConfig[]) => {
	const overlaps = labels.map((label1) =>
		labels.map((label2) => {
			if (label2.id === label1.id) return false;
			return hitTest(
				label1.element.getBoundingClientRect(),
				label2.element.getBoundingClientRect(),
			);
		}),
	);
	const visibles = overlaps.map((overlap, labelIndex) => {
		if (overlap.every((o) => !o)) return true;
		for (let overlapIndex = 0; overlapIndex < overlaps.length; overlapIndex += 1)
			if (overlaps[overlapIndex] && overlapIndex < labelIndex) return false;
		return true;
	});
	return visibles;
};

export default calcLabelsOverlapVisibility;
