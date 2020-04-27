const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const DefinePlugin = webpack.DefinePlugin;
const config = require('./config');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: 'vue最新打包配置模板',
    template: config.template,
    favicon: config.faviconUrl,
    hash: true,
    minify: true
});

const miniExtractCssPlugin = new MiniCssExtractPlugin({
    filename: './styles/[name]-[contenthash:8].css',
    chunkFilename: './styles/chunk-[name]-[contenthash:8].css'
});


module.exports = ([action, target]) => {
    const plugins = [
        new VueLoaderPlugin(),
        new DefinePlugin({
            '$$_config': JSON.stringify(config),
            '$$_ENV': JSON.stringify([action, target])
        }),
        htmlWebpackPlugin,
        miniExtractCssPlugin
    ];

    return plugins;
};
