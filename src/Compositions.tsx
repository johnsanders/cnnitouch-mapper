import { Composition, getInputProps } from 'remotion';
import Map from './components/map/Map';
import React from 'react';
import { registerRoot } from 'remotion';

const Compositions: React.FC = () => {
	const props = getInputProps();
	return (
		<>
			<link href="https://ix.cnn.io/static/fonts/fonts.css" rel="stylesheet" />
			<Composition
				component={Map}
				defaultProps={{ ...props, mode: 'render' }}
				durationInFrames={300}
				fps={30}
				height={1080}
				id="Mapper"
				width={1920}
			/>
		</>
	);
};

registerRoot(Compositions);
