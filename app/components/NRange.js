import React from 'react'

require('scss/components/NRange')

const NRange = React.createClass({
  getDefaultProps() {
    return {
      'append': null
    }
  },
  render() {
    let { append, max, min, step, handleChange, value } = this.props

    return (
      <div className="NRange">
        <input
          type="range"
          value={value}
          max={max}
          min={min}
          step={step}
          onChange={handleChange}
        />
        <div className="current">{value}{append}</div>
      </div>
    )
  }
})

export default NRange