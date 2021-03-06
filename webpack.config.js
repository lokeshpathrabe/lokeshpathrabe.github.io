'use strict'

var path = require('path');
var webpack = new require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bundleExtractPlugin = new ExtractTextPlugin({
    filename: './css/style.css',
});


/**
 * Use below config to import scss in your js as regular js module which will work for webpack-web-server only. 
 * style-loader and ExtractTextPlugin to go together for some reason.
 * {
                test: /\.scss$/,
                use: [''style-loader', 'css-loader', 'sass-loader']
    }
 */

module.exports = {
    mode: 'development',
    optimization: {
        minimize: false
      },
    entry: './src/script.jsx',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'index.js',
        publicPath: '/build'
    },
    devServer: {
        contentBase: './',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets:  ["@babel/preset-env","@babel/preset-react"]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: bundleExtractPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                })
            },
            {
                test: /\.css$/,
                use: bundleExtractPlugin.extract({
                    use: ['css-loader'],
                })
            }
        ]
    },
    plugins: [bundleExtractPlugin, new webpack.HotModuleReplacementPlugin()],
    resolve: {
        extensions: ['.js', '.jsx'],
    }
}