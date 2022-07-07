import React from 'react';

interface Props {
	scale: number;
	text: string;
}

const Attribution: React.FC<Props> = (props: Props) => (
	<div
		style={{
			backgroundColor: 'black',
			bottom: 0,
			color: 'white',
			fontSize: '40px',
			left: 0,
			lineHeight: 1.35,
			opacity: 0.5,
			padding: '0 15px',
			position: 'absolute',
			transform: `scale(${props.scale})`,
			transformOrigin: 'bottom left',
			zIndex: 1000,
		}}
	>
		{props.text}
	</div>
);

export default Attribution;
