const path = require('path');
const paths = require('../utils/paths');

module.exports = () => {
  const proxyTablePath = path.resolve(paths.appSrc, 'proxyTable.js');
  try {
    return require(proxyTablePath);
  } catch (e) {
    const fs = require('fs');
    fs.copyFileSync( path.resolve(__dirname, '../lib/proxyTable.js'), proxyTablePath, fs.constants.COPYFILE_EXCL);
    require(proxyTablePath);
  }
};