/* eslint-disable */
import autoprefixer from 'autoprefixer'
import precss from 'precss'
import ExtractTextPlugin from 'extract-text-webpack-plugin'


import Clean from 'clean-webpack-plugin'
import path from 'path'
import webpack from 'webpack'


import HtmlWebpackPlugin from 'html-webpack-plugin'

import StringReplacePlugin from 'string-replace-webpack-plugin'
import Immutable from 'immutable'

const Im = Immutable.fromJS

const production = process.env.NODE_ENV === 'production'
const build = process.env.BUILD_ENV === 'build'

const staticPath = '/static/adminfrontend/'


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
    ]
  })
  static output = Im(
    {
      path: path.join(__dirname, '.' + staticPath),
      pathInfo: true,
      publicPath: staticPath,
      chunkFilename: '[name].js'
    })

  static eslint = Im({
    configFile: './linting/prod.yaml'
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
        include: path.join(__dirname, 'src')
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
    modules_directories: ['./src', 'node_modules']
  })

  static plugins = Im([
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
    contentBase: '.',
    __webpack_public_path__: 'http://localhost:8888',
    hot: true,
    publicPath: 'http://localhost:8888/build/',
    port: 8888,
    host: 'localhost',
    inline: true,
    quiet: false,
    noInfo: false,
    https: true,
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

  static __webpack_public_path__ = 'http://localhost:8888'

  static debug = true
  static devtool = 'source-map'
  static entry = WebPackConfig.entry.set('main', Im([
    'webpack/hot/dev-server',
    './src/index.js'
  ]))

  static output = Im({
    path: path.join(__dirname, 'build'),
    publicPath: 'http://localhost:8888/build/',
    filename: '[name].js'
  })

  static eslint = Im({
    configFile: './linting/dev.yaml'
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
          STATIC_PATH: JSON.stringify('http://localhost:8888/build/'),
          DEBUG: JSON.stringify(process.env.DEBUG),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),]
  ))
}

class ProductionBuild extends WebPackConfig {
  static plugins = WebPackConfig.plugins.concat(Im([
      new webpack.DefinePlugin({
        'process.env': {
          STATIC_PATH: JSON.stringify(staticPath),
          DEBUG: JSON.stringify(process.env.DEBUG),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new Clean(['./static']),
      new Clean(['./build']),
      new ExtractTextPlugin('styles/app.css', {
        allChunks: true
      }),
      new webpack.optimize.DedupePlugin(),
      new StringReplacePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        mangle: true,
        mangle: {
          except: ['require', 'export', '$super']
        },
        compress: {
          warnings: false,
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true
        }
      }),
      new HtmlWebpackPlugin({
        filename: './build/index.html',
        template: './src/index_prod.html',
        minify: {
            // TODO check when preparing for prod
        }})
    ])
  )

  static module = WebPackConfig.module.set('loaders',
    WebPackConfig.module.get('loaders').push(
      Im(
        { test: /\.(js|styl)$/, loader:
          StringReplacePlugin.replace({
            replacements: [
              { pattern: /(['"])\/static\//g,
                replacement: function(match, p1) {
                  return p1 + staticPath
                }
              } ] })
        })
    )
  )

  static bail = true
  static debug = true
  static profile = true
  static output = WebPackConfig.output.set(
    'pathInfo', false).set(
    'filename', '[name].js').set(
    'chunkFilename', '[id].js'
  )
  static devtool = '#source-map'

}

let config
if (production) {
  config = new ProductionBuild().buildConfig()
} else {
  config = new DevBuild().buildConfig()
}

module.exports = config
