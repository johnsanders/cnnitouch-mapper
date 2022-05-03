import React from 'react';

const SvgDefs: React.FC = () => (
	<svg height="0" id="filtersDefs" version="1.1" width="0" xmlns="w3.org/2000/svg">
		<defs>
			<filter height="130%" id="dropshadow">
				<feGaussianBlur in="SourceAlpha" result="blur" stdDeviation="5" />
				<feComposite in="blur" in2="SourceAlpha" operator="out" result="shadowMasked" />
				<feComponentTransfer in="SourceGraphic" result="fill">
					<feFuncA slope="0.5" type="linear" />
				</feComponentTransfer>
				<feComposite in="shadowMasked" in2="fill" operator="over" />
			</filter>
			<pattern
				height="4"
				id="diagonalHatch"
				patternTransform="scale(3)"
				patternUnits="userSpaceOnUse"
				width="4"
			>
				<path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style={{ stroke: 'red', strokeWidth: 1 }} />
			</pattern>
		</defs>
	</svg>
);

export default SvgDefs;
