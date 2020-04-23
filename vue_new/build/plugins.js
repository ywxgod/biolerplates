const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: 'vue最新打包配置模板',
    template: config.template,
    favicon: config.faviconUrl,
    hash: true,
    minify: true,
});


module.exports = ([action, target]) => {
    const plugins = [
        htmlWebpackPlugin,
    ];

    return plugins;
};
