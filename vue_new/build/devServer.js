const config = require('./config');

const proxyConfig = {
    mock: [
        { context: ['/api'], target: 'http://localhost:3000' }
    ],
    dev: [
        { context: ['/api'], target: 'http://134.234.43.33:8080' }
    ],
    test: [
        { context: ['/api'], target: 'http://22.139.2.34' }
    ]
};


module.exports = ([action, target]) => {

    if(action !== 'dev') {
        return {};
    }

    const devServer = {
        contentBase: config.output,
        port: config.port,
        host: config.host,
        watchContentBase: true,
        historyApiFallback: true,
        disableHostCheck: true,
        compress: true,
        overlay: true,
        watchOptions: {
            poll: 1000,
            aggregateTimeout: 300,
            ignored: /node_modules/
        },
        stats: {
            performance: true,
            chunks: true,
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
        }, // errors-only
        proxy: proxyConfig[target] || []
    };

    return devServer;

};