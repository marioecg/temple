const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const appDir = path.join(__dirname, 'scripts');
const assetsDir = path.join(__dirname, 'assets');
const stylesDir = path.join(__dirname, 'styles');

const config = {
  mode: isProduction ? 'production' : 'development',

  entry: {
    main: path.join(appDir, 'app.js'),
    style: path.join(stylesDir, 'main.scss'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    open: true,
    host: 'localhost',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    // Other plugins here...
  ],

  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },

      // Sass
      {
        test: /\.scss$/,
        use: [          
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },

          {
            loader: 'css-loader'
          },

          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },

          {
            loader: 'sass-loader'
          },
      ],
      },

      // Image, svg, font assets
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        loader: 'file-loader',
      },

      // Other loaders...
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }

  return config;
};
