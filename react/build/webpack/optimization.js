const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

let uglifyjsWebpackPlugin = new UglifyJsWebpackPlugin({
    cache: true,
    parallel: true,
    sourceMap: false,
    uglifyOptions:{
        ie8:false,
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
            booleans: true,
            warnings: false
        },
        output: {
            beautify: false
        }
    }
});

module.exports = function(env){

    return {
        runtimeChunk: {
            name: "manifest",
        },
        minimizer: [uglifyjsWebpackPlugin],
        splitChunks: {
            //minSize: 30000,
            //maxSize: 0,
            cacheGroups:{
                commons:{
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2,
                    priority: 2,
                },
                styles: {
                  name: 'styles',
                  test: /\.css$/,
                  chunks: 'all',
                  enforce: true,
                  priority: 20, 
                },
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'react',
                    chunks: "initial",
                    priority: 10,
                },
                antd: {
                    test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
                    name: 'antd',
                    chunks: "initial",
                    priority: 11,
                }
            }
        },
    }
}