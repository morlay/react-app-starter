process.env.BABEL_ENV = 'node';
require('babel-register');
module.exports = require('./webpack.babel').default;