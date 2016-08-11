import React from 'react'
import cx from 'classnames'

require('scss/components/NButton')

const NButton = React.createClass({
  getDefaultProps() {
    return {
      handleClick: () => {},
      disabled: false
    }
  },
  getCSS() {
    return cx({
      NButton: true,
      disabled: this.props.disabled
    })
  },
  render() {
    return (
      <button className={this.getCSS()} disabled={this.props.disabled} onClick={this.props.handleClick}>
        {this.props.children}
      </button>
    )
  }
})

export default NButton