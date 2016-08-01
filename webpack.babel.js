import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import qs from 'qs';
import autoprefixerStylus from 'autoprefixer-stylus';
import config from 'config';

const DEV_MODE = process.env.NODE_ENV !== 'production';

const APP = './app';
const MODULES = './modules';
const DEST = './public';

const GLOBALS = {
  process: {
    env: {
      CONFIG: JSON.stringify(config),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  },
};

const getStylusConfig = () => ({
  use: [
    autoprefixerStylus({
      browsers: [
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 2.3',
        'bb >= 10',
      ],
    }),
  ],
  import: ['~modules/utils/Colors.styl'],
  compress: true,
});

const extractCSS = new ExtractTextPlugin({
  filename: '[name]-[hash].css',
  allChunks: true
});

const vendorJS = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: '[name]-[hash].js',
});

const indexHTML = new HtmlWebpackPlugin({
  title: 'REACT APP STARTER',
  template: './index.jade',
});

const createCssLoaderWithStyleLoader = (test, loaders) => {
  if (test) {
    return ['style-loader'].concat(loaders).join('!');
  }
  return extractCSS.extract(loaders);
};

export default {
  context: path.join(__dirname, APP),

  entry: {
    vendor: [
      'react',
      'react-dom',
      'classnames',
    ],
    app: './index.js',
  },

  output: {
    path: path.join(__dirname, DEST),
    filename: '[name]-[hash].js',
  },

  module: {
    loaders: [
      {
        test: /_\.styl/,
        loader: createCssLoaderWithStyleLoader(DEV_MODE, [
          `css-loader?${qs.stringify({
            sourceMap: true,
            modules: true,
            importLoaders: 1,
            minimize: !DEV_MODE,
            localIdentName: DEV_MODE ? '[name]__[local]---[hash:base64:5]' : '[hash:base64:5]',
          })}`,
          'stylus-loader',
        ])
      },
      {
        test: /[^_]\.styl/,
        loader: createCssLoaderWithStyleLoader(DEV_MODE, [
          `css-loader?${qs.stringify({
            sourceMap: true,
            minimize: !DEV_MODE,
          })}`,
          'stylus-loader',
        ]),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          compact: true,
          presets: [
            'react',
            'es2015-webpack',
            '@morlay/babel-preset',
          ],
          plugins: DEV_MODE ? [
            'react-hot-loader/babel',
          ] : [],
        },
      },
      {
        test: /\.jade$/,
        loader: 'jade-loader',
      },
      {
        test: /\.i\.svg$/,
        loaders: [
          'svg2jsx',
          'simplify-svg/lib/loader',
        ],
      },
    ],
  },

  stylus: getStylusConfig(),

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'node_modules',
      __dirname,
    ],
    alias: {
      config: path.join(__dirname, MODULES, 'config/index.js'),
    },
  },

  plugins: [
    extractCSS,
    vendorJS,
    indexHTML,
    new webpack.DefinePlugin(GLOBALS),
    ...(
      DEV_MODE ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
          output: {
            comments: false
          },
          sourceMap: false
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
      ]
    ),
  ]
};
