const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

const uglifyjsWebpackPlugin = new UglifyJsWebpackPlugin({
    cache: true,
    parallel: true,
    sourceMap: false,
    uglifyOptions: {
        ie8: false,
        mangle: true,
        keep_fnames: false,
        toplevel: false,
        compress: {
            unused: true,
            dead_code: true,
            drop_debugger: true,
            conditionals: true,
            evaluate: true,
            drop_console: false,
            sequences: true,
            booleans: true
        },
        output: {
            beautify: false
        }
    }
});

module.exports = ([action, target]) => {
    return {
        runtimeChunk: 'single',
        minimizer: [uglifyjsWebpackPlugin],
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    name(module) {
                        let packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        packageName = packageName.replace('@', '');
                        let chkName = 'vendor';
                        if (~packageName.indexOf('vue')) {
                            chkName = 'vue';
                        } else if (~packageName.indexOf('element-ui')) {
                            chkName = 'eleui';
                        }
                        return `npm.${chkName}`;
                    }
                },
                style: {
                    test: /[\\/]vue_new\/assets[\\/]/,
                    priority: 30,
                    name(module) {
                        let packageName = module.context;
                        console.log(packageName, '---');
                        return 'app.style';
                    }
                }
            }
        }
    };
};
