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
				fontSize: '35px',
				fontWeight: 400,
				lineHeight: 1.25,
				padding: '2px 12px',
				position: 'relative',
				right: '70px',
				top: '50px',
			}}
		>
			Google Earth
		</div>
	</div>
);

export default GoogleFont;
