const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
  entry: ['babel-polyfill', './entry/index.ts'],
  output: {
    path: path.resolve(__dirname, '../../www'),
    chunkFilename: '[name].bundle-[chunkhash:4].js',
    filename: '[name].bundle-[chunkhash:4].js'
  },

  mode: 'production',
  devtool: 'source-map',
  devServer: {
        stats: 'errors-only',
        port: 9000,
        publicPath: "/",
        historyApiFallback: true,
        disableHostCheck: true
    },

  plugins: [
    new CleanWebpackPlugin('../../www', {
      allowExternal: true,
      root: __dirname,
      verbose: true,
      dry: false
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './entry/index.html'
    }),

    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: ['vendor.js']
    }),

    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: {
        optimizationLevel: 3
      },

      pngquant: {
        quality: '65-90',
        speed: 4
      },

      jpegtran: {
        progressive: true
      },

      gifsicle: {
        optimizationLevel: 3
      },

      svgo: {
        plugins: [{
          removeViewBox: false,
          removeEmptyAttrs: true
        }]
      },

      plugins: [
        imageminMozjpeg({
          quality: 65,
          progressive: true
        })
      ]
    })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
        query: {
          compact: false
        }
      },

      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },

      {
        test: /\.(css)$/i,
        loader: ['style-loader', 'css-loader']
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },

          {
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true
            }
          },

          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['ie >= 8', 'last 4 version']
                })
              ],
              sourceMap: true
            }
          },

          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        // loader: 'file-loader',
        loader: 'url-loader?limit=1000&name=images/[hash].[ext]',
        options: {
          name: 'img/[name]-[hash:4].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name]-[hash:4].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader?limit=10000',
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    }
  },

  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx'],
  }
};
