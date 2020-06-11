<template>
  <aside class="sidebar">
      <ul class="sidebar-menu my-3" v-for="(category, index) in categories" v-if="showDependingOnRol(category)">
        <li class="pl-2 mb-1">
          <a
              @click="getDefaultCategoryRouteObjectPath(category)"
             class="sidebar-link side-link-category-title"
             :class="{'router-link-active': category.name === currentCategoryName}">
            {{category.title}}
          </a>
        </li>
        <li class="pl-4" v-for="(childRouteObject, index) in category.children" @click="pushChildRouteObject(childRouteObject)">
          <a
                  class="sidebar-link"
                  :class="{'router-link-active': childRouteObject.name === $route.name}">
            {{getRouteObjectMetaPropertyValue(childRouteObject, 'title')}}
          </a>
        </li>
      </ul>
    <a
            class="sidebar-link sidebar-close-link"
            @click="logout"
    >
      Cerrar sesión
    </a>
  </aside>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Categories from 'renderer/api/Categories'
  import RouteObjectHelper from 'renderer/api/functions/RouteObjectHelper'
  import isObjectEmpty from 'renderer/services/common/isObjectEmpty'
  import authActions from 'renderer/api/store/authActions'
  export default {
    name: 'sidebar',
    data () {
      return {
        categories: Categories
      }
    },
    created () {
      for (let categoryKey in this.categories) {
        if (this.categories.hasOwnProperty(categoryKey)) {
          let category = this.categories[categoryKey]
          let categoryChildren = []
          console.log(category)
          this.routeObjects.forEach(routeObject => {
            if (category.name === RouteObjectHelper.getRouteObjectMetaPropertyValue(routeObject, 'category').name) {
              routeObject.children.forEach(childRouteObject => {
                console.log(childRouteObject.name)
                if (RouteObjectHelper.getRouteObjectMetaPropertyValue(childRouteObject, 'navbar')) {
                  categoryChildren.push(childRouteObject)
                }
              })
            }
          })
          console.log(categoryChildren)
          category.children = categoryChildren
        }
      }
    },
    components: {
    },
    computed: {
      ...mapGetters([
        'routeObjects',
        'routeObjectParent',
        'isAdminUser',
        'isProductionUser',
        'isSalesUser'
      ]),
      currentCategoryName: function () {
        let routeObjectParent = this.routeObjectParent(this.$route)
        let category
        if (!isObjectEmpty(routeObjectParent)) {
          category = RouteObjectHelper.getRouteObjectMetaPropertyValue(routeObjectParent, 'category')
        }
        return category ? category.name : ''
      }
    },
    methods: {
      showDependingOnRol: function (category) {
        let shouldShow = true
        if (category.name === Categories.SALES.name) {
          shouldShow = this.isAdminUser || this.isSalesUser
        }
        if (category.name === Categories.PRODUCTION.name) {
          shouldShow = this.isAdminUser || this.isProductionUser
        }
        if (category.name === Categories.ADMINISTRATION.name) {
          shouldShow = this.isAdminUser
        }
        if (category.name === Categories.HUMAN_RESOURCES.name) {
          shouldShow = this.isAdminUser
        }
        if (category.name === Categories.MAINTENANCE.name) {
          shouldShow = this.isAdminUser
        }
        if (category.name === Categories.AUTH.name) {
          shouldShow = this.isAdminUser
        }
        return shouldShow
      },
      getDefaultCategoryRouteObjectPath: function (category) {
        this.$router.push({path: this.getDefaultCategoryRouteObject(category).path})
      },
      pushChildRouteObject: function (childRouteObject) {
        this.$router.push({path: childRouteObject.path})
      },
      getRouteObjectMetaPropertyValue: RouteObjectHelper.getRouteObjectMetaPropertyValue,
      getDefaultCategoryRouteObject: function (category) {
        let foundRouteObj = {}
        this.routeObjects.forEach(routeObj => {
          let routeObjCategory = RouteObjectHelper.getRouteObjectMetaPropertyValue(routeObj, 'category')
          if (category.name === routeObjCategory.name) {
            let isFoundRouteObj = routeObj.children.find(routeObjChild => {
              return RouteObjectHelper.getRouteObjectMetaPropertyValue(routeObjChild, 'categoryDefault')
            })
            if (isFoundRouteObj) {
              foundRouteObj = isFoundRouteObj
            }
          }
        })
        return foundRouteObj
      },
      getNavbarChildrenRouteObjects: function (mainRouteObject) {
        return []
      },
      logout: function () {
        this.$store.dispatch(authActions.UNSET_USER).then(result => {
          this.$router.push({name: 'LoginAuth'})
        })
      }
    },
    watch: {
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/variables";

  .sidebar {
    background-color: rgb(44, 50, 70);
    height: calc(100vh) !important;
    position: fixed;
    top: 0 !important;
    width: $sidebar-width;

    .sidebar-link {
      position: relative;
      padding-left: 0;
      text-decoration: none;
      width: 100%;
      color:white;
      font-weight: 500;
      font-size: 14px;

      &.router-link-active{
        color: #4ab2e3;
        background-color: transparent;
      }
      &:hover{
        color: #4ab2e3;
        background-color: transparent;
      }
    }

    .side-link-category-title {
      font-size: 17px;
    }

    .sidebar-menu {
      width: 100%;
      max-height: 100%;
      margin-bottom: 0;
      padding: 0;
      li {
        width: 100%;
        height: 26px;
        cursor: pointer;
      }
    }

    .sidebar-close-link {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 30px;
      vertical-align: center;
      text-align: center;
    }
  }


</style>
