import React from 'react'
import { connect } from 'react-redux'

import localStorage from 'app/utils/localStorage'
import StickyBottomNav from 'app/components/StickyBottomNav'
import UserActions from 'app/actions/UserActions'

require('scss/containers/App')

const App = React.createClass({
  componentDidMount() {
    let { dispatch } = this.props

    let email = localStorage.get('email')

    if (email) {
      dispatch(UserActions.setEmail(email))
    }
  },
  render() {
    return (
      <div id="App" className="App">
        {React.cloneElement(this.props.children)}
        <StickyBottomNav />
      </div>
    )
  }
})

export default connect()(App)