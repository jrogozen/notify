import requester from 'app/utils/requester'

const api = {
  event: {
    create({ email, name, type, users, startTime }) {
      let path = 'api/events'

      return requester({
        method: 'post',
        path,
        body: {
          owner: email,
          name,
          type,
          users,
          startTime
        }
      })
    }
  }
}

export default api