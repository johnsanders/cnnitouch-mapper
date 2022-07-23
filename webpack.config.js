/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable sort-keys */
const path = require('path');
const glob = require('glob');
const os = require('os');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const outputDir = path.resolve('./dist');
const isDevServer = process.argv.includes('serve');

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
	base: isDevServer ? '/' : '/apps/mapper/',
	destination: outputDir,
	favicon: './src/img/favicon.ico',
	filename: 'index.html',
	inject: 'body',
	template: './src/index.html',
});
const purgecssPluginConfig = new PurgecssPlugin({
	keyframes: true,
	paths: glob.sync(path.resolve('./src/**/*'), { nodir: true }),
	safelist: [/leaflet/, /map/i, /^nav/, /^dropdown/],
});
const miniCssExtractPlugin = new MiniCssExtractPlugin({ filename: '[name].css' });
const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
	analyzerMode: isDevServer || os.hostname().includes('cnnitouch') ? 'disabled' : 'server',
});

const plugins = [
	new CleanWebpackPlugin(),
	htmlWebpackPluginConfig,
	miniCssExtractPlugin,
	purgecssPluginConfig,
	bundleAnalyzerPlugin,
];

module.exports = {
	entry: path.resolve('./src/index.tsx'),
	output: {
		filename: 'bundle.js',
		path: outputDir,
		publicPath: isDevServer ? '/' : undefined,
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.json'],
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'babel-loader', include: path.resolve('./src') },
			{ test: /\.css$/, loader: MiniCssExtractPlugin.loader },
			{ test: /\.css$/, loader: 'css-loader' },
			{
				test: /\.(png|jpg|jpeg|mp4|fbx|woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
			},
		],
	},
	plugins,
	devtool: 'source-map',
	devServer: { historyApiFallback: true },
	stats: {
		colors: true,
		reasons: true,
		chunks: true,
	},
};
