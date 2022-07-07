import { LabelAnimationConfig } from '../../types';
import calcInterpolatedOpacity from './calcInterpolatedOpacity';

const setLabelDomStylesAtFrame = (labelAnimConfig: LabelAnimationConfig, frame: number) => {
	if (labelAnimConfig.startFrame === null)
		console.log(`Label ${labelAnimConfig.id} has no start frame.`);
	labelAnimConfig.getElement().style.opacity = calcInterpolatedOpacity(
		frame,
		labelAnimConfig.startFrame || 0,
		true,
	).toFixed(3);
};

export default setLabelDomStylesAtFrame;
