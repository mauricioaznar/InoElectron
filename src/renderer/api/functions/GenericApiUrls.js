import Vue from 'vue'

function createListUrl (entityEndpointName, options) {
  let paginateQuery = (options && options.paginate && options.paginate === true) ? 'paginate=true ' : 'paginate=false'
  let filterLikeQuery = (options && options.filterLikes) !== undefined ? getFilterLikesQuery(options.filterLikes) : ''
  let filterExactQuery = (options && options.filterExacts) !== undefined ? getFilterExactsQuery(options.filterExacts) : ''
  let filterEntityQuery = (options && options.filterEntities) !== undefined ? getFilterEntitiesQuery(options.filterEntities) : ''
  let filterStartDateTimeQuery = (options && options.filterStartDateTime) !== undefined ? getFilterStartDateTimeQuery(options.filterStartDateTime) : ''
  let filterEndDateTimeQuery = (options && options.filterEndDateTime) !== undefined ? getFilterEndDateTimeQuery(options.filterEndDateTime) : ''
  let filterOrderByQuery = (options && options.filterOrderBy) !== undefined ? getFilterOrderByQuery(options.filterOrderBy) : ''
  return Vue.http.options.root + '/' + entityEndpointName + '/list?' +
    paginateQuery +
    filterLikeQuery +
    filterExactQuery +
    filterEntityQuery +
    filterStartDateTimeQuery +
    filterEndDateTimeQuery +
    filterOrderByQuery
  function getFilterLikesQuery (filterLikes) {
    let filterLikeQuery = ''
    let i = 1
    for (let filterLikeObjectKey in filterLikes) {
      if (filterLikes.hasOwnProperty(filterLikeObjectKey)) {
        let filterLikeObjectValue = filterLikes[filterLikeObjectKey]
        if (i <= 5) {
          filterLikeQuery += '&filter_like_' + i + '=' + filterLikeObjectKey + '&filter_like_value_' + i + '=' + filterLikeObjectValue
        }
        i++
      }
    }
    return filterLikeQuery
  }
  function getFilterExactsQuery (filterExacts) {
    let filterExactQuery = ''
    let i = 1
    for (let filterExactObjectKey in filterExacts) {
      if (filterExacts.hasOwnProperty(filterExactObjectKey)) {
        let filterExactObjectValue = filterExacts[filterExactObjectKey]
        if (i <= 5) {
          filterExactQuery += '&filter_exact_' + i + '=' + filterExactObjectKey + '&filter_exact_value_' + i + '=' + filterExactObjectValue
        }
        i++
      }
    }
    return filterExactQuery
  }
  function getFilterEntitiesQuery (filterEntities) {
    let filterEntitiesQuery = ''
    let i = 1
    for (let entityName in filterEntities) {
      if (filterEntities.hasOwnProperty(entityName)) {
        let entityValues = filterEntities[entityName]
        for (let entityPropertyName in entityValues) {
          if (entityValues.hasOwnProperty(entityPropertyName)) {
            let entityValue = entityValues[entityPropertyName]
            if (i <= 5) {
              filterEntitiesQuery += '&filter_entity_' + i + '=' + entityName + '&filter_entity_property_' + i + '=' + entityPropertyName + '&filter_entity_value_' + i + '=' + entityValue
              i++
            }
          }
        }
      }
    }
    return filterEntitiesQuery
  }
  function getFilterStartDateTimeQuery (filterStartDateObject) {
    let filterStartDateQuery = ''
    let loopIndex = 1
    for (let filterStartDateObjectKey in filterStartDateObject) {
      if (filterStartDateObject.hasOwnProperty(filterStartDateObjectKey)) {
        if (loopIndex === 1) {
          filterStartDateQuery += '&start_date_1=' + filterStartDateObjectKey + '&start_date_value_1' + '=' + filterStartDateObject[filterStartDateObjectKey]
        }
        loopIndex++
      }
    }
    return filterStartDateQuery
  }
  function getFilterEndDateTimeQuery (filterEndDateObject) {
    let filterEndDateQuery = ''
    let loopIndex = 1
    for (let filterEndDateObjectKey in filterEndDateObject) {
      if (filterEndDateObject.hasOwnProperty(filterEndDateObjectKey)) {
        if (loopIndex === 1) {
          filterEndDateQuery += '&end_date_1=' + filterEndDateObjectKey + '&end_date_value_1' + '=' + filterEndDateObject[filterEndDateObjectKey]
        }
        loopIndex++
      }
    }
    return filterEndDateQuery
  }
  function getFilterOrderByQuery (filterOrderBy) {
    let hasPipe = filterOrderBy.includes('|')
    return '&sort=' + (hasPipe ? filterOrderBy : filterOrderBy + '|desc')
  }
}

function createEntityIdUrl (entityEndpointName, id) {
  return Vue.http.options.root + '/' + entityEndpointName + '/' + id
}

export default {
  createListUrl: createListUrl,
  createEntityIdUrl: createEntityIdUrl
}
