const build_const = require('../build_const');

module.exports = function(env){
	return {
		filename: '[name]-[hash:8].js',
		chunkFilename: 'chunk-[name]-[hash:8].js',
		path: build_const.outputUrl
	}
};