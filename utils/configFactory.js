const { merge } = require('webpack-merge')
const devConfig = require('../config/webpack.dev');
const prodConfig = require('../config/webpack.prod');
const middleware = require('./middleware')
const getProxyTable = require('./getProxyTable')

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  if(isEnvDevelopment) {
    const mergeConfig = merge(devConfig, middleware());
    // 配置代理
    mergeConfig.devServer.proxy = getProxyTable();
    // 开发环境忽略publicPath
    mergeConfig.output.publicPath = ''; 
    mergeConfig.mode = 'production';
    return mergeConfig;
  }

  if(isEnvProduction) {
    const mergeConfig = merge(prodConfig, middleware());
    mergeConfig.mode = 'production';
    return mergeConfig;
 }
}