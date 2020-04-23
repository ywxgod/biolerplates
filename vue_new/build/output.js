const config = require('./config');

module.exports = ([action, target]) => ({
    filename: '[name]-[contenthash:8].js',
    publicPath: config.publicPath,
    chunkFilename: 'chunk-[name]-[contenthash:8].js',
    path: config.output,
});
