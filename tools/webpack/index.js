import path from 'path';
import _ from 'lodash';

import getConfigForCSS from './getConfigForCSS';
import getConfigForAssets from './getConfigForAssets';
import getConfigForHtml from './getConfigForHtml';
import getConfigForJS from './getConfigForJS';

const isProd = process.env.NODE_ENV === 'production';

const mergeWebpackConfig = (object, src) => _.mergeWith(object, src, (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return undefined;
});

export default _.reduce([
  getConfigForHtml,
  getConfigForJS,
  getConfigForCSS,
  getConfigForAssets,
], (finalWebpackConfig, getConfig) => mergeWebpackConfig(finalWebpackConfig, getConfig(isProd)), {
  context: path.join(process.cwd(), 'app'),

  entry: {
    app: './index.js',
  },

  resolve: {
    extensions: ['', '.js'],
    modules: [
      'node_modules',
      process.cwd(),
    ],
  },

  output: {
    path: path.join(process.cwd(), 'public'),
    filename: '[name]-[hash].js',
  },

  devtool: isProd ? false : 'eval-source-map',
});
