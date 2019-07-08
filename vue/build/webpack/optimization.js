const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
            booleans: true
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
        
        
        minimizer: [new TerserJSPlugin({}), uglifyjsWebpackPlugin],
        splitChunks: {
            //minSize: 30000,
            //maxSize: 0,
            
            cacheGroups:{
                commons:{
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
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
                vue: {
                    test: /[\\/]node_modules[\\/](vue|vue-router)[\\/]/,
                    name: 'vue',
                    chunks: "initial",
                    priority: 10,
                },
                eleui: {
                    test: /[\\/]node_modules[\\/](element-ui)[\\/]/,
                    name: 'eleui',
                    chunks: "initial",
                    priority: 11,
                }
            }
        },
    }
}