const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(env){
    let isProd = env==='production';
	return [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
		{
			test: /\.s?[ac]ss$/,
			use: [
				isProd?{loader:MiniCssExtractPlugin.loader,options:{publicPath: '../'}}:'vue-style-loader',
				{loader:'css-loader',options:{importLoaders:1}},
				'sass-loader'
			]
		},
		{
            test: /\.(jpg|jpeg|gif|bmp|png|ico)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    publicPath: '../',
                    name: './images/[name]-[hash:8].[ext]'
                }
            }
        },
        {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|flv)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10240,
                publicPath: '../',
                name: './media/[name].[hash:8].[ext]'
            }
        },
        {
            test: /\.(svg|eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '../',
                    name: './fonts/[name].[ext]'
                }
            }
        }
	];
};