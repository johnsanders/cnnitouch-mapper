import React from 'react';

interface Props {
	hiliteNames: string[];
	labelNames: string[];
}

const israelNames = ['Israel', 'Jerusalem'];
const kashmirNames = ['India', 'Pakistan'];

const SpecialCasesInfo: React.FC<Props> = (props: Props) => (
	<>
		{!props.hiliteNames.some((hiliteName) => kashmirNames.includes(hiliteName)) ? null : (
			<span>Kashmir</span>
		)}
		{!props.hiliteNames.some((hiliteName) => israelNames.includes(hiliteName)) ? null : (
			<span>Israel</span>
		)}
	</>
);

export default SpecialCasesInfo;
