import * as types from './mutation-types'
import AppActions from './AppActions'

const state = {
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  config: {
    googleMaps: {
      apiKey: 'AIzaSyBNAqPrTQoz9P4NBlDDyfxrnKiafkaL8iQ'
    },
    windowMatchSizeLg: '(min-width: 992px)',
    palette: {
      primary: '#4ae387',
      danger: '#e34a4a',
      info: '#4ab2e3',
      success: '#db76df',
      warning: '#f7cc36',
      white: '#fff',
      black: '#000',
      fontColor: '#34495e',
      transparent: 'transparent',
      lighterGray: '#ddd'
    }
  },
  years: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
  isLoading: true,
  isAppLoading: true,
  isRouteObjectLoading: false
}

const mutations = {
  [types.CLOSE_MENU] (state) {
    if (document.documentElement.clientWidth < 992) {
      state.sidebar.opened = false
    }
  },
  [types.TOGGLE_SIDEBAR] (state) {
    state.sidebar.opened = !state.sidebar.opened
  },
  [types.TOGGLE_WITHOUT_ANIMATION] (state, value) {
    state.sidebar.withoutAnimation = true
  },
  setIsLoading (state, data) {
    state.isLoading = data
  },
  [AppActions.SET_IS_ROUTE_OBJECT_LOADING] (state, data) {
    state.isRouteObjectLoading = data
  },
  [AppActions.SET_IS_APP_LOADING] (state, data) {
    state.isAppLoading = data
  }
}

const actions = {
  closeMenu ({ commit }) {
    commit(types.CLOSE_MENU)
  },
  [AppActions.TOGGLE_SIDEBAR] ({ commit }) {
    commit(types.TOGGLE_SIDEBAR)
  },
  isToggleWithoutAnimation ({ commit }, value) {
    commit(types.TOGGLE_WITHOUT_ANIMATION, value)
  },
  [AppActions.SET_IS_LOADING] ({ commit }, payload) {
    commit('setIsLoading', payload)
  },
  [AppActions.SET_IS_ROUTE_OBJECT_LOADING] ({ commit }, payload) {
    commit('setIsRouteObjectLoading', payload)
  },
  [AppActions.SET_IS_APP_LOADING] ({ commit }, payload) {
    commit('setIsAppLoading', payload)
  }
}

export default {
  state,
  mutations,
  actions
}
