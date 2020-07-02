const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const webpackMerge = require('webpack-merge')
module.exports = webpackMerge(webpackConfig,{
    mode:'development',
    devtool:'#@cheap-module-eval-source-map',
    devServer:{
        port:3000,
        hot:true,
        contentBase:'../dist'
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
})