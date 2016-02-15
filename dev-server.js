import browserSync from 'browser-sync';
import webpack from 'webpack';

import { argv } from 'yargs';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from './webpack.babel';

const getBrowserSyncConfig = () => {
  const fixedWebpackConfig = Object.assign({}, webpackConfig, {
    entry: Object.assign({}, webpackConfig.entry, {
      app: ['webpack-hot-middleware/client'].concat(webpackConfig.entry.app)
    }),
    plugins: [
      ...webpackConfig.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
  });

  const bundler = webpack(fixedWebpackConfig);

  const middleware = [
    webpackDevMiddleware(bundler, {
      publicPath: fixedWebpackConfig.output.publicPath,
      stats: fixedWebpackConfig.stats
    }),
    webpackHotMiddleware(bundler)
  ];

  return argv.proxy ? {
    proxy: {
      target: `127.0.0.1:8080`,
      middleware
    }
  } : {
    server: {
      notify: false,
      baseDir: fixedWebpackConfig.output.path,
      middleware
    },
    snippetOptions: {
      ignorePaths: 'index.html'
    },
    ui: {
      port: 9999
    }
  };
};

browserSync(getBrowserSyncConfig());

