import React from 'react';
import { kashmirIsActive } from './labels/getSpecialLabels';
import { useMap } from 'react-leaflet';

const green = '#98ad55';
const gray = '#505050';
const orange = '#ffaf38';

const israelPatterns = [
	{
		country: '',
		name: 'Golan-Heights',
		rotation: 0,
	},
];
const kashmirPatterns = [
	{
		country: 'Pakistan',
		name: 'Pakistan-Controlled',
		rotation: 0,
	},
	{
		country: 'India',
		name: 'India-Controlled',
		rotation: 90,
	},
	{
		country: 'China',
		name: 'China-Controlled',
		rotation: 45,
	},
];

interface Props {
	hiliteNames: string[];
}

const SvgDefs: React.FC<Props> = (props) => {
	const zoom = useMap().getZoom();
	const kashmirActive = kashmirIsActive(props.hiliteNames);
	const hatchScales = {
		'China-Controlled': (zoom || 1) * 0.5,
		'Golan-Heights': (zoom || 1) * 0.3,
		'India-Controlled': (zoom || 1) * 0.5,
		'Pakistan-Controlled': (zoom || 1) * 0.5,
	};
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
				{kashmirPatterns.map((pattern) => {
					const stroke = !kashmirActive
						? green
						: props.hiliteNames.includes(pattern.country)
						? gray
						: orange;
					return (
						<pattern
							height={4}
							id={`hatch-${pattern.name}`}
							key={pattern.name}
							patternTransform={`scale(${hatchScales[pattern.name]}) rotate(${pattern.rotation})`}
							patternUnits="userSpaceOnUse"
							width={4}
						>
							<path
								d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2"
								style={{ opacity: 0.9, stroke, strokeWidth: 0.75 }}
							/>
						</pattern>
					);
				})}
				{israelPatterns.map((pattern) => {
					const stroke = !props.hiliteNames.includes('Israel') ? green : gray;
					console.log(stroke);
					return (
						<pattern
							height={4}
							id={`hatch-${pattern.name}`}
							key={pattern.name}
							patternTransform={`scale(${hatchScales[pattern.name]}) rotate(${pattern.rotation})`}
							patternUnits="userSpaceOnUse"
							width={4}
						>
							<path
								d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2"
								style={{ opacity: 0.9, stroke, strokeWidth: 0.75 }}
							/>
						</pattern>
					);
				})}
			</defs>
		</svg>
	);
};

export default SvgDefs;
