function register() {
  if ('serviceWorker' in navigator) {
    console.log('registering service worker')

    navigator.serviceWorker.register('/serviceWorker.js', {scope: '/'})
    .then(function(reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope)

      return reg
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error)

      throw error
    });
  }
}

export default { register }