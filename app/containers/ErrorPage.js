import React from 'react'

const ErrorPage = React.createClass({
  propTypes: {
    error: React.PropTypes.object
  },
  getDefaultProps() {
    return {
      error: {}
    }
  },
  render() {
    return (
      <html>
        <head>
          <title>Notify</title>
        </head>
        <body>
          <div>
            <h1>Errrrrrooooooooooooorrrrrrr</h1>
            <pre>
              {this.props.error.stack}
            </pre>
          </div>
        </body>
      </html>
    )
  }
})

export default ErrorPage