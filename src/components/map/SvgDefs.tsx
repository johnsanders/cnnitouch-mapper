import * as patterns from './svgPatterns';
import React from 'react';
import SvgPattern from './SvgPattern';
import { kashmirIsActive } from './labels/getSpecialLabels';
import { useMap } from 'react-leaflet';

const green = '#98ad55';
const gray = '#505050';
const orange = '#ffaf38';

interface Props {
	hiliteNames: string[];
}

const SvgDefs: React.FC<Props> = (props) => {
	const mapZoom = useMap().getZoom();
	const kashmirActive = kashmirIsActive(props.hiliteNames);
	return (
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
				{patterns.kashmir.map((pattern) => {
					const stroke = !kashmirActive
						? green
						: props.hiliteNames.includes(pattern.country)
						? gray
						: orange;
					return (
						<SvgPattern
							key={pattern.name}
							name={pattern.name}
							rotation={pattern.rotation}
							scale={mapZoom * pattern.zoomScale}
							stroke={stroke}
						/>
					);
				})}
				{patterns.israel.map((pattern) => {
					const stroke = !props.hiliteNames.includes('Israel') ? green : gray;
					return (
						<SvgPattern
							key={pattern.name}
							name={pattern.name}
							rotation={pattern.rotation}
							scale={mapZoom * pattern.zoomScale}
							stroke={stroke}
						/>
					);
				})}
			</defs>
		</svg>
	);
};

export default SvgDefs;
