module.exports = {
	devtool: 'inline-source-map',
	_module: {
		rules: [
		{
			test: /\.(ts|tsx|d.ts)?$/,
			exclude: /node_modules/,
			use: [{
				loader:'awesome-typescript-loader'
			},
			{
				loader: "tslint"
			}]
		},
		{
			test: /\.json?$/,
			use: {
				loader: 'json'
			}
		},
		{
			test: /\.css?$/,
			exclude: /node_modules/,
			use: [{
					loader: 'style'
				},{
					loader: 'css'
			}]
		}]
	},
	resolve: {
		extensions: ['.css','.ts','.tsx', '.js','.jsx', '.json', '.html']
	},
	externals: {
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': true,
		'react/addons': true
	}
}