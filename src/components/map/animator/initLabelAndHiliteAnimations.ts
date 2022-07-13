import { Hilite, HiliteAnimationConfig, Label, LabelAnimationConfig } from '../../types';
import { LatLngBounds, Map } from 'leaflet';
import { easing, fadeDuration } from './config';
import calculateMapBoundsAtFrame from './calculateMapBoundsAtFrame';
import createHiliteAnimConfigs from './createHiliteAnimConfigs';
import createLabelAnimConfigs from './createLabelAnimConfigs';
import getDomId from '../../../misc/getDomId';
import setLabelDomStylesAtFrame from './setLabelDomStylesAtFrame';
import testHilitesAtFrame from './testHilitesAtFrame';
import testLabelsAtFrame from './testLabelsAtFrame';
import waitFor from '../../../misc/waitFor';

interface Ret {
	labelAnimationConfigs: LabelAnimationConfig[];
	hiliteAnimationConfigs: HiliteAnimationConfig[];
}

const initLabelAndHiliteAnimations = (
	map: Map,
	labels: Label[],
	hilites: Hilite[],
	startBounds: LatLngBounds,
	endBounds: LatLngBounds,
	hiliteBounds: LatLngBounds[],
	zoomDuration: number,
) =>
	new Promise<Ret>((resolve) => {
		const run = async () => {
			const finalFrameToStartFade = zoomDuration - fadeDuration;
			const hiliteAnimationConfigs = createHiliteAnimConfigs(hilites, zoomDuration);
			const { hiliteLabelAnimConfigs, normalLabelAnimConfigs } = createLabelAnimConfigs(
				labels,
				hilites,
			);
			for (let testFrame = 0; testFrame <= finalFrameToStartFade; testFrame += 10) {
				// Calculate map bounds for this test frame and set them
				const mapBoundsAtFrame = calculateMapBoundsAtFrame(
					testFrame,
					zoomDuration,
					startBounds,
					endBounds,
					easing,
				);
				map.fitBounds(mapBoundsAtFrame);
				await waitFor(500);
				// Concat all our label configs and test to see if we can start fading them in at this frame
				const labelAnimationConfigs = [...hiliteLabelAnimConfigs, ...normalLabelAnimConfigs];
				testLabelsAtFrame(labelAnimationConfigs, testFrame, map);
				// Test our hilites for the same thing
				testHilitesAtFrame(
					testFrame,
					hiliteAnimationConfigs,
					hiliteBounds,
					new LatLngBounds(mapBoundsAtFrame),
				);
				// If we have found start frames for all hilites and labels, we're done
				if (
					labelAnimationConfigs.every((labelAnimInfo) => labelAnimInfo.startFrame !== null) &&
					hiliteAnimationConfigs.every((hiliteAnimInfo) => hiliteAnimInfo.endFrame < zoomDuration)
				)
					break;
			}
			await waitFor(100);
			map.fitBounds(startBounds);
			await waitFor(100);
			const labelAnimationConfigs = [...hiliteLabelAnimConfigs, ...normalLabelAnimConfigs];
			labelAnimationConfigs.forEach((labelAnimConfig) => {
				// If we never found a fade start frame, set it to the final possible frame
				if (labelAnimConfig.startFrame === null) labelAnimConfig.startFrame = finalFrameToStartFade;
				// Reset DOM styles for frame zero so we're ready to start the render
				setLabelDomStylesAtFrame(labelAnimConfig, 0);
			});
			await waitFor(100);
			resolve({ hiliteAnimationConfigs, labelAnimationConfigs });
		};
		const checkLabelsAreReady = () => {
			if (
				labels.every((label) => document.getElementById(getDomId('label', label.id)) !== null) &&
				hilites.every(
					(hilite) => document.querySelector(`.${getDomId('hilite', hilite.id)}`) !== null,
				)
			)
				run();
			else setTimeout(checkLabelsAreReady, 1000);
		};
		checkLabelsAreReady();
	});

export default initLabelAndHiliteAnimations;
