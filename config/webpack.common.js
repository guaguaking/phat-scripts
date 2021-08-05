// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path')
const paths = require('../utils/paths')

module.exports = () => {

  const OUTPUT_PATH = paths.appDist;
  const ENTRY_PATH = paths.appSrc;

  // const PUBLIC_PATH = argv.mode === 'production' ? '.' : '/'

  const config =  {
    entry: `${ENTRY_PATH}/index.js`,
    output: {
      path: OUTPUT_PATH,
      filename: 'js/[name].bundle.js',
      chunkFilename: "js/chunk/[name].chunk.js",
      publicPath: ''
    },
    // 性能提示 https://www.webpackjs.com/configuration/performance/
    performance: false,
    optimization: {
      splitChunks: {
        // minChunks: 2, //文件至少被用了2次才分割；
        chunks: 'all',
        cacheGroups: {
          // 第三方
          vendors: {
            test: /[\\/]node_modules[\\/]/, //引入的库是从node_modules引入，就分割库代码到当前组
            priority: -10, //权重，数字越大表示优先级越高
            name: 'vendors'
          },

        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, '../lib/babel.config.js')
            }
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            // 'postcss-loader'
          ],
          exclude: /\.module\./
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: 'css-[hash:base64:6]',
                },
              }
            },
            //'postcss-loader'
          ],
          include: /\.module\./
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 匹配图片文件
          loader: "url-loader",
          options: {
            limit: 1024, // limit: 1024,限制 图片大小 1kB，小于限制会将图片转换为 base64格式
            name: 'images/[name].[ext]'
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 匹配音频文件
          loader: "url-loader",
          options: {
            limit: 1024,
            name: 'media/[name].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 匹配字体文件
          loader: "url-loader",
          options: {
            limit: 1024,
            name: 'fonts/[name].[ext]'
          }
        },
      ]
    },
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.vue'
      ],
      alias: {
        '@': ENTRY_PATH
      }
    },
    externals: {
      // "react": "React",
      // "react-dom": "ReactDOM"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${ENTRY_PATH}/index.html`,
        filename: 'index.html',
        title: 'create-app',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),
      new CleanWebpackPlugin(),
      new FriendlyErrorsWebpackPlugin({
        logLevel: 'errors-only',
        // 是否每次都清空控制台
        // clearConsole: true,
      })
    ],
  };
  return config;
}