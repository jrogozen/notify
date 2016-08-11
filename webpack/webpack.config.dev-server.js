var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var assetsPath = path.join(__dirname, '..', 'dist');
var commonLoaders = [
  {
    test: /\.js$/,
    loader: 'babel',
    include: path.join(__dirname, '..'),
    exclude: path.join(__dirname, '..', 'node_modules')
  },
  { test: /\.json$/, loader: "json-loader" },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    loader: 'url',
    query: {
        name: '[hash].[ext]',
        limit: 10000,
    }
  }
];

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(__dirname, '..'),
    alias: {
      'config': 'config',
      'app': 'app',
      'server': 'server',
      'scss': 'scss',
      'images': 'images'
    },
    entry: {
      server: "./server"
    },
    node: {
      __dirname: true,
      __filename: true,
      console: true
    },
    target: "node",
    devtool: 'cheap-eval-source-map',
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "server.js",
      // The output path from the view of the Javascript
      publicPath: "/dist/",
      libraryTarget: "commonjs2"
    },
    externals: nodeModules,
    module: {
      loaders: commonLoaders.concat([
           {
              test: /\.scss$/,
              loader: 'css!postcss!resolve-url!sass?sourceMap'
           }
      ])
    },
    resolve: {
      root: [path.join(__dirname, '..')],
      extensions: ['', '.js', '.jsx', '.scss', '.json'],
    },
    postcss: function() {
        return [autoprefixer, cssnano];
    },
    plugins: [
        new webpack.DefinePlugin({
          __CLIENT__: false,
          __SERVER__: true,
          __DEV__: process.env.NODE_ENV === 'development'
        }),
        new webpack.IgnorePlugin(/vertx/)
    ]
};