const utils = require('./utils');
const entry = require('./entry');
const output = require('./output');
const rules = require('./rules');
const resolve = require('./resolve');
const plugins = require('./plugins');
const optimization = require('./optimization');

const watchOptions = {
    aggregateTimeout: 500,
    poll: 1000,
    ignored: /node_modules/,
};

module.exports = {
    mode: utils.isProd() ? 'production' : 'development',
    watch: !utils.isProd(),
    watchOptions,
    entry: entry(),
    output: output(),
    resolve: resolve(),
    module: { rules: rules() },
    plugins: plugins(),
    optimization: optimization()
};
