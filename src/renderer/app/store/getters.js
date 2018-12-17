// import {globalEntityIdentificator} from 'renderer/config'
// import UserPropertiesReference from 'renderer/api/pages/user/PropertiesReference'
const sidebarOpened = state => state.app.sidebar.opened
const toggleWithoutAnimation = state => state.app.sidebar.withoutAnimation
const config = state => state.app.config
const palette = state => state.app.config.palette
const isLoading = state => state.app.isLoading
const isRouteObjectLoading = state => state.app.isRouteObjectLoading
const isAppLoading = state => state.app.isAppLoading



export {
  toggleWithoutAnimation,
  sidebarOpened,
  config,
  palette,
  isLoading,
  isAppLoading,
  isRouteObjectLoading
}

