import Vue from 'vue'
import Vuex from 'vuex'
import app from '../app/store/app'
import api from './modules/api/api'

import * as getters from 'renderer/app/store/getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  getters,
  modules: {
    app,
    api
  },
  state: {},
  mutations: {}
})

export default store
