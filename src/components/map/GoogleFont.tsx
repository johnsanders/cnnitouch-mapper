import React from 'react';
import { useVideoConfig } from 'remotion';

const GoogleFont: React.FC = () => {
	const { height: compHeight } = useVideoConfig();
	return (
		<div
			style={{
				position: 'absolute',
				right: 0,
				top: 0,
				transform: `scale(${compHeight / 1080})`,
				transformOrigin: 'top right',
				zIndex: 1000,
			}}
		>
			<div
				style={{
					backgroundColor: 'black',
					borderRight: 'solid #c00 0.2em',
					color: 'white',
					fontSize: '40px',
					fontWeight: 500,
					lineHeight: 1.25,
					padding: '2px 8px',
					position: 'relative',
					right: '50px',
					top: '30px',
				}}
			>
				Google Earth
			</div>
		</div>
	);
};

export default GoogleFont;
