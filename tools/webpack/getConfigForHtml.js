import HtmlWebpackPlugin from 'html-webpack-plugin';

const getConfigForHTML = () => {
  const renderIndexHTML = new HtmlWebpackPlugin({
    template: './index.html',
    filename: '../index.html',
    title: 'POLLUTION MONITOR',
  });

  return ({
    plugins: [
      renderIndexHTML,
    ],
  });
};

export default getConfigForHTML;
