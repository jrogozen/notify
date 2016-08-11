import React from 'react'

const InvitationEmail = React.createClass({
  getDefaultProps() {
    return {
      from: '',
      to: '',
      eventId: null
    }
  },
  render() {
    let { eventId, to, from } = this.props
    let baseUrl = `http://localhost:8080/api/events/rsvp?eventId=${eventId}&email=${to}`

    return (
      <div style={{ 'padding': '20px', 'background': 'white', 'textAlign': 'center' }} className="InvitationEmail">
        <h1>Yo {to}, You've Been Invited!</h1>
        <p style={{ 'margin': '30px 0' }}>
          {from} has invited you to an event!
        </p>
        <div style={{ margin: '40px 0' }} className="button-group">
          <a
            style={{
              'border': '2px solid #4099FF',
              'borderRadius': '5px',
              'background': '#4099FF',
              'color': 'white',
              'padding': '10px 20px',
              'fontSize': '18px',
              'margin': '0 15px',
              'cursor': 'pointer',
              'textDecoration': 'none'
            }}
            href={baseUrl + '&attending=true'}
          >
            Accept
          </a>
          <a
            style={{
              'border': '2px solid #4099FF',
              'borderRadius': '5px',
              'background': 'white',
              'color': '#C9382B',
              'padding': '10px 20px',
              'fontSize': '14px',
              'margin': '0 15px',
              'cursor': 'pointer',
              'textDecoration': 'none'
            }}
            href={baseUrl + '&attending=false'}>
              Decline
            </a>
        </div>
      </div>
    )
  }
})

export default InvitationEmail