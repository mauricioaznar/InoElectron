export function filterExactQueryCreator (filterExactObject) {
  let filterExactQuery = ''
  let loopIndex = 1
  for (let filterExactObjectKey in filterExactObject) {
    if (filterExactObject.hasOwnProperty(filterExactObjectKey)) {
      if (loopIndex === 1) {
        filterExactQuery += '&filter_exact=' + filterExactObjectKey + '&filter_exact_value' + '=' + filterExactObject[filterExactObjectKey]
      } else {
        filterExactQuery += '&filter_exact_' + loopIndex + '=' + filterExactObjectKey + '&filter_exact_value_' + loopIndex + '=' + filterExactObject[filterExactObjectKey]
      }
      loopIndex++
    }
  }
  return filterExactQuery
}

export function filterLikeQueryCreator (filterLikeObject) {
  let filterLikeQuery = ''
  let loopIndex = 1
  for (let filterLikeObjectKey in filterLikeObject) {
    if (filterLikeObject.hasOwnProperty(filterLikeObjectKey)) {
      if (loopIndex === 1) {
        filterLikeQuery += '&filter=' + filterLikeObjectKey + '&filter_value' + '=' + filterLikeObject[filterLikeObjectKey]
      } else {
        filterLikeQuery += '&filter_' + loopIndex + '=' + filterLikeObjectKey + '&value_' + loopIndex + '=' + filterLikeObject[filterLikeObjectKey]
      }
      loopIndex++
    }
  }
  return filterLikeQuery
}

export default {
  filterExactQueryCreator: filterExactQueryCreator,
  filterLikeQueryCreator: filterLikeQueryCreator
}
