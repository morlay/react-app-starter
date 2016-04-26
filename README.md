## REACT APP STARTER

* [Webpack](https://webpack.github.io)
  - [CSS modules](https://github.com/outpunk/postcss-modules)
* [Babel](https://babeljs.io/)
* [React](https://facebook.github.io/react/)
* [Stylus](https://github.com/stylus/stylus)
  - [Autoprefixer-stylus](https://github.com/jenius/autoprefixer-stylus)


### Special Rules

#### Stylus

* `Module.styl` will be pure css, sometimes we don't need `css-modules`, like using third part lib.
* `Module_.styl` will use `css-modules`, so we could `import Module_ from Module_.styl`;
