const path = require('path');
const { browser } = require('webpack-nano/argv');


process.env.BROWSERSLIST_ENV = browser || 'defaults';

exports.host = '127.0.0.1';
exports.port = 4201;
exports.srcPath = path.join(__dirname, '../src');
exports.appPath = path.join(__dirname, '../src/app');
exports.entryFile = path.join(__dirname, '../src/index.js');
exports.publicPath = '/';
exports.outputPath = path.join(__dirname, '../dist');
exports.outputPathProd = path.join(__dirname, '../dist-prod');
// 公用资源路径，包括图片，样式，其他二进制资源文件
exports.assetsPath = path.join(__dirname, '../assets');
// 公用第三方库，开源库等，自己写的公用库
exports.libsPath = path.join(__dirname, '../src/libs');
// 公共组件
exports.componentsPath = path.join(__dirname, '../src/components');
