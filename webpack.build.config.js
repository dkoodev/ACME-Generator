const webpack = require('webpack');
const path = require('path');

// Config directories
const SRC_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

// Add all directories with files in this array
const defaultInclude = [SRC_DIR];

module.exports = {
  entry: [
    // 'react-hot-loader/patch',
    SRC_DIR + '/index.js',
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader:[ 'style-loader', 'css-loader' ],
        include: defaultInclude
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: ['babel-loader'],
        include: defaultInclude
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ],
        include: defaultInclude
      },
      // {
      //   test: /\.(?:png|jpg|svg)$/,
      //   loader: 'url-loader',
      //   query: {
      //     // Inline images smaller than 10kb as data URIs
      //     limit: 10000
      //   }
      // },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        query: {
          name: "[name][md5:hash].[ext]"
        },
        include: defaultInclude
      }

    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: OUTPUT_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
  ],
  devServer: {
    contentBase: './dist'
  }
};
