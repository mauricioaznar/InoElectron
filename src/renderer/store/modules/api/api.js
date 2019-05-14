// import Vue from 'vue'
// import {getAuthorizationHeaders} from 'renderer/config'
import auth from 'renderer/api/store/auth'
import entity from 'renderer/api/store/entity'
import routeObject from 'renderer/api/store/routeObject'
import * as getters from 'renderer/api/store/apiGetters'



export default {
  modules: {
    auth,
    entity,
    routeObject
  },
  state: {},
  mutations: {},
  getters
}
