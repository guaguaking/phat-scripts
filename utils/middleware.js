const path = require('path');
const paths = require('../utils/paths');

module.exports = ()=> {
  const middleware = require(path.resolve(paths.appSrc, 'webpack.config.js'));

  if(middleware && typeof middleware !== 'function') {
    console.error('webpack.config.js should be a function')
    process.exit(1);
  }

  if(middleware) {
    const middleConfig = middleware();
    return middleConfig;
  }
}