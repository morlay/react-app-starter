import HtmlWebpackPlugin from 'html-webpack-plugin';

const getConfigForHTML = () => {
  const renderIndexHTML = new HtmlWebpackPlugin({
    title: 'REACT APP STARTER',
    template: './index.html',
  });

  return ({
    plugins: [
      renderIndexHTML,
    ],
  });
};

export default getConfigForHTML;
