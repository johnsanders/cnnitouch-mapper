import { Label } from './types';

const kashmirLabels: Label[] = [
	{
		angle: Math.PI * 1.25,
		iconType: 'none',
		id: 'kashmirPakistan',
		lat: 35.99398472870928,
		lng: 74.89718539410637,
		name: 'Pakistan Controlled Kashmir',
		type: 'point',
	},
	{
		angle: Math.PI * 1.75,
		iconType: 'none',
		id: 'kashmirPakistan',
		lat: 35.22454735404278,
		lng: 79.09015495433925,
		name: 'China Controlled Kashmir',
		type: 'point',
	},
	{
		angle: Math.PI * 0.25,
		iconType: 'none',
		id: 'kashmirPakistan',
		lat: 33.90042512209253,
		lng: 76.85930582554643,
		name: 'India Controlled Kashmir',
		type: 'point',
	},
];
const kashmirNames = ['India', 'Pakistan'];
export const kashmirIsActive = (hiliteNames: string[]) =>
	kashmirNames.some((name) => hiliteNames.includes(name));

const getSpecialLabels = (hiliteNames: string[]) =>
	kashmirIsActive(hiliteNames) ? kashmirLabels : [];

export default getSpecialLabels;
