import constants from 'config/constants'
import localStorage from 'app/utils/localStorage'

const UserActions = {
  setEmail(email) {
    return (dispatch) => {
      localStorage.set('email', email)

      return dispatch({
        type: constants.SET_EMAIL,
        payload: email
      })
    }
  }
}

export default UserActions