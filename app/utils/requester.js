require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'

import { formatEndpoint } from 'app/utils/apiUtils'

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    console.log('API Request Failed', response)

    throw new Error(response.statusText)
  }
}

const parseJSON = (response) => {
  return response.json()
}

const requester = (options) => {
  const { method, path, queryParams, body, external } = options

  if (external) {
    console.log('writing an external api request!', path)
    return fetch(path, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((err) => err)
  } else {
    return fetch(formatEndpoint(path, queryParams), {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((err) => err)
  }

}

export default requester