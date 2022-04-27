import { Composition, getInputProps } from 'remotion';
import MapRenderContainer from './components/map/MapRenderContainer';
import React from 'react';

const Compositions: React.FC = () => {
	const props = getInputProps();
	return (
		<>
			<link href="https://ix.cnn.io/static/fonts/fonts.css" rel="stylesheet" />
			<Composition
				component={MapRenderContainer}
				defaultProps={props}
				durationInFrames={300}
				fps={30}
				height={1080}
				id="Mapper"
				width={1920}
			/>
		</>
	);
};

export default Compositions;
