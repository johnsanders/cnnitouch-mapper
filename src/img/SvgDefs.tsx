import { faRotate } from '@fortawesome/pro-solid-svg-icons';
import React from 'react';

const hatchPatternD = 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2';
const hatchPatternBase = {
	height: '4',
	patternTransform: 'scale(3)',
	patternUnits: 'userSpaceOnUse',
	width: '4',
};
const hatchPatternsData = [
	{
		key: 'Pakistan-Controlled',
		stroke: 'green',
	},
	{
		key: 'India-Controlled',
		stroke: 'red',
	},
	{
		key: 'China-Controlled',
		stroke: 'purple',
	},
];
const hatchPatterns = hatchPatternsData.map((patternData) => (
	<pattern {...hatchPatternBase} id={`hatch-${patternData.key}`} key={patternData.key}>
		<path d={hatchPatternD} style={{ stroke: patternData.stroke, strokeWidth: 1 }} />
	</pattern>
));

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
			{hatchPatterns}
		</defs>
	</svg>
);

export default SvgDefs;
