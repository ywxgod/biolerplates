const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
        htmlWebpackPlugin,
        miniExtractCssPlugin
    ];

    return plugins;
};
