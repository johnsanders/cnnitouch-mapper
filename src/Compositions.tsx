import { Composition, getInputProps } from 'remotion';
import { LatLngBounds } from 'leaflet';
import Map from './components/map/Map';
import React from 'react';
import { RenderSettings } from './components/map/types';
import { registerRoot } from 'remotion';

const Compositions: React.FC = () => {
	const renderSettings: RenderSettings = getInputProps();
	const boundsEnd = renderSettings.boundsEnd.split(',').map((string) => parseFloat(string));
	const boundsStart = renderSettings.boundsStart.split(',').map((string) => parseFloat(string));
	const settings = {
		...renderSettings,
		boundsEnd: new LatLngBounds([boundsEnd[1], boundsEnd[0]], [boundsEnd[3], boundsEnd[2]]),
		boundsStart: new LatLngBounds(
			[boundsStart[1], boundsStart[0]],
			[boundsStart[3], boundsStart[2]],
		),
	};
	return (
		<>
			<link href="https://ix.cnn.io/static/fonts/fonts.css" rel="stylesheet" />
			<Composition
				component={Map}
				defaultProps={{ compHeight: 2160, settings }}
				durationInFrames={settings.zoomDuration}
				fps={30}
				height={2160}
				id="Mapper"
				width={3840}
			/>
		</>
	);
};

registerRoot(Compositions);
