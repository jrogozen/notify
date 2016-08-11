import React from 'react'
import { connect } from 'react-redux'

import paths from 'config/paths'
import RouteActions from 'app/actions/RouteActions'

require('scss/components/StickyBottomNav')

const StickyBottomNav = React.createClass({
  handleNewClick() {
    let { dispatch } = this.props

    dispatch(RouteActions.to(paths.NEW_EVENT))
  },
  handleListClick() {
    let { dispatch } = this.props

    dispatch(RouteActions.to(paths.LIST_EVENTS))
  },
  render() {
    return (
      <div className="StickyBottomNav">
        <div onClick={this.handleNewClick} className="stickybottomnav-left-pane">
          <span>New</span>
        </div>
        <div onClick={this.handleListClick} className="stickybottomnav-right-pane">
          <span>List</span>
        </div>
      </div>
    )
  }
})

export default connect()(StickyBottomNav)