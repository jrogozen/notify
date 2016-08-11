import _ from 'lodash'

const stringConstants = {

}

const dispatchConstants = {
  'SET_EMAIL': 'SET_EMAIL'
}

const valueConstants = {
  DEFAULT_PORT: 8080,
  API_TARGET_DEV: 'http://localhost',
  API_TARGET_PROD: ''
}

const constants = _.assign({}, stringConstants, dispatchConstants, valueConstants)

export default constants