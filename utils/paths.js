const path = require('path');
const resolveApp = resolvePath => path.resolve(process.cwd(), resolvePath);

module.exports = {
  appPath: resolveApp('.'),
  appSrc: resolveApp('src'),
  appDist: resolveApp('dist')
};