var webpack = require("webpack");
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
	cache: true,
	entry: './src/js/main.js',
	debug: true,
	resolve: {
		modulesDirectories: ['node_modules', 'bower_components']
	},
	output: {
		path: 'build/',
		filename: 'app.js',
		publicPath: 'build'
	},
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: "jsx-loader" },
			{ test: /\.scss$/, loader: "style-loader!sass-loader?outputStyle=expanded" },
			{ test: /\.css$/, loader: "style!css" },
			{ test: /\.svg$/, loader: "url-loader?limit=100000&mimetype=image/svg+xml" },
			{ test: /\.json$/, loader: 'json' }
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery"
		}),
		new CompressionPlugin({
			asset: "{file}.gz",
			algorithm: "gzip",
			regExp: /\.js$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]
};
