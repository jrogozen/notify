const RouteActions = {
  to(path) {
    return () => {
      window.router.transitionTo(path)
    }
  }
}

export default RouteActions