import { Hilite, Label, LabelAnimationConfig, LabelWithVisibility } from '../../../types';
import getDomId from '../../../misc/getDomId';

const isLabelWithVisibility = (label: Label | LabelWithVisibility): label is LabelWithVisibility =>
	label.hasOwnProperty('visible');

const createLabelAnimConfigs = (labels: (Label | LabelWithVisibility)[], hilites: Hilite[]) => {
	const normalLabelAnimConfigs: LabelAnimationConfig[] = labels.map((label) => {
		const visible = isLabelWithVisibility(label) ? label.visible : undefined;
		return {
			getElement: () => {
				const element = document.getElementById(getDomId('label', label.id));
				if (!(element?.nodeName === 'g')) throw new Error(`Cannot get label element ${label.id}`);
				return element;
			},
			isHiliteLabel: false,
			label,
			startFrame: null,
			visible,
		};
	});
	const hiliteLabelAnimConfigs = hilites.reduce<LabelAnimationConfig[]>((acc, hilite) => {
		if (!hilite.label) return acc;
		const visible = isLabelWithVisibility(hilite.label) ? hilite.label.visible : undefined;
		const labelElement = document.getElementById(getDomId('label', hilite.label.id));
		const hiliteElement = document.querySelector(
			'.' + getDomId('hilite', hilite.id),
		) as HTMLElement;
		if (!labelElement || !hiliteElement)
			throw new Error(`Cannot get hilite/label element for ${hilite.label.name}`);
		return [
			...acc,
			{
				getElement: () => {
					if (!hilite.label) throw new Error('Calling getElement on a label that should not exist');
					const element = document.getElementById(getDomId('label', hilite.label.id));
					if (!(element?.nodeName === 'g'))
						throw new Error(`Cannot get label element ${hilite.label.id}`);
					return element;
				},
				hiliteEl: hiliteElement,
				isHiliteLabel: true,
				label: hilite.label,
				startFrame: null,
				visible,
			},
		];
	}, []);
	return { hiliteLabelAnimConfigs, normalLabelAnimConfigs };
};

export default createLabelAnimConfigs;
