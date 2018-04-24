const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge'); // 合并webpack的config
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin'); // 把非js代码单独打包成一个文件
const baseConfig = require('./webpack.config.base');
const isDev = process.env.NODE_ENV === 'development'; // 判断是不是开发环境
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev
        ? '"development"'
        : '"production"'
    }
  }),
  new HtmlWebpackPlugin()
]
const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: { // 让webpack的报错全部显示在网页上
    errors: true
  },
  open: true, // 每次启动自动打开浏览器
  hot: true, // 不会刷新页面，之刷新当前修改的这个组件
};
let config;
if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }, {
          test: /\.styl$/,
          use: [
            'vue-style-loader',
            'css-loader', {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: { // 把框架代码和业务代码分离打包
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractPlugin.extract({fallback: 'style-loader', use: ['css-loader']})
        }, {
          test: /\.styl$/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader', {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack
        .optimize
        .CommonsChunkPlugin({name: 'vendor'}),
      new webpack
        .optimize
        .CommonsChunkPlugin({name: 'runtime'})
    ])
  })
}

module.exports = config;