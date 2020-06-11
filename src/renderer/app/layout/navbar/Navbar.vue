<template>
  <nav class="navbar navbar-light bg-light">
    <a class="navbar-brand" href="#">{{navbarTitle}}</a>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex'
  import RouteObjectHelper from 'renderer/api/functions/RouteObjectHelper'
  import isObjectEmpty from 'renderer/services/common/isObjectEmpty'
  export default {
    name: 'navbar',
    data () {
      return {
        navbarTitle: ''
      }
    },
    directives: {
    },
    computed: mapGetters([
      'user',
      'routeObjects',
      'routeObjectParent',
      'toggleWithoutAnimation'
    ]),
    created () {
      let currentRouteObject = this.$route
      this.mapRouteObjectsToNavbar(currentRouteObject)
    },
    watch: {
      $route: function (currentRouteObject) {
        this.mapRouteObjectsToNavbar(currentRouteObject)
      }
    },
    methods: {
      mapRouteObjectsToNavbar: function (currentRouteObject) {
        let navbarTitle = ''
        if (!isObjectEmpty(currentRouteObject)) {
          navbarTitle = RouteObjectHelper.getRouteObjectMetaPropertyValue(currentRouteObject, 'title') || ''
        }
        this.navbarTitle = navbarTitle
      }
    }
  }
</script>

<style lang="scss">
</style>
