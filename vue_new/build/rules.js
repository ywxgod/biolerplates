module.exports = ([action, target]) => [
    {
        enforce: 'pre',
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
    },
    {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
    },
];
