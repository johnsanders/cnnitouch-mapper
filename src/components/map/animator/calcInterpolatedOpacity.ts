import { fadeDuration } from './config';
import { interpolate } from 'remotion';

const calcInterpolatedOpacity = (frame: number, fadeStartFrame: number, fadeIn: boolean) =>
	fadeStartFrame === 0
		? 1
		: interpolate(
				frame,
				[fadeStartFrame, fadeStartFrame + fadeDuration],
				fadeIn ? [0, 1] : [1, 0],
				{
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				},
		  );

export default calcInterpolatedOpacity;
