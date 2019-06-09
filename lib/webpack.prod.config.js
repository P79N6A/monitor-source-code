const path = require('path');
// const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
module.exports = {
  entry: {
    entry: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "index.js"
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(jsx|js)$/,
      use: {
        loader: 'babel-loader',
      },
      exclude: /node_modules/
    },
    {
      test: /\.(eot|ttf|woff|woff2|svg)$/,
      use: ['file-loader']
    }
    ]
  },
  plugins: [
    // new uglify(),
    //    new webpack.optimize.UglifyJsPlugin({
    //      compress: {
    //        warnings: false
    //      },
    //      sourceMap: true
    //    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true
      },
      sourceMap: false
    }),
    new htmlPlugin({
      minify: {
        removeAttributeQuotes: true
      },
      filename: 'index.html',
      hash: true,
      template: '../website/index.html'

    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    host: "localhost",
    compress: true,
    port: 1300
  }
};