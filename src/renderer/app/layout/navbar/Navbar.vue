<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle class="navbar-link" target="nav_collapse"><span class="fa fa-bars"></span></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item-dropdown class="text-right">
          <!-- Using button-content slot -->
          <template slot="button-content">
            <span>{{navbarTitle}}</span>
          </template>
          <b-dropdown-item v-for="(navbarRouteObj, index) in navbarRouteObjects" class="dropdown-item text-right" @click.prevent="dropdownClicked(navbarRouteObj.path)" :key="index">
            {{navbarRouteObj.meta.title}}
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right class="text-right">
          <!-- Using button-content slot -->
          <template slot="button-content">
            <span>{{user.email}}</span>
          </template>
          <b-dropdown-item class="dropdown-item text-right" :to="myProfilePathObject">Mi Perfil</b-dropdown-item>
          <b-dropdown-item class="dropdown-item text-right" :to="userManualPathObject">Manual de usuario</b-dropdown-item>
          <b-dropdown-item class="dropdown-item text-right" v-on:click.prevent="logout">Cerrar sesion</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import authActions from 'renderer/api/store/authActions'
  import EntityTypes from 'renderer/api/EntityTypes'
  import AppActions from 'renderer/app/store/AppActions'
  import RouteObjectHelper from 'renderer/api/functions/RouteObjectHelper'
  import isObjectEmpty from 'renderer/services/common/isObjectEmpty'
  export default {
    name: 'navbar',
    data () {
      return {
        myProfilePathObject: {path: RouteObjectHelper.createPath(EntityTypes.AUTH, 'MyProfile')},
        userManualPathObject: {path: RouteObjectHelper.createPath(EntityTypes.AUTH, 'UserManual')},
        navbarRouteObjects: [],
        navbarTitle: '',
        navbarIcon: '',
        isSidebarActive: true
      }
    },
    directives: {
    },
    computed: mapGetters([
      'user',
      'routeObjects',
      'routeObjectParent',
      'sidebarOpened',
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
        let navbarRouteObjects = []
        let navbarTitle = ''
        if (!isObjectEmpty(currentRouteObject)) {
          navbarTitle = RouteObjectHelper.getRouteObjectMetaPropertyValue(currentRouteObject, 'title') || ''
          let parentRouteObject = this.routeObjectParent(currentRouteObject)
          if (!isObjectEmpty(parentRouteObject)) {
            let currentRouteObjectCategory = RouteObjectHelper.getRouteObjectMetaPropertyValue(parentRouteObject, 'category')
            this.routeObjects.forEach(routeObj => {
              let routeObjCategory = RouteObjectHelper.getRouteObjectMetaPropertyValue(routeObj, 'category')
              if (routeObjCategory.name === currentRouteObjectCategory.name && routeObj.children) {
                routeObj.children.forEach(routeObjChild => {
                  let isInNavbar = RouteObjectHelper.getRouteObjectMetaPropertyValue(routeObjChild, 'navbar')
                  if (isInNavbar) {
                    navbarRouteObjects.push(routeObjChild)
                  }
                })
              }
            })
          }
        }
        this.navbarTitle = navbarTitle
        this.navbarRouteObjects = navbarRouteObjects
      },
      dropdownClicked: function (path) {
        this.$router.push({path: path})
      },
      ...mapActions([
        AppActions.TOGGLE_SIDEBAR
      ]),
      logout: function () {
        this.$store.dispatch(authActions.UNSET_USER).then(result => {
          this.$router.push({name: 'LoginAuth'})
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/variables";

  a.navbar-brand {
    color: $white !important;
    margin-right: 0px;
    text-align: center;
  }
  .dropdown-menu:after {
   display: none !important;
  }
  .navbar .navbar-link {
    z-index: 300;
    color: $body-color;
  }
  .custom-navbar-name {
    width: 100%;
    text-align: left;
  }
</style>
