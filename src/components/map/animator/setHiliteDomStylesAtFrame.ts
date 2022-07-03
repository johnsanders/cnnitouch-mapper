import { HiliteAnimationConfig } from '../../types';
import { fadeDuration } from './config';
import { interpolate } from 'remotion';

const setHiliteDomStylesAtFrame = (hiliteAnimConfig: HiliteAnimationConfig, frame: number) => {
	const calcInterpolatedOpacity = (frame: number, fadeStartFrame: number) =>
		interpolate(frame, [fadeStartFrame, fadeStartFrame + fadeDuration], [1, 0], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});
	hiliteAnimConfig.element.style.opacity = calcInterpolatedOpacity(
		frame,
		hiliteAnimConfig.endFrame || 100000,
	).toFixed(2);
};

export default setHiliteDomStylesAtFrame;
