import { Hilite, HiliteAnimationConfig, Label, LabelAnimationConfig } from '../../../types';
import { continueRender, delayRender, useCurrentFrame } from 'remotion';
import { LatLngBounds } from 'leaflet';
import React from 'react';
import calculateMapBoundsAtFrame from './calculateMapBoundsAtFrame';
import checkTiles from './checkTiles/checkTiles';
import { easing } from './config';
import hiliteBoundsAll from '../../../misc/hiliteBounds';
import initLabelAndHiliteAnimations from './initLabelAndHiliteAnimations';
import setHiliteDomStylesAtFrame from './setHiliteDomStylesAtFrame';
import setLabelDomStylesAtFrame from './setLabelDomStylesAtFrame';
import { useMap } from 'react-leaflet';
import waitFor from '../../../misc/waitFor';

interface Props {
	boundsEnd: LatLngBounds;
	boundsStart: LatLngBounds;
	hilites: Hilite[];
	labels: Label[];
	zoomDuration: number;
}

const MapAnimator: React.FC<Props> = (props: Props) => {
	const labelAnimationConfigsRef = React.useRef<LabelAnimationConfig[]>();
	const hiliteAnimationConfigsRef = React.useRef<HiliteAnimationConfig[]>();
	const framesRenderedRef = React.useRef<number[]>([]);
	const prevZoomRef = React.useRef(0);
	const { boundsEnd: endBounds, hilites, labels, boundsStart: startBounds, zoomDuration } = props;
	const map = useMap();
	const frame = useCurrentFrame();
	const hiliteBounds = props.hilites.map((hilite) => {
		if (!hiliteBoundsAll[hilite.name])
			throw new Error(`Cannot get hilite bounds for ${hilite.name}`);
		return new LatLngBounds(hiliteBoundsAll[hilite.name]);
	});
	if (!startBounds || !endBounds) return null;
	const handleFrame = async () => {
		if (framesRenderedRef.current.includes(frame)) return;
		framesRenderedRef.current.push(frame);
		const delayId = delayRender();
		if (!labelAnimationConfigsRef.current || !hiliteAnimationConfigsRef.current) {
			const { hiliteAnimationConfigs, labelAnimationConfigs } = await initLabelAndHiliteAnimations(
				map,
				labels,
				hilites,
				startBounds,
				endBounds,
				hiliteBounds,
				zoomDuration,
			);
			hiliteAnimationConfigsRef.current = hiliteAnimationConfigs;
			labelAnimationConfigsRef.current = labelAnimationConfigs;
		}
		if (!labelAnimationConfigsRef.current) throw new Error('labelAnimaConfigs is not defined');
		if (!hiliteAnimationConfigsRef.current) throw new Error('hiliteAnimConfigs is not defined');
		const currentZoom = map.getZoom();
		const newBounds = calculateMapBoundsAtFrame(
			frame,
			zoomDuration,
			startBounds,
			endBounds,
			easing,
		);
		map.fitBounds(newBounds);
		await waitFor(500);
		for (const labelAnimConfig of labelAnimationConfigsRef.current)
			setLabelDomStylesAtFrame(labelAnimConfig, frame);
		for (const hiliteAnimConfig of hiliteAnimationConfigsRef.current)
			setHiliteDomStylesAtFrame(hiliteAnimConfig, frame);
		const delayInMs = Math.floor(currentZoom) === Math.floor(prevZoomRef.current) ? 250 : 2000;
		prevZoomRef.current = currentZoom;
		await waitFor(delayInMs);
		await checkTiles(map, newBounds).catch(() => console.log('All tile load strategies failed.'));
		continueRender(delayId);
	};
	handleFrame();
	return null;
};

export default MapAnimator;
