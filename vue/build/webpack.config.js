const path = require('path');
const build_const = require('./build_const');
const entry = require('./webpack/entry');
const output = require('./webpack/output');
const resolve = require('./webpack/resolve');
const plugins = require('./webpack/plugins');
const rules = require('./webpack/rules');
const optimization = require('./webpack/optimization');

const devServer = {
	contentBase: build_const.outputUrl,
	port: build_const.port,
	host: build_const.host,
	watchContentBase: true,
    historyApiFallback: true,
    compress: true,
	stats: {
		performance: true,
		chunks: false,
		chunkModules: false,
		chunkOrigins: false,
		errors: true,
		errorDetails: true,
		hash: false,
		timings: false,
		modules: false,
        warnings: true,
        entrypoints: false,
        children: false
    }
};

module.exports = function(env){
    let isDev = env === 'development';
    let isProd = env === 'production';
    let isTest = env === 'test';
    let config = {
        stats: {
            entrypoints: false,
            children: false
        },
        mode: isTest?'development':env,
        entry: entry(env),
        output: output(env),
        resolve: resolve(env),
        module: {rules: rules(env)},
        plugins: plugins(env),
        performance:{
            //hints: false
        }
    };
    if(isDev){
        config.devtool = 'source-map';
        config.devServer = devServer;
    }
    if(isTest){
        config.devtool = 'source-map';
    }
    if(isProd){
        config.optimization = optimization(env);
    }
    return config;
}