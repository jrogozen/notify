import React from 'react'
import { connect } from 'react-redux'

require('scss/components/Welcome')

const Welcome = React.createClass({
  getDefaultProps() {
    email: ''
  },
  render() {
    let { email } = this.props

    return (
      <div className="Welcome">
        <div className="welcome-message">
          Hi{email ? ',' : ''}
        </div>
        <div className="welcome-email">
          {email}
        </div>
        <div className="welcome-content">
          Click "New" to invite friends to a new event. "List" will show your existing events.
        </div>
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  email: state.user.email
})

export default connect(mapStateToProps)(Welcome)