import React from 'react';

interface Props {
	name: string;
	scale: number;
	stroke: string;
	rotation: number;
}

const SvgPattern: React.FC<Props> = (props: Props) => (
	<pattern
		height={4}
		id={`hatch-${props.name}`}
		key={props.name}
		patternTransform={`scale(${props.scale}) rotate(${props.rotation})`}
		patternUnits="userSpaceOnUse"
		width={4}
	>
		<path
			d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2"
			style={{ opacity: 0.9, stroke: props.stroke, strokeWidth: 0.75 }}
		/>
	</pattern>
);

export default SvgPattern;
