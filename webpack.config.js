/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable sort-keys */
const path = require('path');
const glob = require('glob');
const os = require('os');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const outputDir = path.resolve('./dist');
const isDevServer = process.argv.includes('serve');

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
	base: isDevServer ? '/' : '/apps/mapper/',
	destination: outputDir,
	favicon: './app/img/favicon.ico',
	filename: 'index.html',
	inject: 'body',
	template: './app/index.html',
});
const purgecssPluginConfig = new PurgecssPlugin({
	keyframes: true,
	paths: glob.sync(path.resolve('./app/**/*'), { nodir: true }),
	safelist: [/leaflet/, /map/i],
});
const miniCssExtractPlugin = new MiniCssExtractPlugin({ filename: '[name].css' });
const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
	analyzerMode: isDevServer || os.hostname().includes('cnnitouch') ? 'disabled' : 'server',
});
const myHtaccess = './app/.htaccess';
const copyPlugin = new CopyPlugin({
	patterns: [{ from: myHtaccess, to: '.htaccess', toType: 'file' }],
});

const plugins = [
	new CleanWebpackPlugin(),
	htmlWebpackPluginConfig,
	miniCssExtractPlugin,
	purgecssPluginConfig,
	copyPlugin,
	bundleAnalyzerPlugin,
];

module.exports = {
	entry: path.resolve('./app/index.tsx'),
	output: {
		filename: 'bundle.js',
		path: outputDir,
		publicPath: isDevServer ? '/' : undefined,
	},
	optimization: {
		providedExports: false,
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.json'],
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'babel-loader', include: path.resolve('./app') },
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
