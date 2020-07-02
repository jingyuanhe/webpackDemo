const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const devMode = process.argv.indexOf('--mode=production') === -1;
const HappyPack = require('happypack');
const os = require('os');
const webpack = require('webpack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    entry: ["@babel/polyfill",path.resolve(__dirname,'../src/main.js')],
    output: {
        filename: '[name].[hash:8].js',
        chunkFilename:'js/[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.runtime.esm.js',
            '@':path.resolve(__dirname,'../src'),
            'components':path.resolve('src/components'),
            'assets':path.resolve('src/assets')
        },
        extensions:['.js','.json','.vue']
    },
    module: {
        rules: [{
            test:/\.vue$/,
            use:[{
                loader:'vue-loader',
                options: {
                    compilerOptions: {
                      preserveWhitespace: false
                    }
                }
            }],
            exclude:/node_modules/
        },{
            test: /\.js$/,
            use: ['happypack/loader?id=babel'],
            exclude:/node_modules/
        },{
            test: /\.css$/,
            use: [{
                loader: devMode?'vue-style-loader':MiniCssExtractPlugin.loader,
                options:{
                    publicPath:"../dist/css/",
                    hmr:devMode
                }
            }, 'css-loader',{
                loader: 'postcss-loader',
                options: {
                    plugins: [require('autoprefixer')]
                }
            }]
        }, {
            test: /\.scss$/,
            use: ['vue-style-loader', 'css-loader', {
                loader: 'postcss-loader',
                options: {
                    plugins: [require('autoprefixer')]
                }
            }, 'sass-loader']
        }, {
            test: /\.(jpe?g|png|gif)$/i, //图片文件
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[hash:8].[ext]'
                        }
                    }
                }
            }],
            include:[path.resolve(__dirname,'src/assets')],
            exclude:/node_modules/
        }]
    },
    plugins: [
        new HappyPack({
            id:'babel',
            loaders:[{
                loader:'babel-loader',
                options:{
                    presets:[
                        ['@babel/preset-env']
                    ],
                    cacheDirectory:true
                }
            }],
            threadPool:happyThreadPool
        }),
        new vueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].css",
        }),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname,'../public'),
                    to:path.resolve(__dirname,'../dist')
                }
            ]
        }),
        new webpack.DllReferencePlugin({
            context:__dirname,
            manifest:require('./vendor-manifest.json')
        })
    ]
}