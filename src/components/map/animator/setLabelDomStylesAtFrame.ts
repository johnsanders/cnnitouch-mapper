import { LabelAnimationConfig } from '../../types';
import { Map } from 'leaflet';
import { fadeDuration } from './config';
import { interpolate } from 'remotion';

const calcInterpolatedOpacity = (frame: number, fadeStartFrame: number) =>
	fadeStartFrame === 0
		? 1
		: interpolate(frame, [fadeStartFrame, fadeStartFrame + fadeDuration], [0, 1], {
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
		  });

const setLabelDomStylesAtFrame = (
	labelAnimConfig: LabelAnimationConfig,
	frame: number,
	map: Map,
) => {
	if (labelAnimConfig.startFrame === null)
		console.log(`Label ${labelAnimConfig.id} has no start frame.`);
	const labelPosition = map.latLngToContainerPoint([labelAnimConfig.lat, labelAnimConfig.lng]);
	labelAnimConfig.element.style.transform = `translate3d(${labelPosition.x}px, ${labelPosition.y}px, 0)`;
	labelAnimConfig.element.style.opacity = calcInterpolatedOpacity(
		frame,
		labelAnimConfig.startFrame || 0,
	).toFixed(3);
};

export default setLabelDomStylesAtFrame;
