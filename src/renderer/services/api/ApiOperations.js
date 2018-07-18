import Vue from 'vue'
import {getHeaders} from 'renderer/services/api/ApiHTPPHeaders'
import ApiUrls from 'renderer/services/api/ApiUrls'
import ApiDomain from 'renderer/services/api/ApiDomain'

export function get (entityType) {
  return Vue.http.get(ApiUrls.createListUrl(entityType), {headers: getHeaders()}).then(getServerResponseData)
}

export function getWithoutPagination (entityType, filterName, filterValue) {
  let filterNameQueryString = filterName ? '&' + filterName : ''
  let filterValueQueryString = filterValue ? '&' + filterValue : ''
  return Vue.http.get(ApiUrls.createListUrl(entityType) + '?paginate=false' + filterNameQueryString + filterValueQueryString, {headers: getHeaders()}).then(getServerResponseData)
}

export function getWithFilterExact (entityType, filterName, filterValue) {
  return Vue.http.get(ApiUrls.createListUrl(entityType) + '?paginate=false' + '&filter_exact=' + filterName + '&filter_exact_value=' + filterValue, {headers: getHeaders()}).then(getServerResponseData)
}

export function getById (entityType, id) {
  return Vue.http.get(ApiUrls.createBaseUrl(entityType) + '/' + id, {headers: getHeaders()}).then(getServerResponseData)
}

export function getMax (entityType, columnName) {
  return Vue.http.get(ApiUrls.createBaseUrl(entityType) + '/max?column=' + columnName, {headers: getHeaders()}).then(getServerResponseData)
}

export function getMe () {
  return Vue.http.get(ApiDomain + 'auth/user', {headers: getHeaders()}).then(getServerResponseData)
}

export function edit (entityType, id, object) { // TODO mauedit
  return Vue.http.put(ApiUrls.createBaseUrl(entityType) + '/' + id, object, {headers: getHeaders()}).then(getServerResponseData)
}

export function create (entityType, object) { // TODO maucreate
  return Vue.http.post(ApiUrls.createBaseUrl(entityType), object, {headers: getHeaders()}).then(getServerResponseData)
}

export function generateToken (credentials) {
  return Vue.http.post(ApiDomain + 'auth/login', credentials, {headers: getHeaders()}).then(getServerResponseData)
}

export function del (entityType, id, object) {
  object.active = -1
  return Vue.http.put(ApiUrls.createBaseUrl(entityType) + '/' + id, object, {headers: getHeaders()}).then(getServerResponseData)
}

function getServerResponseData (response) {
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
  getById: getById,
  get: get,
  getWithoutPagination: getWithoutPagination,
  edit: edit,
  create: create,
  del: del,
  getWithFilterExact: getWithFilterExact,
  getMe: getMe,
  generateToken: generateToken,
  getMax: getMax
}
