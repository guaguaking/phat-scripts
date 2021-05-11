const webpack = require('webpack');
const { merge } = require('webpack-merge')
const getCommonConfig = require('./webpack.common')

module.exports = env => {

  return merge(
    getCommonConfig(env),
    {
      mode: 'development',
      devtool: 'eval-source-map',
      devServer: {
        contentBase: false,
        historyApiFallback: true,
        hot: true, // 热替换
        hotOnly: true, //错误回退
        port: 8080,
        open: true,
        quiet: true,
        //host: '0.0.0.0',
      },
      plugins: [
        new webpack.DefinePlugin({
          NODE_ENV: JSON.stringify('development')
        })
      ]
    })
}