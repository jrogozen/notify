import React from 'react'
import { connect } from 'react-redux'

const EventsList = React.createClass({
  statics: {
    serverRouteWillMount(reactContext) {
    }
  },
  render() {
    return (
      <div className="EventsList container">
        Events List
      </div>
    )
  }
})

export default connect()(EventsList)