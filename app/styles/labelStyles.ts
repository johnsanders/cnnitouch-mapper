interface PathStyle {
	fill: string;
	stroke: string;
	strokeWidth: string;
}
interface TextStyle {
	fill: string;
	fontFamily: string;
	upperCase: boolean;
}
interface LabelElementStyle {
	path: PathStyle;
	text: TextStyle;
}
interface LabelStyles {
	[labelType: string]: LabelElementStyle;
}
const labelStyles: LabelStyles = {
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
};

export default labelStyles;
