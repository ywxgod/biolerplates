const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./config');

module.exports = ([action, target]) => {
    const isProd = action !== 'dev';
    return [
        {
            enforce: 'pre',
            test: /\.m?js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.s?[ac]ss$/,
            use: [
                isProd ? { loader: MiniCssExtractPlugin.loader } : 'vue-style-loader',
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'sass-loader'
            ]
        },
        {
            test: /\.(jpg|jpeg|gif|bmp|png|ico)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    publicPath: config.publicPath,
                    name: './images/[name]-[hash:8].[ext]'
                }
            }
        },
        {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|flv)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10240,
                publicPath: config.publicPath,
                name: './media/[name].[hash:8].[ext]'
            }
        },
        {
            test: /\.(svg|eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: config.publicPath,
                    name: './fonts/[name].[ext]'
                }
            }
        }
    ];
};
