import ApiDomain from 'renderer/services/api/ApiDomain'

function createBaseUrl (entityType) {
  return ApiDomain + entityType.apiName
}

function createListUrl (entityType) {
  return createBaseUrl(entityType) + '/list'
}

export default {
  createBaseUrl: createBaseUrl,
  createListUrl: createListUrl
}
