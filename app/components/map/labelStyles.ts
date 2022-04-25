export interface PathStyle {
	fill: string;
	stroke: string;
	strokeWidth: string;
}
export interface TextStyle {
	fill: string;
	fontFamily: string;
	upperCase: boolean;
}
export interface LabelElementStyle {
	path: PathStyle;
	text: TextStyle;
}
export interface LabelStyles {
	[labelType: string]: LabelElementStyle;
}
const labelStyles: LabelStyles = {
	capital: {
		path: {
			fill: 'black',
			stroke: 'white',
			strokeWidth: '2',
		},
		text: {
			fill: 'white',
			fontFamily: 'CNN',
			upperCase: false,
		},
	},
	city: {
		path: {
			fill: 'black',
			stroke: 'white',
			strokeWidth: '2',
		},
		text: {
			fill: 'white',
			fontFamily: 'CNN',
			upperCase: false,
		},
	},
	country: {
		path: {
			fill: 'white',
			stroke: 'white',
			strokeWidth: '0',
		},
		text: {
			fill: 'black',
			fontFamily: 'CNN',
			upperCase: true,
		},
	},
};

export default labelStyles;
