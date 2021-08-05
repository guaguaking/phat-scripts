const path = require('path');
const paths = require('../utils/paths');

module.exports = () => {
  let middleware = {};
  try{
    middleware = require(path.resolve(paths.appPath, 'webpack.config.js'));
    if(Object.prototype.toString.call(middleware) === '[object Function]') {
      middleware = middleware();
    }
    // else if(Object.prototype.toString.call(middleware) === '[object Object]') {
    //   return middleware;
    // }
  } catch(e) {
    return {};
  }
};