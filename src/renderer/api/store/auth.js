import {getHeaders} from 'renderer/services/api/ApiHTPPHeaders'
import Vue from 'vue'
import authActions from './authActions'
import {ApiRoutes} from 'renderer/api/ApiUrls'

const state = {
  user: null,
  token: ''
}

const mutations = {
  SET_AUTH_USER (state, userObj) {
    state.user = userObj
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  UNSET_AUTH_USER (state) {
    state.user = null
  }
}

const actions = {
  [authActions.GET_TOKEN] ({commit}, credentials) {
    return new Promise((resolve, reject) => {
      Vue.http.post(ApiRoutes.auth.token, credentials, {headers: getHeaders()}).then((response) => {
        if (response.status === 200) {
          let token = response.data.data.token
          commit('SET_TOKEN', token)
          window.localStorage.setItem('AccessToken', JSON.stringify(token))
          resolve(true)
        }
      })
    })
  },
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
