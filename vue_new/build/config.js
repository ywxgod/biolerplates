const path = require('path');

module.exports = {
    // 本地端口 - 没有做端口检测，如果发现冲突换一个即可，或是检查nodejs是否正常退出
    port: 4201,
    // 本地域名
    host: 'id.wyin.xyz',
    // 网站根目录
    publicPath: '/',
    // 入口文件
    entry: path.join(__dirname, '../src/app'),
    // 产出文件
    output: path.join(__dirname, '../dist'),
    // 源码
    src: path.join(__dirname, '../src'),
    // 入口html模板
    template: path.join(__dirname, '../src/app/index.html'),
    // favicon
    faviconUrl: path.join(__dirname, '../assets/images/favicon-marrio.ico'),

    env: {
        'dev:mock': {
            mode: 'development',
        },
        'dev:dev': {
            mode: 'development',
        },
        'dev:test': {
            mode: 'development',
        },
        'build:dev': {
            mode: 'production',
        },
        'build:test': {
            mode: 'production',
        },
        'build:prod': {
            mode: 'production',
        },
        'deploy:dev': {
            mode: 'production',
        },
        'deploy:test': {
            mode: 'production',
        },
        'deploy:prod': {
            mode: 'production',
        },
    },
};
