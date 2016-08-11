import React from 'react'
import { connect } from 'react-redux'

import UserActions from 'app/actions/UserActions'

require('scss/components/Invite/InviteInit')

const InviteInit = React.createClass({
  getDefaultProps() {
    return {
      handleChangeScene: () => {}
    }
  },
  getInitialState() {
    let { user } = this.props

    return {
      email: user.email
    }
  },
  handleClick() {
    let { dispatch, handleChangeScene } = this.props

    // set user email in redux
    dispatch(UserActions.setEmail(this.state.email))

    // change scene
    handleChangeScene()
  },
  render() {
    let { email } = this.state

    return (
      <div className="InviteInit">
        <div className="inviteinit-subtitle">
          
        </div>
        <div className="inviteinit-form">
          <input
            type="text"
            value={email}
            onChange={(e) => {
              this.setState({
                email: e.target.value
              })
            }}
          />
          <button onClick={this.handleClick}>Start Event</button>
        </div>
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  user: state.user
})

module.exports = connect(mapStateToProps)(InviteInit)