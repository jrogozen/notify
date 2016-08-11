import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import api from './api'
import renderer from './middleware/renderer'

const app = express()
const webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.config.dev-client.js')
const compiler = webpack(webpackConfig)

const DEBUG = process.env.NODE_ENV !== 'production'

if (process.env.SEED) {
  require('./seed')
}

app.set('env', DEBUG ? 'development' : 'production')
app.set('port', process.env.PORT || 8080)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  lazy: false,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  },
  publicPath: webpackConfig.output.publicPath
}))

app.use(morgan('dev'))

app.use('/api', api)
app.use('/', express.static(path.resolve(__dirname, '../public')))
app.use(renderer)

app.listen(app.get('port'), () => {
  console.info(`app running in ${app.get('env')} on port ${app.get('port')}`)
})