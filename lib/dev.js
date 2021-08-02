'use strict';
const Server =require('webpack-dev-server/lib/Server');
const webpack = require('webpack');

process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

let server;

function startDevServer(config) {
  let compiler;
  const options = config.devServer;
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

  server.listen(options.port, options.host, (err) => {
    if (err) {
      throw err;
    }
  });
  // console.log(server);

}

const devConfig = require('../config/webpack.dev')();
startDevServer(devConfig);