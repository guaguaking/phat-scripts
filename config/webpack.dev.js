const { merge } = require('webpack-merge')
const getCommonConfig = require('./webpack.common')
const middleware = require('../utils/middleware')

process.env.NODE_ENV = 'development';

module.exports = () => {
  const baseConfig = getCommonConfig();
  const config = merge(baseConfig, {
      mode: 'development',
      devtool: 'eval-source-map',
      devServer: {
        contentBase: false,
        historyApiFallback: true,
        hot: true, // 热替换
        hotOnly: true, //错误回退
        port: 9000,
        open: true,
        quiet: true,
        //host: '0.0.0.0',
      },
      plugins: [
        
      ]
  })

  const middleConfig = middleware();
  const nextConfig = merge(config, middleConfig||{});
  // 防止mode被篡改
  nextConfig.mode = 'development';
  // 开发环境本地
  nextConfig.output.publicPath = '';
  return nextConfig;
}
