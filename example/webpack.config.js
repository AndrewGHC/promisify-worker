import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';
import FilterChunkWebpackPlugin from 'filter-chunk-webpack-plugin';
import path from 'path';

export default {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  context: path.resolve(__dirname),
  entry: './index',
  output: {
    path: `${__dirname}/../docs`,
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.template.html',
      inject: true,
      inlineSource: '.js$',
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new FilterChunkWebpackPlugin({
      patterns: [
        '*.js',
      ],
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            inline: true,
          },
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
};
