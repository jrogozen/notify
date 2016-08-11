import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
// import DayPicker, { DateUtils } from 'react-day-picker'

import NButton from 'app/components/NButton'
import NRange from 'app/components/NRange'
import EventActions from 'app/actions/EventActions'
import localStorage from 'app/utils/localStorage'

// require('scss/components/DayPicker')
require('scss/components/Invite/InviteAddRecipients')

const InviteAddRecipients = React.createClass({
  getDefaultProps() {
    return {
      handleChangeScene: () => {}
    }
  },
  getInitialState() {
    return {
      recipients: ['', '', ''],
      // selectedDay: new Date(),
      selectedTime: 12
    }
  },
  handleAddClick(e) {
    let { recipients } = this.state
    let rList = [].concat(recipients)

    // target is input, parent is <li>
    let potentialTrigger = e.target.parentElement;

    if (recipients.length < 10
        && _.includes(potentialTrigger.classList, `recipient-list-id-${recipients.length - 1}`)) {

      rList.push('')
      this.setState({
        recipients: rList
      })
    }
  },
  handleSubmitClick() {
    let { dispatch, email, handleChangeScene } = this.props
    let { name, recipients, type, selectedDay, selectedTime } = this.state

    // make ajax request
    dispatch(EventActions.createEvent({
      email,
      name,
      type,
      users: recipients,
      startTime: new Date().setHours(selectedTime)
    }))

    // send invites out
    .then(() => {
      // dispatch(EventActions.sendInvites({
        // eventId:
      // }))
    })

    // set emails in localStorage for lookup
    localStorage.set('users', this.state.recipients.filter((recip) => recip))

    handleChangeScene()
  },
  // handleDayClick(e, day, { selected, disabled }) {
  //   if (disabled) {
  //     return;
  //   }

  //   if (selected) {
  //     this.setState({
  //       selectedDay: null
  //     })
  //   } else {
  //     this.setState({
  //       selectedDay: day
  //     })
  //   }
  // },
  handleRangeChange(e) {
    this.setState({
      selectedTime: e.target.value
    })
  },
  render() {
    let { handleChangeScene } = this.props
    let { recipients, selectedTime } = this.state
    let disabled = recipients.filter((r) => r).length < 1

    return (
      <div className="InviteAddRecipients">
        <div className="inviteaddrecipients-form">
          <div className="inviteaddrecipients-title">Who're you inviting?</div>
          <ul onClick={this.handleAddClick} className="inviteaddrecipients-list">
            {recipients.map((r, i) => {
              return (
                <li className={`recipient-list-id-${i}`} key={i}>
                  <input
                    type="text"
                    value={recipients[i]}
                    placeholder={i === 0 ? 'enter email...' : ''}
                    onChange={(e) => {
                      let rList = [].concat(recipients)

                      rList[i] = e.target.value

                      this.setState({
                        recipients: rList
                      })
                    }}
                  />
                </li>
              )
            })}
          </ul>

          <div className="inviteaddrecipients-title">When is it?</div>
          {/*<DayPicker
            initialMonth={ new Date(2016, new Date().getMonth()) }
            selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
            onDayClick={ this.handleDayClick }
          />*/}
          <div className="range-picker">
            <NRange
              append=":00 o'clock"
              min={1}
              max={24}
              step={1}
              value={selectedTime}
              handleChange={this.handleRangeChange}
            />
          </div>

          <div className="inviteaddrecipients-title disabled">Is it a meal?</div>

          <NButton
            disabled={disabled}
            handleClick={this.handleSubmitClick}
          >
            Send Invites
          </NButton>
        </div>
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  email: state.user.email
})

export default connect(mapStateToProps)(InviteAddRecipients)