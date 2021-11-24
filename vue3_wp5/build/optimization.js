const TerserPlugin = require("terser-webpack-plugin");

module.exports = () => {
    return {
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [new TerserPlugin()],
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
                        } else if (~packageName.indexOf('babel') || ~packageName.indexOf('runtime')) {
                            chkName = 'babel-runtime';
                        } else if (~packageName.indexOf('core-js')) {
                            chkName = 'corejs';
                        }
                        return `pk.${chkName}`;
                    }
                }
            }
        }
    };
};
