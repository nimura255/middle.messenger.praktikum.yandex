const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
  entry: path.resolve(rootDir, 'src', 'index.ts'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(rootDir, 'dist'),
    clean: true,
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      $api: path.resolve(rootDir, 'src', 'api'),
      $app: path.resolve(rootDir, 'src', 'app'),
      $components: path.resolve(rootDir, 'src', 'components'),
      $constants: path.resolve(rootDir, 'src', 'constants'),
      $controllers: path.resolve(rootDir, 'src', 'controllers'),
      $core: path.resolve(rootDir, 'src', 'core'),
      $iconsTemplates: path.resolve(rootDir, 'src', 'iconsTemplates'),
      $layouts: path.resolve(rootDir, 'src', 'layouts'),
      $pages: path.resolve(rootDir, 'src', 'pages'),
      $store: path.resolve(rootDir, 'src', 'store'),
      $utils: path.resolve(rootDir, 'src', 'utils'),
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(rootDir, 'tsconfig.json'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, 'src', 'index.html'),
      inject: 'body',
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
  ],
};
