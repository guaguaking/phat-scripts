const { merge } = require('webpack-merge')
const getCommonConfig = require('./webpack.common')

const config = merge(getCommonConfig(), {
  mode: 'production',
  devtool: '',
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "prop-types": "PropTypes"
  },
  plugins: []
})


module.exports = config;