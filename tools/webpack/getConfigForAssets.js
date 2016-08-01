const getConfigForAssets = () => ({
  module: {
    loaders: [
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=8192',
      },
      {
        test: /\.svg$/,
        loaders: [
          'svg2jsx',
          'simplify-svg/lib/loader',
        ],
      },
    ],
  },
});


export default getConfigForAssets;
