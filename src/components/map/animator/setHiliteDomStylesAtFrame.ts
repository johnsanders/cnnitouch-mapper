import { HiliteAnimationConfig } from '../../types';
import calcInterpolatedOpacity from './calcInterpolatedOpacity';

const setHiliteDomStylesAtFrame = (hiliteAnimConfig: HiliteAnimationConfig, frame: number) => {
	hiliteAnimConfig.element.style.opacity = calcInterpolatedOpacity(
		frame,
		hiliteAnimConfig.endFrame || 100000,
		false,
	).toFixed(2);
};

export default setHiliteDomStylesAtFrame;
