/* eslint-disable */
import autoprefixer from 'autoprefixer'
import precss from 'precss'
import ExtractTextPlugin from 'extract-text-webpack-plugin'


import Clean from 'clean-webpack-plugin'
import Copy from 'copy-webpack-plugin'
import path from 'path'
import webpack from 'webpack'


import HtmlWebpackPlugin from 'html-webpack-plugin'

import StringReplacePlugin from 'string-replace-webpack-plugin'
import Immutable from 'immutable'

const Im = Immutable.fromJS

const staticPath = '/build/'


class WebPackConfig {

  getStaticKeys() {
    let keys = Im(Object.keys(this.constructor))
    const ParentClass = this.__proto__.__proto__.constructor
    if (new ParentClass() instanceof WebPackConfig) {
      keys = keys.concat(Im(new ParentClass().getStaticKeys()))
    }
    return keys
  }

  buildConfig() {
    let config = {}
    const keys = this.getStaticKeys()
    Im(keys).forEach((key) => {
      let value = this.constructor[key]
      if (value instanceof Immutable.Map || value instanceof Immutable.List) {
        config[key] = value.toJS()
      }
      else {
        config[key] = value
      }
    })
    return config
  }

  static node = Im({ net: 'empty', tls: 'empty', dns: 'empty' })

  static target = 'web'
  static entry = Im({
    main: './src/index.js',
    vendor: [
      'babel-polyfill',
      'immutable',
      'react-dom',
      'clipboard'
    ],
    'console-rest-api': [ './button/api.js' ],
    'console-rest-visual': [ 'react-dom', './button/visual.js' ]
  })

  static output = Im(
    {
      path: path.join(__dirname, '../../', '.' + staticPath),
      pathInfo: true,
      publicPath: staticPath,
      chunkFilename: '[name].js',
      libraryTarget: 'umd'
    })

  static eslint = Im({
    configFile: path.join(__dirname, '../../', './linting/prod.yaml')
  })

  static module = Im({
    preLoaders: [
      { test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules|webpack/}
    ],

    loaders: [
      { test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader' },
      { test: /\.jsx?$/, loader: 'babel',
        exclude: /node_modules/,
        include: [
          path.join(__dirname, '../../', 'src'),
          path.join(__dirname, '../../', 'button')
        ]
      },
      {
        test: /\.(styl)$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!postcss-loader!stylus-loader'
        )
      },
      {
        test: /\.(css)$/,
        loader: "style-loader!css-loader"
      }
    ],
    noParse: /\.min\.js/
  })

  static resolve = Im({
    extentions: ['', '.js', '.jsx', '.styl', '.css'],
    modules_directories: ['./src', './button', 'node_modules' ]
  })

  static plugins = Im([
    new Copy([
        { from: './button/index.build.js', to: './console-rest.js' }
    ]),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    function() {
      this.plugin('done', function(stats) {
        if (stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf('--bail') !== -1) {
          for (let i = stats.compilation.errors.length - 1; i >= 0; i--) {
            let error = stats.compilation.errors[i]
            console.error(error.message)
          }
          process.exit(1);
        }
      })
    }
  ])

  static postcss = [autoprefixer()]
}


class DevBuild extends WebPackConfig {

  static devServer = Im({
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: './build',
    __webpack_public_path__: 'https://localhost:8888',
    hot: true,
    publicPath: 'https://localhost:8888/build/',
    port: 8888,
    host: 'localhost',
    inline: true,
    quiet: false,
    noInfo: false,
    https: true,
    progress: true,
    stats: {
      assets: true,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false
    },
    historyApiFallback: true
  })

  static __webpack_public_path__ = 'https://localhost:8888'

  static debug = true
  static devtool = 'source-map'

  static output = Im({
    path: path.join(__dirname, 'build'),
    publicPath: 'https://localhost:8888/build/',
    filename: '[name].js',
    libraryTarget: 'umd'
  })

  static eslint = Im({
    configFile: path.join(__dirname, '../../', './linting/dev.yaml')
  })

  /* eslint-disable  max-len */
  static module = WebPackConfig.module.setIn(['loaders', 1, 'loaders'],
    Im(['react-hot', 'babel-loader'])).setIn(['loaders', 2, 'loader'],
    'style-loader!css-loader!postcss-loader!stylus-loader')
  /* eslint-enable */

  static plugins = WebPackConfig.plugins.concat(Im(
    [new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          STATIC_PATH: JSON.stringify('https://localhost:8888/build/'),
          DEBUG: JSON.stringify(process.env.DEBUG),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),]
  ))
}

let config = new DevBuild().buildConfig()

module.exports = config
