import React from 'react';

interface Props {
	scale: number;
}

const GoogleFont: React.FC<Props> = (props) => (
	<div
		style={{
			position: 'absolute',
			right: 0,
			top: 0,
			transform: `scale(${props.scale})`,
			transformOrigin: 'top right',
			zIndex: 1000,
		}}
	>
		<div
			style={{
				backgroundColor: 'black',
				borderRight: 'solid #c00 0.2em',
				color: 'white',
				fontSize: '70px',
				fontWeight: 400,
				lineHeight: 1.25,
				padding: '4px 24px',
				position: 'relative',
				right: '140px',
				top: '100px',
			}}
		>
			Google Earth
		</div>
	</div>
);

export default GoogleFont;
