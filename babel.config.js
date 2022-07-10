module.exports = {
	plugins: [],
	presets: [
		'@babel/preset-react',
		'@babel/preset-typescript',
		[
			'@babel/preset-env',
			{
				exclude: ['transform-classes', 'transform-regenerator'],
				forceAllTransforms: true,
				loose: true,
				modules: false,
				targets: {
					browsers: ['last 2 chrome versions', 'last 2 firefox versions'],
					node: 'current',
				},
			},
		],
	],
};
