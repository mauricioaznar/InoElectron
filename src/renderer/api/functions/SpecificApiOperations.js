import Vue from 'vue'
import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'

export function getMax (endpointName, columnName) {
  return Vue.http.get(endpointName + '/max?column=' + columnName).then(GenericApiOperations.getServerResponseData)
}

export function getStats (searchedStatsString) {
  return Vue.http.get('stats/' + searchedStatsString).then(GenericApiOperations.getServerResponseData)
}

export default {
  getMax: getMax,
  getStats: getStats
}
