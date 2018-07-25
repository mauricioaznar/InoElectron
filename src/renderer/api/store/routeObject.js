import Routes from 'renderer/api/RouteObjects'

const state = {
  routeObjects: []
}

Routes.forEach(routesObj => {
  state.routeObjects.push(routesObj)
})

const mutations = {
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
