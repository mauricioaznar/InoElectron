import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
const user = state => {
  let user = state.auth.user
  return user !== null ? user : ''
}
const isSuperUser = state => {
  let user = state.auth.user
  let roleId = user ? user.role_id : 0
  return roleId === 1
}
const isAdminUser = state => {
  let user = state.auth.user
  let roleId = user ? user.role_id : 0
  return roleId === 1 || roleId === 2
}
const isProductionUser = state => {
  let user = state.auth.user
  let roleId = user ? user.role_id : 0
  return roleId === 4
}
const isSalesUser = state => {
  let user = state.auth.user
  let roleId = user ? user.role_id : 0
  return roleId === 5
}
const isGuestUser = state => {
  let user = state.auth.user
  let roleId = user ? user.role_id : 0
  return roleId === 3
}
const routeObjects = state => state.routeObject.routeObjects
const getUsers = state => {
  return state.entity.users
}
const getProductById = state => (productId) => {
  return state.entity.products.find(productObj => { return productObj[GlobalEntityIdentifier] === productId })
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
  getProductById,
  routeObjects,
  isAdminUser,
  isSalesUser,
  isProductionUser,
  isGuestUser,
  isSuperUser,
  appDefaultRouteObject,
  appDefaultNotAuthRouteObject,
  groupDefaultRouteObject,
  routeObjectParent
}
