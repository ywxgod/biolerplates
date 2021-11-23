const { env } = require('webpack-nano/argv');

exports.isProd = () => env === 'prod';
