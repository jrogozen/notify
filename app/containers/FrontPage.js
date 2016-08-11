import React from 'react'
import { connect } from 'react-redux'

import InviteWrapper from 'app/components/Invite/InviteWrapper'
import Welcome from 'app/components/Welcome'

const FrontPage = React.createClass({
  statics: {
    serverRouteWillMount(reactContext) {
    }
  },
  render() {
    return (
      <div className="FrontPage container">
        <Welcome />
      </div>
    )
  }
})

export default connect()(FrontPage)