import React from 'react';

interface Props {
	text: string;
}

const Attribution: React.FC<Props> = (props: Props) => (
	<div
		style={{
			backgroundColor: 'black',
			bottom: 0,
			color: 'white',
			fontSize: '7.3px',
			left: 0,
			lineHeight: 1.35,
			opacity: 0.5,
			padding: '0 3px',
			position: 'absolute',
			zIndex: 1000,
		}}
	>
		{props.text}
	</div>
);

export default Attribution;
