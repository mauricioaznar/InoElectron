import Vue from 'vue'
import {getHeaders} from 'renderer/api/functions/ApiHTPPHeaders'
import ApiUrls from 'renderer/api/functions/ApiUrls'
import ApiDomain from 'renderer/api/functions/ApiDomain'
import FilterHelper from 'renderer/api/functions/FilterHelper'

export function getWithFilterLike (entityType) {
  return Vue.http.get(ApiUrls.createListUrl(entityType), {headers: getHeaders()}).then(getServerResponseData)
}

export function getWithFilterLikeWithoutPagination (entityType, filterLikeObject) {
  let filterLikeQuery = FilterHelper.filterLikeQueryCreator(filterLikeObject)
  return Vue.http.get(ApiUrls.createListUrl(entityType) + '?paginate=false' + filterLikeQuery, {headers: getHeaders()}).then(getServerResponseData)
}

export function getWithFilterExactWithoutPagination (entityType, filterExactObject) {
  let filterExactQuery = FilterHelper.filterExactQueryCreator(filterExactObject)
  return Vue.http.get(ApiUrls.createListUrl(entityType) + '?paginate=false' + filterExactQuery, {headers: getHeaders()}).then(getServerResponseData)
}

export function getWithFilterLikeWithFilterExactWithoutPagination (entityType, filterLikeObject, filterExactObject) {
  let extraQuery = '?paginate=false'
  let filterExactQuery = FilterHelper.filterExactQueryCreator(filterExactObject)
  let filterLikeQuery = FilterHelper.filterLikeQueryCreator(filterLikeObject)
  return Vue.http.get(ApiUrls.createListUrl(entityType) + extraQuery + filterExactQuery + filterLikeQuery, {headers: getHeaders()}).then(getServerResponseData)
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

export function edit (entityType, id, object) {
  return Vue.http.put(ApiUrls.createBaseUrl(entityType) + '/' + id, object, {headers: getHeaders()}).then(getServerResponseData)
}

export function create (entityType, object) {
  return Vue.http.post(ApiUrls.createBaseUrl(entityType), object, {headers: getHeaders()}).then(getServerResponseData)
}

export function generateToken (credentials) {
  return Vue.http.post(ApiDomain + 'auth/login', credentials, {headers: getHeaders()}).then(getServerResponseData)
}

export function donwnloadExcel () {
  return Vue.http.get(ApiDomain + 'downloads/excel').then(getServerResponseData)
}

export function getStats (searchedStatsString) {
  return Vue.http.get(ApiDomain + 'stats/' + searchedStatsString, {headers: getHeaders()}).then(getServerResponseData)
}

export function del (entityType, id) {
  let object = {
    active: -1
  }
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
  edit: edit,
  create: create,
  del: del,
  getWithFilterLike: getWithFilterLike,
  getWithoutPagination: getWithFilterLikeWithoutPagination,
  getWithFilterExactWithoutPagination: getWithFilterExactWithoutPagination,
  getWithFilterLikeWithFilterExactWithoutPagination: getWithFilterLikeWithFilterExactWithoutPagination,
  getMe: getMe,
  generateToken: generateToken,
  getMax: getMax,
  getStats: getStats,
  downloadExcel: donwnloadExcel
}
