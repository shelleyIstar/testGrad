const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (webpackConfig, env) {
    webpackConfig.devtool = 'cheap-module-source-map';
    console.log("webpackConfig", webpackConfig)
    return webpackConfig;
 
}
