import EntityTypes from 'renderer/api/EntityTypes'
import RolesTypes from 'renderer/api/RoleTypes'
import EntityActions from './entityActions'
import ApiFunctions from 'renderer/api/functions/GenericApiOperations'

let roles = []
Object.keys(RolesTypes).forEach(key => {
  let roleStoreObj = {id: RolesTypes[key].id, name: RolesTypes[key].name, value: RolesTypes[key].title}
  roles.push(roleStoreObj)
})

const state = {
  packings: [],
  products: [],
  users: [],
  roles: roles
}

const mutations = {
  SET_PRODUCTS (state, data) {
    state.products = data
  },
  SET_PACKINGS (state, data) {
    state.packings = data
  },
  SET_USERS (state, data) {
    state.users = data
  }
}

const actions = {
  [EntityActions.GET_PACKINGS]: function ({commit}) {
    ApiFunctions.list(EntityTypes.PACKING.apiName, {paginate: false}).then(data => {
      commit('SET_PACKINGS', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_PRODUCTS]: function ({commit}) {
    ApiFunctions.list(EntityTypes.PRODUCT.apiName, {paginate: false}).then(data => {
      commit('SET_PRODUCTS', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_USERS]: function ({commit}) {
    ApiFunctions.list(EntityTypes.USER.apiName, {paginate: false}).then(data => {
      commit('SET_USERS', data)
    }).catch(e => {
      console.log(e)
    })
  }
}


export default {
  state, mutations, actions
}
