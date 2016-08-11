import React from 'react'

const StatusEmail = React.createClass({
  getDefaultProps() {
    return {
      from: '',
      to: '',
      eventDetails: {}
    }
  },
  render() {
    let { eventDetails, to, from } = this.props

    return (
      <div style={{ 'padding': '20px', 'background': 'white', 'textAlign': 'center' }} className="StatusEmail">
        <h1>Your event is ready to go!</h1>
        <p style={{ 'margin': '30px 0' }}>
          Thanks for responding to {from}'s event
        </p>
        <div style={{ margin: '40px 0' }} className="button-group">
          <ul>
            {eventDetails.map((user) => {
              return (
                <li>{user.user_email} is {user.attending === 'true' ? 'attending :)' : 'not attending :('}</li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
})

export default StatusEmail