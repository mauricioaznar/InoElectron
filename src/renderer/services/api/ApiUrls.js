import ApiDomain from 'renderer/services/api/ApiDomain'

function createBaseUrl (entityType) {
  return ApiDomain + entityType.apiName
}

function createListUrl (entityType) {
  return createBaseUrl(entityType) + '/list'
}

function createExcelDownloadsUrl (searchedString) {
  return ApiDomain + 'downloads/excel'
}

function createPdfDownloadUrl (searchedString) {
  return ApiDomain + 'downloads/pdf/' + searchedString
}

export default {
  createBaseUrl: createBaseUrl,
  createListUrl: createListUrl,
  createExcelDownloadsUrl: createExcelDownloadsUrl,
  createPdfDownloadUrl: createPdfDownloadUrl
}
