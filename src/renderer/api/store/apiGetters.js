import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
const user = state => {
  let user = state.auth.user
  return user !== null ? user : ''
}
const routeObjects = state => state.routeObject.routeObjects
const getUsers = state => {
  return state.entity.users
}
const getBagById = state => (productId) => {
  return state.entity.bags.find(productObj => { return productObj[GlobalEntityIdentifier] === productId })
}
const appDefaultRouteObject = state => {
  let obj = null
  state.routeObject.routeObjects.forEach(routeObj => {
    let hasChildren = routeObj.children.length > 0
    if (hasChildren) {
      routeObj.children.forEach(childRouteObj => {
        if (childRouteObj.meta.appDefault) {
          obj = childRouteObj
        }
      })
    }
  })
  if (obj === null) {
    console.error('Route objects dont contain a route object with a appDefault config property')
  }
  return obj
}
const appDefaultNotAuthRouteObject = state => {
  let obj = null
  state.routeObject.routeObjects.forEach(routeObj => {
    let hasChildren = routeObj.children.length > 0
    if (hasChildren) {
      routeObj.children.forEach(childRouteObj => {
        if (childRouteObj.meta.appDefaultNotAuth) {
          obj = childRouteObj
        }
      })
    }
  })
  if (obj === null) {
    console.error('Route objects dont contain a route object with a appDefaultNotAuth config property')
  }
  return obj
}
const routeObjectParent = state => (childRouteObject) => {
  let foundParentObj = {}
  state.routeObject.routeObjects.forEach(routeObj => {
    let hasChildren = routeObj.children.length > 0
    if (hasChildren) {
      routeObj.children.forEach(childRouteObj => {
        if (childRouteObj.name === childRouteObject.name) {
          foundParentObj = routeObj
        }
      })
    }
  })
  return foundParentObj
}
const groupDefaultRouteObject = state => (childRouteObject) => {
  let foundParentObj = {}
  let groupDefaultRouteObject = {}
  state.routeObject.routeObjects.forEach(routeObj => {
    let hasChildren = routeObj.children.length > 0
    if (hasChildren) {
      routeObj.children.forEach(childRouteObj => {
        if (childRouteObj.name === childRouteObject.name) {
          foundParentObj = routeObj
        }
      })
    }
  })
  if (foundParentObj) {
    foundParentObj.children.forEach(routeObj => {
      if (routeObj.meta.groupDefault) {
        groupDefaultRouteObject = routeObj
      }
    })
  }
  return groupDefaultRouteObject
}
export {
  user,
  getUsers,
  getBagById,
  routeObjects,
  appDefaultRouteObject,
  appDefaultNotAuthRouteObject,
  groupDefaultRouteObject,
  routeObjectParent
}
