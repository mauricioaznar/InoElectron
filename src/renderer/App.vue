<template>
  <div id="app" class="app">
    <mau-spinner :sizeType="'app'" v-show="isAppLoading"></mau-spinner>
    <notifications classes="mau-notification" :duration="5000" :group="'right-corner'"></notifications>
    <auth-layout v-if="!requiresAuth" v-show="!isAppLoading">
    </auth-layout>
    <layout v-else v-show="!isAppLoading"></layout>
  </div>
</template>

<script>
  import Layout from 'renderer/app/layout/Layout'
  import AuthLayout from 'renderer/app/layout/AuthLayout'
  import {mapGetters} from 'vuex'
  import AppActions from 'renderer/app/store/AppActions'

  export default {
    name: 'app',
    components: {
      AuthLayout,
      Layout
    },
    updated () {
      this.$store.dispatch(AppActions.SET_IS_APP_LOADING, false)
    },
    computed: {
      ...mapGetters([
        'isAppLoading'
      ]),
      requiresAuth () {
        return this.$route.meta.requiresAuth === true
      }
    }
  }
</script>

<style lang="scss">
  @import "sass/main";
  body {
    height: 100%;
    .app {
      height: 100%;
    }
  }
</style>
