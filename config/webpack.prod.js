const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 
const { merge } = require('webpack-merge')
const getCommonConfig = require('./webpack.common')

module.exports = (env, argv) => {
  return merge(
    getCommonConfig(env, argv),
    {
      mode: 'production',
      devtool: '',
      externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "prop-types": "PropTypes"
      },
      plugins: [
        // 开启 BundleAnalyzerPlugin 
        new BundleAnalyzerPlugin()
      ]
    })
}