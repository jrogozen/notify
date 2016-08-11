const localStorage = {
  set(key, value) {
    if (typeof window !== 'undefined') {
      return window.localStorage.setItem(key, JSON.stringify(value))
    }
  },
  get(key) {
    if (typeof window !== 'undefined') {
      return JSON.parse(window.localStorage.getItem(key) || null)
    }
  }
}

export default localStorage