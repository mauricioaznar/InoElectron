import Vue from 'vue'
import Router from 'vue-router'
import store from 'renderer/store/index'
import ChildTypes from 'renderer/api/ChildTypes'
import RouteObjectActions from 'renderer/api/store/routeObjectActions'
import AuthActions from 'renderer/api/store/authActions'
import AppActions from 'renderer/app/store/AppActions'
import ApiOperations from 'renderer/services/api/ApiOperations'
import EntityTypes from 'renderer/api/EntityTypes'
import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
import routeObjectStore from 'renderer/api/store/routeObject'

Vue.use(Router)
let router = new Router({
  routes: [
    ...routeObjectStore.state.routeObjects,
    {path: '*', redirect: {name: RouteObjectHelper.createName(EntityTypes.BAG, ChildTypes.LIST)}}
  ]
})

export default router

router.beforeEach(async (to, from, next) => {
  let toRequiresAuth = RouteObjectHelper.getRouteObjectMetaPropertyValue(to, 'requiresAuth')
  if (!toRequiresAuth) {
    next()
  }
  try {
    let user = await ApiOperations.getMe()
    store.dispatch(AuthActions.SET_USER, user)
    let userRole = store.getters.getRoleByRoleId(user.role_id)
    if (!RouteObjectHelper.validateRouteSecurity(userRole, to)) {
      store.dispatch(RouteObjectActions.SET_CURRENT_ROUTE_OBJECT_USER_AUTH, false)
    } else {
      store.dispatch(RouteObjectActions.SET_CURRENT_ROUTE_OBJECT_USER_AUTH, true)
    }
    store.dispatch(RouteObjectActions.SET_CURRENT_ROUTE_OBJECT, to)
  } catch (e) {
    console.log(e)
    next({path: RouteObjectHelper.createPath(EntityTypes.AUTH, ChildTypes.TOKEN)})
  }
  next()
})

router.afterEach((to, from, next) => {
  store.dispatch(AppActions.SET_IS_ROUTE_OBJECT_LOADING, false)
})
