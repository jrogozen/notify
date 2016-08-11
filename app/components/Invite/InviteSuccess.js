import React from 'react'

const InviteSuccess = React.createClass({
  getDefaultProps() {
    return {
      handleChangeScene: () => {}
    }
  },
  render() {
    return (
      <div className="InviteSuccess">
        <h2>Yay!</h2>
        <div className="invite-success-subtitle">
          Invites are on their way and you'll be notified of the results
        </div>
        <div className="invite-success-content" onClick={this.props.handleChangeScene}>
          Go back
        </div>
      </div>
    )
  }
})

export default InviteSuccess