const webpack = require('webpack');
const { merge } = require('webpack-merge')
const getCommonConfig = require('./webpack.common')
const middleware = require('../utils/middleware')

module.exports = () => {
  const baseConfig = getCommonConfig();
  const config = merge(baseConfig, {
    mode: 'production',
    devtool: '',
    externals: {
      "react": "React",
      "react-dom": "ReactDOM",
      "prop-types": "PropTypes"
    },
    plugins: []
  })

  const middleConfig = middleware();
  const nextConfig = merge(config, middleConfig||{});
  // 防止mode被篡改
  nextConfig.mode = 'production';
  if(!nextConfig.output.publicPath) {
    nextConfig.output.publicPath = '/'; 
  }
  return nextConfig;
}