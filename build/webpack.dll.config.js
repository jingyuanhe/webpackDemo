const path = require("path");
const webpack = require("webpack");
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
module.exports = {
  // 你想要打包的模块的数组
  entry: {
    vendor: ['vue'] 
  },
  output: {
    path: path.resolve(__dirname, '../public/static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library' 
     // 这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname,'../public', '[name]-manifest.json'),
      name: '[name]_library', 
      context: __dirname
    }),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          comments: false
        },
        compress: {
          drop_console:true,
          // 内嵌定义了但是只用到一次的变量
         collapse_vars: true,
         // 提取出出现多次但是没有定义成变量去引用的静态值
         reduce_vars: true,
        }
      }
    })
  ]
};
