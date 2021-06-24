const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV == 'production';

const appDir = path.join(__dirname, 'scripts');
const assetsDir = path.join(__dirname, 'assets');
const stylesDir = path.join(__dirname, 'styles');

const config = {
  mode: isProd ? 'production' : 'development',

  entry: [
    path.join(appDir, 'app.js'),
    path.join(stylesDir, 'main.scss'),
  ],
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: isProd ? '[id].css' : '[id].[contenthash].css',
    publicPath: '/',
  },  

  devServer: {
    open: true,
    host: 'localhost',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: './assets/favicon',
          to: ''
        }
      ],
    }),    

    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProd ? '[id].css' : '[id].[contenthash].css'
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
  if (isProd) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }

  return config;
};
