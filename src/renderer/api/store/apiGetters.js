import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
const user = state => {
  let user = state.auth.user
  return user !== null ? user : ''
}
const routeObjects = state => state.routeObject.routeObjects
const getRoles = state => {
  return state.entity.roles
}
const getUsers = state => {
  return state.entity.users
}
const getRoleByRoleId = state => (roleId) => {
  return state.entity.roles.find(roleObj => { return roleObj[GlobalEntityIdentifier] === roleId })
}
const currentRouteObjectUserAuth = state => {
  return state.routeObject.currentRouteObjectUserAuth
}
const getBagById = state => (productId) => {
  return state.entity.bags.find(productObj => { return productObj[GlobalEntityIdentifier] === productId })
}
const getRouteObjectParent = state => (searchedRouteObject) => {
  let foundParentObj = {}
  state.routeObject.routeObjects.forEach(routeObj => {
    let hasChildren = routeObj.children.length > 0
    if (hasChildren) {
      routeObj.children.forEach(childRouteObj => {
        if (childRouteObj.name === searchedRouteObject.name) {
          foundParentObj = routeObj
        }
      })
    }
  })
  return foundParentObj
}

export {
  user,
  getUsers,
  currentRouteObjectUserAuth,
  getRoles,
  getRoleByRoleId,
  getRouteObjectParent,
  getBagById,
  routeObjects
}
