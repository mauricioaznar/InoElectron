import Vue from 'vue'

export function createExcelDownloadsUrl (searchedString) {
  return Vue.http.options.root + '/downloads/excel'
}

export function createPdfDownloadUrl (searchedString) {
  return Vue.http.options.root + '/downloads/pdf/' + searchedString
}

export default {
  createExcelDownloadsUrl: createExcelDownloadsUrl,
  createPdfDownloadUrl: createPdfDownloadUrl
}
