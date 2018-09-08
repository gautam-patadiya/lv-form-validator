const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
	entry: {
		component: './src/classes/LVFormValidator.js',
		// app:'./src/main.js' // To Run Example 
	},
	watch: true,
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'build.js',
		library: ['LVFormValidator'],
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		],
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map',
	plugins: [
		new VueLoaderPlugin()
	]
};