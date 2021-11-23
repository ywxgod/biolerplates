const utils = require('./utils');
const constant = require('./const');

module.exports = function () {
    const entries = [constant.entryFile];
    if (!utils.isProd()) {
        entries.push('webpack-plugin-serve/client');
    }
    return { app: entries };
}
