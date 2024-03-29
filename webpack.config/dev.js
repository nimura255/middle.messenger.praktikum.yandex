module.exports = {
  mode: 'development',
  devServer: {
    port: 8000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.p?css/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
