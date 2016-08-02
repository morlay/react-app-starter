import webpack from 'webpack';
import config from 'config';

const {
  DefinePlugin,
  optimize: {
    AggressiveMergingPlugin,
    DedupePlugin,
    UglifyJsPlugin,
    CommonsChunkPlugin,
  },
} = webpack;

const GLOBALS = {
  process: {
    env: {
      CONFIG: JSON.stringify(config),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  },
};

const VENDORS = [
  'classnames',
];

const getConfigForJS = (isProd) => {
  const exposeVendorJS = new CommonsChunkPlugin({
    name: 'vendor',
  });

  const replaceGlobals = new DefinePlugin(GLOBALS);

  return ({
    entry: {
      vendor: VENDORS,
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: [
              'es2015-webpack',
              '@morlay/babel-preset',
              'react',
            ],
            plugins: isProd ? [] : [
              'react-hot-loader/babel',
            ],
          },
        },
      ],
    },

    plugins: [
      replaceGlobals,
      exposeVendorJS,
      ...(isProd ? [
        new UglifyJsPlugin({
          compress: {
            warnings: false,
          },
          output: {
            comments: false,
          },
          sourceMap: false,
        }),

        new DedupePlugin(),
        new AggressiveMergingPlugin(),
      ] : []),
    ],
  });
};

export default getConfigForJS;
