const constant = require('./const');

module.exports = function(){
    return {
        alias: {
            '@assets': constant.assetsPath,
            '@components': constant.componentsPath,
            '@libs': constant.libsPath,
            '@app': constant.appPath
        },
        extensions: ['.vue', '...']
    };
};
