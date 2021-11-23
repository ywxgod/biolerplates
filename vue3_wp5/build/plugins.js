const utils = require('./utils');
const constant = require('./const');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader')
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');
const { WebpackPluginServe } = require('webpack-plugin-serve');


const isProd = utils.isProd();

const miniHtmlWebpackPlugin = new MiniHtmlWebpackPlugin({
    context: {
        title: 'vue3+wp5',
        body: '<div id="app"></div>'
    }
});

const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: isProd ? './styles/[name]-ext.[contenthash].css' : './styles/[name]-ext.css',
    chunkFilename: isProd ? './styles/[id]-ext.[contenthash].css' : './styles/[id]-ext.css'
});

const webpackPluginServe = new WebpackPluginServe({
    port: constant.port,
    host: constant.host,
    static: constant.outputPath,
    liveReload: true,
    waitForBuild: true
});

const purgeCssPlugin = new PurgeCSSPlugin({
    // content: ['index.html', '**/*.js', '**/*.html', '**/*.vue'],
    defaultExtractor (content) {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
    },
    safelist: [/-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/, /data-v-.*/],
    paths: () => glob.sync(`${constant.srcPath}/**/*`, { nodir: true })
});

module.exports = function() {
    const plugins = [];
    plugins.push(miniHtmlWebpackPlugin);
    plugins.push(miniCssExtractPlugin);
    plugins.push(new VueLoaderPlugin());
    plugins.push(purgeCssPlugin);

    if (!utils.isProd()) {
        plugins.push(webpackPluginServe);
    }

    return plugins;
};
