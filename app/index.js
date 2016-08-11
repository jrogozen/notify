import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

import App from './containers/App'
import configureStore from './configureStore'
import rootReducer from './reducers'
import routes from './routes'

import sw from './utils/swUtils'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)

window.store = store
window.router = {
    redirectTo(t) {
        return browserHistory.replace(t);
    },
    transitionTo: function(t) {
        let currentState = _.assign({}, history.state, {
            scrollTop: document.body.scrollTop
        });

        history.replaceState(currentState, document.title, window.location.href);
        return browserHistory.push(t);
    }
};

try {
  sw.register()
} catch(err) {
  console.log('oops', err)
}

function createElement(Component, props) {
  props = _.assign(props, {
    store
  })

  return <Component {...props} />
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} createElement={createElement}/>
  </Provider>,
  document.getElementById('root')
)