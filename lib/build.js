/**
 * 生成环境
 */


'use strict';
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 
const execSync = require('child_process').execSync;
const spawn = require('cross-spawn');
const configFactory = require('../utils/configFactory');

process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
  throw err;
});

try {
  // 校验代码格式 eslint
  spawn.sync('npx eslint src/ --fix',{stdio: 'inherit'});
} catch {
  process.exit(1);
}

const config = configFactory('production');

// argv中包含--analyzer启用BundleAnalyzerPlugin 分析插件
if(process.argv.includes('--analyzer')) {
  config.plugins.push(
    // 开启 BundleAnalyzerPlugin 
    new BundleAnalyzerPlugin()
  );
}

const compiler = webpack(config);

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