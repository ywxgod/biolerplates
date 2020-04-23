module.exports = ([action, target]) => {
    return [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }
    ];
};