<template>
  <div v-if="selectedRouteObjects" class="action-widget widget">
    <div class="widget-header w-100 d-flex justify-content-end align-content-center align-items-center">
      <div class="widget-buttons">
        <router-link
                v-for="(routeObj, index) in selectedRouteObjects"
                :active-class="'active'"
                class="icon-button ml-2"
                :to="createToPath(routeObj)"
                :key="index">
          <span :class="routeObj.meta.iconClass"></span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  import isObjectEmpty from 'renderer/services/common/isObjectEmpty'
  import {mapGetters} from 'vuex'
  export default {
    name: 'ActionWidget',
    data () {
      return {
        selectedRouteObjects: []
      }
    },
    props: {
    },
    created () {
      this.setSelectedRouteObjects()
    },
    watch: {
      $route: function () {
        this.setSelectedRouteObjects()
      }
    },
    computed: {
      ...mapGetters(['getRouteObjectParent'])
    },
    methods: {
      setSelectedRouteObjects: function () {
        let currentRouteObject = this.$route
        let selectedRouteObjects = []
        if (!isObjectEmpty(currentRouteObject)) {
          let parentRouteObject = this.getRouteObjectParent(currentRouteObject)
          if (!isObjectEmpty(parentRouteObject) && parentRouteObject.children) {
            let parentRouteObjectChildren = parentRouteObject.children
            parentRouteObjectChildren.forEach(routeObj => {
              if (routeObj.meta.params) {
                if (currentRouteObject.meta.params) {
                  selectedRouteObjects.push(routeObj)
                }
              } else {
                selectedRouteObjects.push(routeObj)
              }
            })
          }
        }
        this.selectedRouteObjects = selectedRouteObjects
      },
      createToPath: function (routeObj) {
        let params = routeObj.meta.params
        if (!params) {
          return routeObj.path
        }
        let currentRoutObject = this.$route
        let newPath = routeObj.path
        let currentRouteObjectGlobalIdentificator = currentRoutObject.params[GlobalEntityIdentifier]
        if (currentRouteObjectGlobalIdentificator) {
          newPath = newPath.replace(':' + GlobalEntityIdentifier, currentRouteObjectGlobalIdentificator)
        }
        return newPath
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/variables";

  .action-widget {
    background: $widget-bg;
    box-shadow: $widget-box-shadow;
    margin-bottom: $widget-mb;
    padding: 0.5rem 1rem;
  }
</style>
