import Vue from 'vue'
import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'

export function list (entityEndpointName, options) {
  let url = GenericApiUrls.createListUrl(entityEndpointName, options)
  return Vue.http.get(url).then(getServerResponseData)
}

export function getById (entityEndpointName, id) {
  let url = GenericApiUrls.createEntityIdUrl(entityEndpointName, id)
  return Vue.http.get(url).then(getServerResponseData)
}

export function edit (endpointName, id, object) {
  return Vue.http.put(GenericApiUrls.createEntityIdUrl(endpointName, id), object).then(getServerResponseData)
}

export function create (endpointName, object) {
  return Vue.http.post(endpointName, object).then(getServerResponseData)
}

export function del (endpointName, id) {
  let object = {
    active: -1
  }
  return Vue.http.put(endpointName + '/' + id, object).then(getServerResponseData)
}

export function generateToken (email, password) {
  let credentials = {email: email, password: password}
  return Vue.http.post('auth/login', credentials).then(getServerResponseData)
}

export function getCurrentUser () {
  return Vue.http.get('auth/user').then(getServerResponseData)
}

export function getServerResponseData (response) {
  let responseDataData = (((response) && response.data) && response.data.data)
  if (!responseDataData) {
    return null
  }
  return responseDataData
}

export function catchError (e) {
  console.log('error')
  return e
}

export default {
  list: list,
  getById: getById,
  edit: edit,
  create: create,
  del: del,
  generateToken: generateToken,
  getCurrentUser: getCurrentUser,
  getServerResponseData: getServerResponseData
}
