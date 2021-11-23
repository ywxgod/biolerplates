const utils = require('./utils');
const constant = require('./const');

module.exports = function () {

    const isProd = utils.isProd();
    const filename = isProd ? '[name].[contenthash].js' : '[name].js';
    const chunkFilename = isProd ? '[name].[contenthash].js' : '[name].js';
    const assetModuleFilename = isProd ? '[name].[contenthash][ext][query]' : '[name][ext][query]';

    return {
        path: !isProd ? constant.outputPath : constant.outputPathProd,
        filename,
        chunkFilename,
        assetModuleFilename,
        clean: true
    };
}
