const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 
const { merge } = require('webpack-merge')
const getCommonConfig = require('./webpack.common')

module.exports = env => {
  return merge(
    getCommonConfig(env),
    {
      mode: 'production',
      devtool: '',
      externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "prop-types": "PropTypes"
      },
      plugins: [
        new webpack.DefinePlugin({
          NODE_ENV: JSON.stringify('production')
        }),
        // 开启 BundleAnalyzerPlugin 
        new BundleAnalyzerPlugin()
      ]
    })
}