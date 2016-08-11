import React from 'react'
import { connect } from 'react-redux'

import InviteWrapper from 'app/components/Invite/InviteWrapper'

const NewEvent = React.createClass({
  statics: {
    serverRouteWillMount(reactContext) {
    }
  },
  render() {
    return (
      <div className="NewEvent container">
        <InviteWrapper />
      </div>
    )
  }
})

export default connect()(NewEvent)