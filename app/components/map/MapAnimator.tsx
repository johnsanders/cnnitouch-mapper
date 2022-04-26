import { Easing, continueRender, delayRender, interpolate, useCurrentFrame } from 'remotion';
import { LatLng, LatLngBoundsExpression } from 'leaflet';
import React from 'react';
import { useMap } from 'react-leaflet';

const zoomDuration = 5 * 30;

interface AnimationKeyframe {
	center: LatLng;
	zoom: number;
}

interface Props {
	endBounds?: LatLngBoundsExpression;
	startBounds?: LatLngBoundsExpression;
}

const MapAnimator: React.FC<Props> = (props: Props) => {
	if (!props.endBounds || !props.startBounds)
		throw new Error('Animator was included, but start/end bounds are not defined');
	const startRef = React.useRef<AnimationKeyframe>();
	const endRef = React.useRef<AnimationKeyframe>();
	const map = useMap();
	const frame = useCurrentFrame();
	const { endBounds, startBounds } = props;
	React.useEffect(() => {
		map.fitBounds(endBounds);
		endRef.current = {
			center: map.getCenter(),
			zoom: map.getZoom(),
		};
		map.fitBounds(startBounds);
		startRef.current = {
			center: map.getCenter(),
			zoom: map.getZoom(),
		};
	}, [endBounds, map, startBounds]);
	React.useEffect(() => {
		if (!startRef.current || !endRef.current) throw new Error('Animation refs are undefined');
		const delayId = delayRender();
		const centerLat = interpolate(
			frame,
			[0, zoomDuration],
			[startRef.current.center.lat, endRef.current.center.lat],
			{ extrapolateRight: 'clamp' },
		);
		const centerLng = interpolate(
			frame,
			[0, zoomDuration],
			[startRef.current.center.lng, endRef.current.center.lng],
			{ extrapolateRight: 'clamp' },
		);
		const zoom = interpolate(
			frame,
			[0, zoomDuration],
			[startRef.current.zoom, endRef.current.zoom],
			{ easing: Easing.out(Easing.exp), extrapolateRight: 'clamp' },
		);
		map.setZoom(zoom).panTo([centerLat, centerLng]);
		//// wait for zoom / pan to complete
		continueRender(delayId);
	}, [frame, map]);
	return null;
};

export default MapAnimator;
