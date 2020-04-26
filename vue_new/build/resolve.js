const path = require('path');

module.exports = ([action, target]) => ({
    alias: {
        '@assets': path.join(__dirname, '../assets'),
        '@libs': path.join(__dirname, '../libs'),
        '@src': path.join(__dirname, '../src')
    },
    extensions: [
        '.wasm', '.mjs', '.js', 'jsx', '.json', '.vue'
    ]
});
