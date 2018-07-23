<template>
  <div class="layout">
    <sidebar class="layout-sidebar"></sidebar>
    <div class="right">
      <navbar class="layout-navbar"></navbar>
      <action-widget></action-widget>
      <div class="layout-content-wrap" id="content-wrap">
        <main id="content" class="content" role="main">
          <mau-widget v-if="currentRouteObjectUserAuth">
            <router-view></router-view>
          </mau-widget>
          <mau-widget v-if="!currentRouteObjectUserAuth">
            <h2 class="text-center">Ruta no autorizada</h2>
            <p class="text-center">La ruta que usted desea ingresar se encuntra restringida.</p>
          </mau-widget>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex'
  import Navbar from './navbar/Navbar'
  import ActionWidget from 'renderer/app/layout/action-widget/ActionWidget.vue'
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
      ActionWidget,
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
        this.$store.dispatch(EntityActions.GET_BAGS)
        this.$store.dispatch(EntityActions.GET_BAG_TYPES)
        this.$store.dispatch(EntityActions.GET_BAG_PACKINGS)
        this.$store.dispatch(EntityActions.GET_EXPENSE_TYPES)
        this.$store.dispatch(EntityActions.GET_ORDER_ADJUSTMENT_TYPES)
        this.$store.dispatch(EntityActions.GET_SUPPLIERS)
        this.$store.dispatch(EntityActions.GET_CLIENTS)
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
