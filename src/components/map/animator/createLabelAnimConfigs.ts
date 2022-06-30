import { Hilite, Label, LabelAnimationConfig } from '../types';
import getDomId from '../../../misc/getDomId';

const createLabelAnimConfigs = (labels: Label[], hilites: Hilite[]) => {
	const normalLabelAnimConfigs: LabelAnimationConfig[] = labels.map((label) => {
		const element = document.getElementById(getDomId('label', label.id));
		if (!(element?.nodeName === 'g')) throw new Error(`Cannot get label element ${label.id}`);
		return {
			element,
			id: label.id,
			isHiliteLabel: false,
			lat: label.lat,
			lng: label.lng,
			minZoom: label.minZoom,
			startFrame: null,
		};
	});
	const hiliteLabelAnimConfigs = hilites.reduce<LabelAnimationConfig[]>((acc, hilite) => {
		if (!hilite.label) return acc;
		const labelElement = document.getElementById(getDomId('label', hilite.label.id));
		const hiliteElement = document.querySelector(
			'.' + getDomId('hilite', hilite.id),
		) as HTMLElement;
		if (!labelElement || !hiliteElement)
			throw new Error(`Cannot get hilite/label element for ${hilite.label.name}`);
		return [
			...acc,
			{
				element: labelElement,
				hiliteEl: hiliteElement,
				id: hilite.label.id,
				isHiliteLabel: true,
				lat: hilite.label.lat,
				lng: hilite.label.lng,
				minZoom: hilite.label.minZoom,
				startFrame: null,
			},
		];
	}, []);
	return { hiliteLabelAnimConfigs, normalLabelAnimConfigs };
};

export default createLabelAnimConfigs;
