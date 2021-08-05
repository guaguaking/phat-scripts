/**
 * 导出dev配置
 */


const { merge } = require('webpack-merge')
const getCommonConfig = require('./webpack.common')
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const baseConfig = getCommonConfig();
const config = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin({}),    // css压缩可配置
  ]
  },
  devServer: {
    contentBase: false,
    historyApiFallback: true,
    hot: true, // 热替换
    hotOnly: true, //错误回退
    port: 3000,
    open: true,
    quiet: true,
    host: 'localhost',
  },
  plugins: [

  ]
})

module.exports = config;
