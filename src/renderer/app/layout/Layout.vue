<template>
  <div class="layout">
    <sidebar class="layout-sidebar"></sidebar>
    <div class="right">
      <navbar class="layout-navbar"></navbar>
      <div class="layout-content-wrap" id="content-wrap">
        <main id="content" class="content" role="main">
          <mau-widget>
            <router-view></router-view>
          </mau-widget>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex'
  import Navbar from './navbar/Navbar'
  import Sidebar from './sidebar/Sidebar'
  import EntityActions from 'renderer/api/store/entityActions'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  export default {
    name: 'layout',
    data () {
      return {
      }
    },
    components: {
      MauSpinner,
      Navbar,
      Sidebar
    },
    beforeMount () {
      this.getInitialData()
    },
    updated () {
    },
    watch: {
    },
    methods: {
      ...mapActions({
        toggleSidebar: 'toggleSidebar'
      }),
      getInitialData: function () {
        this.$store.dispatch(EntityActions.GET_PRODUCTS)
        this.$store.dispatch(EntityActions.GET_PACKINGS)
      }
    },
    computed: {
      ...mapGetters([
        'currentRouteObjectUserAuth',
        'sidebarOpened',
        'toggleWithoutAnimation',
        'isRouteObjectLoading'
      ]),
      sidebarHiddenClass: function () {
        return {
          'sidebar-hidden': !this.sidebarOpened
        }
      },
      ...mapState({
        user: state => state.api.auth.user
      })
    }
  }
</script>

<style lang="scss">
  @import "../../sass/variables";
  $containers-width: calc(100% - #{$sidebar-width});
  .layout-navbar, .layout-auth-widget, .layout-content-wrap{
    width: $containers-width;
    margin-left: $sidebar-width;
  }
</style>
