import _ from 'lodash'
import constants from 'config/constants'

export const stringify = (obj) => {
  let str = []

  _.forEach(obj, (v, k) => {
    str.push(encodeURIComponent((k)) + '=' + encodeURIComponent(v))
  })

  if (str.length > 0) {
    return `?${str.join('&')}`
  } else {
    return ''
  }
}

export const formatEndpoint = (path, queryParams) => {
  if (queryParams) {
    path = path + stringify(queryParams)
  }

  if (typeof window === 'undefined') {
    let port = process.env.PORT || constants.DEFAULT_PORT
    let apiTarget

    if (__DEV__) {
      apiTarget = constants.API_TARGET_DEV
    } else {
      apiTarget = constants.API_TARGET_PROD
    }

    return `${apiTarget}:${port}/${path}`
  } else {
    return `${window.location.protocol}//${window.location.host}/${path}`
  }
}