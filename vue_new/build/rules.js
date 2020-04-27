const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ([action, target]) => [
    {
        enforce: 'pre',
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
    },
    {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    },
    {
        test: /\.s?[ac]ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'sass-loader'
        ]
    }
];
