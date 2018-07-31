import Vue from 'vue'
import Router from 'vue-router'
import store from 'renderer/store/index'
import AuthActions from 'renderer/api/store/authActions'
import AppActions from 'renderer/app/store/AppActions'
import ApiOperations from 'renderer/api/functions/ApiOperations'
import RouteObjectHelper from 'renderer/api/functions/RouteObjectHelper'
import routeObjectStore from 'renderer/api/store/routeObject'

Vue.use(Router)
let router = new Router({
  routes: [
    ...routeObjectStore.state.routeObjects,
    {path: '*', redirect: {name: store.getters.appDefaultRouteObject.name}}
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
  } catch (e) {
    console.log(e)
    next({name: store.getters.appDefaultNotAuthRouteObject.name})
  }
  next()
})

router.afterEach((to, from, next) => {
  store.dispatch(AppActions.SET_IS_ROUTE_OBJECT_LOADING, false)
})
