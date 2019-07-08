const path = require('path');

module.exports = {
	templateUrl: path.join(__dirname, '../src/app/index.html'),
	entryUrl: path.join(__dirname, '../src/app'),
    sourceUrl: path.join(__dirname, '../src'),
	outputUrl: path.join(__dirname, '../dist'),
	faviconUrl: path.join(__dirname, '../assets/images/favicon-marrio.ico'),
	host: '0.0.0.0',
	port: 4201,
	gzipFileExts: ['js','css','html','ico','jpg','png','ttf','woff'],
    purgeCssWhiteList: [
        
    ],
    purgeCssWhitelistPatterns:[
        /--(primary|warning|info|small)/
    ],
    env: {
    	dev: 'development', prod: 'production', test: 'test'
    },
    urls: {
    	dev: {
    		baseUrl: ''
    	},
    	prod: {
    		baseUrl: ''
    	},
    	test: {
    		baseUrl: ''
    	}
    }
};