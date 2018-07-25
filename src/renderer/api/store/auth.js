import authActions from './authActions'

const state = {
  user: null
}

const mutations = {
  SET_AUTH_USER (state, userObj) {
    state.user = userObj
  },
  UNSET_AUTH_USER (state) {
    state.user = null
  }
}

const actions = {
  [authActions.SET_USER] ({commit, dispatch}, user) {
    commit('SET_AUTH_USER', user)
  },
  [authActions.UNSET_USER] ({commit}) {
    return new Promise((resolve, reject) => {
      window.localStorage.removeItem('AccessToken')
      commit('UNSET_AUTH_USER')
      resolve(true)
    })
  }
}


export default {
  state, mutations, actions
}
