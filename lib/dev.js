/**
 * 启动开发环境Server
 */


'use strict';
const Server = require('webpack-dev-server');
const webpack = require('webpack');
const getPort = require('../utils/getPort');
const configFactory = require('../utils/configFactory');

// 设置 development
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

// 启动 webpack-dev-server
function startDevServer(port, config) {
  let server;
  let compiler;
  const options = config.devServer;

  // 增加热更新插件
  if(options.hot) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  try {
    compiler = webpack(config);
  } catch (err) {
    if (err instanceof webpack.WebpackOptionsValidationError) {
      console.error(err.message);
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }

    throw err;
  }

  try {
    server = new Server(compiler, options);
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.error(err.message);
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }

    throw err;
  }

  server.listen(port, options.host, (err) => {
    if (err) {
      throw err;
    }

    // 终止信号
    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
      process.on(sig, function() {
        server.close();
        process.exit();
      });
    });

  });
}

const config = configFactory('development');
const DEFAULT_PORT = parseInt(config.devServer.port) || 3000;
// 获取可用端口
getPort({port: DEFAULT_PORT}, function(err, port){
  if(err) throw err;
  startDevServer(port, config);  
});