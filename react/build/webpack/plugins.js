const build_const = require('../build_const');
const webpack = require('webpack');
const glob = require('glob');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinChunkSizePlugin = webpack.optimize.MinChunkSizePlugin;
const path = require('path');


let purgeCSSPlugin = new PurgecssPlugin({
    paths: glob.sync(`${build_const.sourceUrl}/**/*`,{ nodir: true }),
    //keyframes: true,
    //fontFace: true,
    whitelist: ()=>build_const.purgeCssWhiteList,
    whitelistPatterns: ()=>build_const.purgeCssWhitelistPatterns
});

let zipCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({
    cssProcessor: cssnano,
    cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
    },
    canPrint: false
})

let compressionPlugin = new CompressionWebpackPlugin({
    test: new RegExp('\.(' +build_const.gzipFileExts.join('|') +')$'),
    threshold: 10240,
    minRatio: 0.8
});

let miniChunkSizePlugin = new MinChunkSizePlugin({
    minChunkSize: 200000 // Minimum number of characters
});

module.exports = function(env){

	let isProd = env==='production';
	let plugins = [
		new webpack.DefinePlugin({
			ENV: JSON.stringify(build_const.env),
			URLS: JSON.stringify(build_const.urls)
		}),
		new HtmlWebpackPlugin({
			title: 'React project template use webpack4+babel7+antd',
			template: build_const.templateUrl,
			favicon: build_const.faviconUrl
		}),
		new MiniCssExtractPlugin({
            filename: './styles/[name]-[contenthash:8].css',
            chunkFilename: './styles/chunk-[name]-[contenthash:8].css'
        })
	];

	if(isProd){
		plugins.push(purgeCSSPlugin);
		plugins.push(zipCSSAssetsPlugin);
		plugins.push(compressionPlugin);
		plugins.push(miniChunkSizePlugin);
	}

	return plugins;

};
