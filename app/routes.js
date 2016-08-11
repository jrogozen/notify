import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'app/containers/App'
import FrontPage from 'app/containers/FrontPage'
import NewEvent from 'app/containers/NewEvent'
import EventsList from 'app/containers/EventsList'
import paths from 'config/paths'

module.exports = (
  <Route component={App} path="/">
    <IndexRoute component={FrontPage} />
    <Route component={NewEvent} path={paths.NEW_EVENT} />
    <Route component={EventsList} path={paths.LIST_EVENTS} />
  </Route>
)