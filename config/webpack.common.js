// const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const OUTPUT_PATH = path.resolve(__dirname, '../', 'dist');

module.exports = env => {

  return {
    entry: './src/index.js',
    output: {
      path: OUTPUT_PATH,
      filename: 'js/[name].bundle.js',
      chunkFilename: "js/chunk/[name].chunk.js",
      publicPath: ''
    },
    optimization: {
      splitChunks: {
        // minChunks: 2, //文件至少被用了2次才分割；
        chunks: 'all',
        cacheGroups: {
          // vendors: {
          //   test: /[\\/]node_modules[\\/]/, //引入的库是从node_modules引入，就分割库代码到当前组
          //   priority: -10, //权重，数字越大表示优先级越高
          //   chunks: 'initial', //配置这个，是为了下面分割后的代码不报错
          //   filename: 'js/vendors.js'
          // },
          propTypes: {
            test: /[\\/]node_modules[\\/]prop-types\.js/,
            // priority: 10,
            // chunks: 'initial',
            // filename: 'js/react-propTypes.js'
          }
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/
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
            'postcss-loader'
          ],
          exclude: /\.module\.css$/
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
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
              }
            },
            'postcss-loader'
          ],
          include: /\.module\.css$/
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

      }
    },
    externals: {
      // "react": "React",
      // "react-dom": "ReactDOM"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        title: 'create-react-app',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),
      new CleanWebpackPlugin(),
      new FriendlyErrorsWebpackPlugin({
        logLevel: 'errors-only'
      })
    ],
  };
}