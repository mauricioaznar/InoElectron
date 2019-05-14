export function createExcelDownloadsUrl (searchedString) {
  return 'downloads/excel'
}

export function createPdfDownloadUrl (searchedString) {
  return 'downloads/pdf/' + searchedString
}

export default {
  createExcelDownloadsUrl: createExcelDownloadsUrl,
  createPdfDownloadUrl: createPdfDownloadUrl
}
