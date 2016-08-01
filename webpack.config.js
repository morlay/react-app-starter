/* eslint global-require: 0 */

process.env.BABEL_ENV = 'node';
require('babel-register');
module.exports = require('./tools/webpack').default;
