import apiComponentLoader from 'renderer/services/api/apiComponentLoader'
import convertFirstCharacterTo from 'renderer/services/common/ConvertFirstCharacterTo'
import entityStore from 'renderer/api/store/entity'

function createRouteObjectName (entityType, childType) {
  return convertFirstCharacterTo.uppercase(childType.name) + convertFirstCharacterTo.uppercase(entityType.name)
}

function createRouteObjectPath (entityType, childType) {
  return '/' + convertFirstCharacterTo.lowercase(entityType.name) + '/' + convertFirstCharacterTo.lowercase(childType.name)
}

function createRouteObjectParentPath (entityType, childType) {
  return '/' + convertFirstCharacterTo.lowercase(entityType.name)
}

function createRouteObject (entityType, childType, config, children = []) {
  let routeObject = {
    name: createRouteObjectName(entityType, childType),
    path: children.length > 0 ? createRouteObjectParentPath(entityType) : createRouteObjectPath(entityType, childType),
    component: apiComponentLoader(convertFirstCharacterTo.lowercase(entityType.name) + '/' + convertFirstCharacterTo.uppercase(childType.name)),
    children: children,
    meta: {
      requiresAuth: true,
      entityType: entityType
    }
  }
  routeObject.meta['appDefault'] = config.hasOwnProperty('appDefault') ? config['appDefault'] : false
  routeObject.meta['category'] = config.hasOwnProperty('category') ? config['category'] : false
  routeObject.meta['categoryDefault'] = config.hasOwnProperty('categoryDefault') ? config['categoryDefault'] : false
  routeObject.meta['entityDefault'] = config.hasOwnProperty('entityDefault') ? config['entityDefault'] : false
  routeObject.meta['title'] = config.hasOwnProperty('title') ? config['title'] : entityType.title
  routeObject.meta['iconClass'] = config.hasOwnProperty('iconClass') ? config['iconClass'] : ''
  routeObject.meta['requiresAuth'] = config.hasOwnProperty('requiresAuth') ? config['requiresAuth'] : true
  if (config.hasOwnProperty('params')) {
    routeObject['props'] = true
    routeObject.meta['params'] = config['params']
    let props = config['params']
    let extraUrlPath = ''
    for (let i = 0; i < props.length; i++) {
      extraUrlPath += '/:' + props[i]
    }
    routeObject.path = routeObject.path + extraUrlPath
  }
  let securityObj = config.hasOwnProperty('security') ? config['security'] : {}
  let roles = entityStore.state.roles
  for (let roleKey in roles) {
    if (roles.hasOwnProperty(roleKey)) {
      let roleObjName = roles[roleKey].name
      securityObj[roleObjName] = securityObj[roleObjName] !== false
    }
  }
  routeObject.meta['security'] = securityObj
  return routeObject
}

function getRouteObjectMetaPropertyValue (routeObj, propertyName) {
  let meta = routeObj.meta
  if (!meta.hasOwnProperty(propertyName)) {
    return null
  }
  return meta[propertyName]
}

function validateRoutesSecurity (userRole, routeObjects) {
  let routeObjectsLength = routeObjects.length
  let validatedRouteObjects = []
  for (let i = 0; i < routeObjectsLength; i++) {
    let validationResult = validateRouteSecurity(userRole, routeObjects[i])
    if (validationResult !== null) {
      validatedRouteObjects.push(validationResult)
    }
  }
  return validatedRouteObjects
}

function validateRouteSecurity (userRole, routeObj) {
  let security = getRouteObjectMetaPropertyValue(routeObj, 'security')
  if (security[userRole.name]) {
    return routeObj
  }
  return null
}

export default {
  createPath: createRouteObjectPath,
  createName: createRouteObjectName,
  createRouteObject: createRouteObject,
  getRouteObjectMetaPropertyValue: getRouteObjectMetaPropertyValue,
  validateRouteSecurity: validateRouteSecurity,
  validateRoutesSecurity: validateRoutesSecurity
}

