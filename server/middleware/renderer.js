import _ from 'lodash'
import chalk from 'chalk'
import qs from 'qs'
import React from 'react'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import configureStore from 'app/configureStore'
import routes from 'app/routes'
import rootReducer from 'app/reducers'
import ErrorPage from 'app/containers/ErrorPage'

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>notify</title>
        <meta
          content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimal-ui"
          name="viewport"
        />
        <meta content="yes" name="apple-mobile-web-app-capable"/>
        <meta content="yes" name="mobile-web-app-capable"/>
        <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.min.css" />
        <link type="text/css" rel="stylesheet" href="/dist/style.css" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `
}

function handleRenderToString(store, renderProps) {
  function createElement(Component, props) {
    props = _.assign(props, {
      store
    })

    return <Component {...props} />
  }

  return renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} createElement={createElement} />
    </Provider>
  )
}

function renderer(req, res, next) {
  const params = qs.parse(req.query)

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const store = configureStore()

      let promises = []
      let reactContext = {
        store: store,
        location: renderProps.location
      }

      renderProps.components.forEach((route) => {
        if (route && route.serverRouteWillMount) {
          promises.push(route.serverRouteWillMount(reactContext))
        }
      })

      return Promise.all(_.flatten(promises))
        .then(() => {
          const html = handleRenderToString(store, renderProps)
          const finalState = store.getState()
          let renderedPage;

          try {
            renderedPage = renderFullPage(html, finalState)

            res.send(renderedPage)
          } catch(err) {
            throw new Error(err)
          }
        })
        .catch((err) => {
          res.send(renderToString(<ErrorPage error={err} />))
        })

    } else {
      res.status(404).send('Not found')
    }
  })
}

export default renderer