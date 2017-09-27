var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
		'./src/index'
    ],
	module: {
        loaders: [{ 
			test: /\.js?$/,
			loader: 'babel',
			query: {
				presets: ['es2015']
			},
			exclude: /node_modules/ 
        }]
    },
    resolve: {
        extensions: ['', '.js']
    },
    output: {
		path: path.join(__dirname, '/public/js'),
		publicPath: '/public/js',
        filename: 'mytv-core.js'
    },
    devServer: {
		contentBase: './public',
        hot: true
    },
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
    ]
};
