/**
 * babel配置
 * 代码编译
 */
module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "corejs": "3",
      "useBuiltIns": "usage" //按需引入 @babel/polyfill
    }],
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-transform-runtime", {
      "corejs": 3,
      "regenerator": true
    }]
  ]
};