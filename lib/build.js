'use strict';
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 

process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
  throw err;
});

const buildConfig = require('../config/webpack.prod')();

if(process.argv.includes('-analyzer')) {
  buildConfig.plugins.push(
    // 开启 BundleAnalyzerPlugin 
    new BundleAnalyzerPlugin()
  );
}

console.log('publicPath:', buildConfig.output.publicPath);

const compiler = webpack(buildConfig);

compiler.run((err, stats)=> {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }
  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
});

compiler.done()