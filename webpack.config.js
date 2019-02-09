const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var baseConfig = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'), //absolute path
        filename: 'js/bundle.js'
    },


    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: './src/index.html'
        })

    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}
module.exports = baseConfig;



