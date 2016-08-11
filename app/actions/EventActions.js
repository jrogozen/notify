import constants from 'config/constants'
import api from 'app/utils/api'

const EventActions = {
  createEvent({ email, name, type, users, startTime }) {
    return () => {
      api.event.create({
        email,
        name,
        type,
        users: users.filter((u) => u).join(','),
        startTime
      });
    }
  },
  sendInvites({ }) {
    return (dispatch) => {

    }
  }
}

export default EventActions