const build_const = require('../build_const');

module.exports = function(env){
	return {
		polyfill: '@babel/polyfill',
		app: build_const.entryUrl
	};
};