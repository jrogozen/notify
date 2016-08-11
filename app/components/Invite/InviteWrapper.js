import React from 'react'
import { connect } from 'react-redux'

import InviteInit from './InviteInit'
import InviteAddRecipients from './InviteAddRecipients'
import InviteSuccess from './InviteSuccess'

const scenes = {
  'INIT': 'INIT',
  'ADD_RECIPIENTS': 'ADD_RECIPIENTS',
  'SUCCESS': 'SUCCESS'
}

const InviteWrapper = React.createClass({
  getDefaultProps() {
    return {

    }
  },
  getInitialState() {
    return {
      currentScene: this.getFirstScene()
    }
  },
  getFirstScene() {
    let { email } = this.props

    if (email) {
      return scenes.ADD_RECIPIENTS
    } else {
      return scenes.INIT
    }
  },
  setCurrentScene(scene = scenes.INIT) {
    this.setState({ currentScene: scene })
  },
  renderCurrentScene() {
    let { email } = this.props
    let { currentScene } = this.state

    if (currentScene === scenes.INIT && !email) {
      return (
        <InviteInit
          handleChangeScene={() => {
            this.setCurrentScene(scenes.ADD_RECIPIENTS)
          }}
        />
      )
    } else if (currentScene === scenes.ADD_RECIPIENTS || (currentScene == scenes.INIT && email)) {
      return (
        <InviteAddRecipients
          handleChangeScene={() => {
            this.setCurrentScene(scenes.SUCCESS)
          }}
        />
      )
    } else if (currentScene === scenes.SUCCESS) {
      return (
        <InviteSuccess
          handleChangeScene={() => {
            this.setCurrentScene(scenes.INIT)
          }}
        />
      )
    } else {
      return (
        <InviteInit
          handleChangeScene={() => {
            this.setCurrentScene(scenes.ADD_RECIPIENTS)
          }}
        />
      )
    }
  },
  render() {
    return this.renderCurrentScene()
  }
})

const mapStateToProps = (state) => ({
  email: state.user.email
})

export default connect(mapStateToProps)(InviteWrapper)