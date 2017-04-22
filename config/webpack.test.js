var helpers = require('./helpers');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts'
      },
      {
        test: /\.html$/,
        loader: 'html'

      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null'
      },
      { 
        test: /\.(json)$/,
        loader: 'file?name=i18n/[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'null'
      },
      {
        test: /\.scss$/,
        loader: 'null'
      }
    ]
  },

  sassLoader: {
    includePaths: [require('node-bourbon').includePaths, helpers.root('src', 'public', 'css')]
  }
}