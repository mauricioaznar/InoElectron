import apiComponentLoader from 'renderer/services/api/apiComponentLoader'
import convertFirstCharacterTo from 'renderer/services/common/ConvertFirstCharacterTo'
import entityStore from 'renderer/api/store/entity'

function createRouteObjectName (entityType, componentName) {
  return convertFirstCharacterTo.uppercase(componentName) + convertFirstCharacterTo.uppercase(entityType.name)
}

function createRouteObjectPath (entityType, componentName) {
  return '/' + convertFirstCharacterTo.lowercase(entityType.name) + '/' + convertFirstCharacterTo.lowercase(componentName)
}

function createRouteObjectParentPath (entityType) {
  return '/' + convertFirstCharacterTo.lowercase(entityType.name)
}

function createRouteObject (entityType, config, children = []) {
  if (config.componentName === 'undefined' && typeof config.componentName !== 'string') {
    console.error('Route object requiers componentName to be a string')
  }
  let componentName = config.componentName
  let routeObject = {
    name: createRouteObjectName(entityType, componentName),
    path: children.length > 0 ? createRouteObjectParentPath(entityType) : createRouteObjectPath(entityType, componentName),
    component: apiComponentLoader(convertFirstCharacterTo.lowercase(entityType.name) + '/' + convertFirstCharacterTo.uppercase(componentName)),
    children: children,
    meta: {
      requiresAuth: true,
      entityType: entityType
    }
  }
  routeObject.meta['appDefault'] = config.hasOwnProperty('appDefault') ? config['appDefault'] : false
  routeObject.meta['appDefaultNotAuth'] = config.hasOwnProperty('appDefaultNotAuth') ? config['appDefaultNotAuth'] : false
  routeObject.meta['category'] = config.hasOwnProperty('category') ? config['category'] : false
  routeObject.meta['categoryDefault'] = config.hasOwnProperty('categoryDefault') ? config['categoryDefault'] : false
  routeObject.meta['groupDefault'] = config.hasOwnProperty('groupDefault') ? config['groupDefault'] : false
  routeObject.meta['navbar'] = config.hasOwnProperty('navbar') ? config['navbar'] : false
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

