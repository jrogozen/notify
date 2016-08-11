import constants from 'config/constants'

const initState = () => ({
  email: ''
})

const users = (state = initState(), action = {}) => {
  let { payload, type } = action

  switch (type) {
    case constants.SET_EMAIL:
      return { ... state, 
        email: payload
      }
    default:
      return state
  }
}

export default users