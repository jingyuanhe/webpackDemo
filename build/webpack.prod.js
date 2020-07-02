const path = require('path')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
module.exports=WebpackMerge(webpackConfig,{
    mode:'production',
    devtool:'cheap-module-source-map',
    optimization:{
        minimizer:[
            new UglifyJsPlugin({
                cache:true,
                sourceMap:true,
                parallel:true,
                sourceMap:true
            }),
            // new ParallelUglifyPlugin({
            //     uglifyJS:{
            //         output:{
            //             beautify:false,
            //             comments:false
            //         },
            //         compress:{
            //             drop_console:true,
            //              // 内嵌定义了但是只用到一次的变量
            //             collapse_vars: true,
            //             // 提取出出现多次但是没有定义成变量去引用的静态值
            //             reduce_vars: true,
            //         }
            //     }
            // }),
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks:{
            chunks:'all',
            cacheGroups:{
                libs: {
                  name: "chunk-libs",
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: "initial" // 只打包初始时依赖的第三方
                }
              }
        }
    }
})