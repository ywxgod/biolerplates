const build_const = require('../build_const');
const path = require('path');

module.exports = function(env){
	return {
		alias: {
			'@src': path.join(__dirname, '../../src'),
			'@app': path.join(__dirname, '../../src/app'),
			'@libs': path.join(__dirname, '../../src/libs'),
			'@assets': path.join(__dirname, '../../assets'),
			'vue$': path.join(__dirname, '../../node_modules/vue/dist/vue.esm.js')
		},
		extensions: [
            '.wasm', '.mjs', '.js', '.json', '.vue'
        ]
	};
};
