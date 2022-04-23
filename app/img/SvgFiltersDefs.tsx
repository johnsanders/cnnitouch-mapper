import React from 'react';

const SvgFiltersDefs: React.FC = () => (
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
		</defs>
	</svg>
);

export default SvgFiltersDefs;
