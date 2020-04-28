const webpack = require('webpack');
const glob = require('glob');
const cssnano = require('cssnano');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const PurgecssPlugin = require('purgecss-webpack-plugin');
// const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { DefinePlugin } = webpack;
const { HashedModuleIdsPlugin } = webpack;
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

const purgeCSSPlugin = new PurgecssPlugin({
    paths: glob.sync(`${config.src}/**/*`, { nodir: true }),
    whitelist: config.purgeCssWhiteList,
    whitelistPatterns: config.purgeCssWhiteListPatterns,
    whitelistPatternsChildren: config.purgeCssWhiteListPatternChildren
});

const zipCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({
    cssProcessor: cssnano,
    cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
    },
    canPrint: false
});

const compressionPlugin = new CompressionWebpackPlugin({
    test: new RegExp(`\.(${config.gzipFileExtensions.join('|')})$`),
    threshold: 10240,
    minRatio: 0.8
});

// const htmlCriticalWebpackPlugin = new HtmlCriticalWebpackPlugin({
//     base: config.output,
//     src: 'index.html',
//     dest: 'index.html',
//     inline: true,
//     minify: true,
//     extract: true,
//     width: 375,
//     height: 565,
//     penthouse: {
//         blockJSRequests: false
//     }
// });


module.exports = ([action, target], analyzer) => {
    const isDev = action === 'dev';
    const plugins = [
        new VueLoaderPlugin(),
        new DefinePlugin({
            $$_config: JSON.stringify(config),
            $$_ENV: JSON.stringify([action, target])
        }),
        htmlWebpackPlugin,
        miniExtractCssPlugin
    ];

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    if (!isDev) {
        plugins.push(new CleanWebpackPlugin());
        plugins.push(new HashedModuleIdsPlugin());
        plugins.push(purgeCSSPlugin);
        plugins.push(zipCSSAssetsPlugin);
        plugins.push(compressionPlugin);
        // plugins.push(htmlCriticalWebpackPlugin);
    }

    return plugins;
};
