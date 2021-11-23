const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const constant = require('./const');


module.exports = function(){
    return [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: 'babel-loader'
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { importLoaders: 1 },
                },
                "sass-loader",
            ],
        },
        {
            test: /\.(jpg|jpeg|gif|bmp|png|ico)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    publicPath: constant.publicPath,
                    name: './images/[name]-[hash:8].[ext]'
                }
            }
        },
        {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|flv)(\?.*)?$/,
            loader: 'file-loader',
            options: {
                publicPath: constant.publicPath,
                name: './media/[name].[hash:8].[ext]'
            }
        },
        {
            test: /\.(svg|eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: constant.publicPath,
                    name: './fonts/[name].[ext]'
                }
            }
        }
    ];
};
