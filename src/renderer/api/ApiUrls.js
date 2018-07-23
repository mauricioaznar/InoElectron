import ApiDomain from 'renderer/services/api/ApiDomain'
import EntityTypes from 'renderer/api/EntityTypes'

export const ApiRouteTypes = {
  LIST: 'list',
  GET_BY_ID: 'getById',
  EDIT: 'edit',
  CREATE: 'create',
  EXCEL: 'excel',
  DEL: 'del',
  USER: 'user',
  TOKEN: 'token',
  RESET: 'reset',
  HISTORY: 'history',
  SEARCH: 'search',
  ANALYTICS: 'analytics',
  NOTIFICATIONS: 'notifications'
}

export function getApiRoute (entityType, apiRouteType) {
  if (!ApiRoutes.hasOwnProperty(entityType.apiName)) {
    console.log('Error! no entityType with api name: ' + entityType.apiName)
    if (!ApiRoutes[entityType.name].hasOwnProperty(apiRouteType)) {
      console.log('Error! Entity with api name ' + entityType.apiName + ' has no apiRouteType \'' + apiRouteType + '\'')
    }
  }
  return ApiRoutes[entityType.apiName][apiRouteType]
}

function createDefaultRoutes (entityType) {
  return {
    [ApiRouteTypes.LIST]: ApiDomain + entityType.apiName + '/list',
    [ApiRouteTypes.GET_BY_ID]: ApiDomain + entityType.apiName + '/',
    [ApiRouteTypes.EDIT]: ApiDomain + entityType.apiName + '/',
    [ApiRouteTypes.CREATE]: ApiDomain + entityType.apiName + '/',
    [ApiRouteTypes.DEL]: ApiDomain + entityType.apiName + '/'
  }
}

function createListUrl (entityType) {
  return {[ApiRouteTypes.LIST]: ApiDomain + entityType.apiName + '/list'}
}

function createEditUrl (entityType) {
  return {[ApiRouteTypes.EDIT]: ApiDomain + entityType.apiName}
}

function createCreateUrl (entityType) {
  return {[ApiRouteTypes.CREATE]: ApiDomain + entityType.apiName}
}

function createDeleteUrl (entityType) {
  return {[ApiRouteTypes.DEL]: ApiDomain + entityType.apiName}
}

function createGetById (entityType) {
  return {[ApiRouteTypes.DEL]: ApiDomain + entityType.apiName}
}

function combineUrls (arrayOfUrls) {
  let urlsObject = {}
  for (let i = 0; i < arrayOfUrls.length; i++) {
    let obj = arrayOfUrls[i]
    for (let objKey in obj) {
      if (obj.hasOwnProperty(objKey)) {
        urlsObject[objKey] = obj[objKey]
      }
    }
  }
}

export const ApiRoutes = {
  [EntityTypes.BAG.apiName]: combineUrls(
    createListUrl(EntityTypes.BAG),
    createEditUrl(EntityTypes.BAG),
    createCreateUrl(EntityTypes.BAG),
    createDeleteUrl(EntityTypes.BAG),
    createGetById(EntityTypes.BAG)
  ),
  [EntityTypes.CLIENT.apiName]: createDefaultRoutes(EntityTypes.CLIENT),
  [EntityTypes.USER.apiName]: createDefaultRoutes(EntityTypes.USER),
  [EntityTypes.BAG_TYPE.apiName]: createDefaultRoutes(EntityTypes.BAG_TYPE),
  [EntityTypes.BAG_PACKING.apiName]: createDefaultRoutes(EntityTypes.BAG_PACKING),
  [EntityTypes.BAG_ORDER_PRODUCTION.apiName]: createDefaultRoutes(EntityTypes.BAG_ORDER_PRODUCTION),
  [EntityTypes.BAG_ORDER_PRODUCTION_PRODUCT.apiName]: createDefaultRoutes(EntityTypes.BAG_ORDER_PRODUCTION_PRODUCT),
  [EntityTypes.BAG_ORDER_ADJUSTMENT.apiName]: createDefaultRoutes(EntityTypes.BAG_ORDER_ADJUSTMENT),
  [EntityTypes.BAG_ORDER_ADJUSTMENT_PRODUCT.apiName]: createDefaultRoutes(EntityTypes.BAG_ORDER_ADJUSTMENT_PRODUCT),
  [EntityTypes.BAG_ORDER_ADJUSTMENT_ORDER_TYPE.apiName]: createDefaultRoutes(EntityTypes.BAG_ORDER_ADJUSTMENT_ORDER_TYPE),
  [EntityTypes.BAG_ORDER_SALE_RECEIPT.apiName]: createDefaultRoutes(EntityTypes.BAG_ORDER_SALE_RECEIPT),
  [EntityTypes.BAG_ORDER_SALE_PRODUCT.apiName]: createDefaultRoutes(EntityTypes.BAG_ORDER_SALE_PRODUCT),
  [EntityTypes.EXPENSE.apiName]: createDefaultRoutes(EntityTypes.EXPENSE),
  [EntityTypes.SUPPLIER.apiName]: createDefaultRoutes(EntityTypes.SUPPLIER),
  [EntityTypes.EXPENSE_TYPE.apiName]: createDefaultRoutes(EntityTypes.EXPENSE_TYPE),
  [EntityTypes.EXCEL.apiName]: {
    [ApiRouteTypes.EXCEL]: ApiDomain + 'export/excel?'
  },
  [EntityTypes.AUTH.apiName]: {
    [ApiRouteTypes.USER]: ApiDomain + EntityTypes.AUTH.apiName + '/user',
    [ApiRouteTypes.TOKEN]: ApiDomain + EntityTypes.AUTH.apiName + '/login',
    [ApiRouteTypes.RESET]: ApiDomain + 'user/reset/password',
    [ApiRouteTypes.DOWNLOADS]: ApiDomain + EntityTypes.AUTH.apiName + '/downloads/excel'
  },
  [EntityTypes.NOTIFICATION.apiName]: {
    [ApiRouteTypes.NOTIFICATIONS]: ApiDomain + 'notifications'
  }
}


