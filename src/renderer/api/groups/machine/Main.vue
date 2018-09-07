<template>
    <div>
        <action-widget
                :title="'Machine'"
                :actions="actions"
                :buttons="buttons"
                @buttonClicked="buttonClicked"
        ></action-widget>
        <b-modal
                ref="deleteModal"
                centered
                title="Desea borrar esta entidad"
                :cancel-title="'Cancelar'"
                @ok="confirmDelete">
        </b-modal>
        <router-view></router-view>
    </div>
</template>

<script>
  import ActionWidget from 'renderer/components/mau-components/action-widget/ActionWidget.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import RouteObjectHelper from 'renderer/api/functions/RouteObjectHelper'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import Notifications from 'renderer/api/functions/Notifications'
  import ApiOperations from 'renderer/api/functions/ApiOperations'
  import {mapGetters} from 'vuex'
  export default {
    components: {ActionWidget},
    data () {
      return {
        actions: [],
        alwaysActions: [
          {
            name: 'Create',
            icon: 'fa fa-plus',
            path: RouteObjectHelper.createPath(EntityTypes.MACHINE, 'create')
          }
        ],
        buttons: []
      }
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    methods: {
      buttonClicked: function (button) {
        if (button.name === 'Delete') {
          this.$refs.deleteModal.show()
        }
      },
      setActions: function () {
        if (this.$route.params[GlobalEntityIdentifier]) {
          let id = this.$route.params[GlobalEntityIdentifier]
          this.actions = this.alwaysActions.concat([
            {
              name: 'Edit',
              icon: 'fa fa-edit',
              path: RouteObjectHelper.createPath(EntityTypes.MACHINE, 'edit') + '/' + id
            },
            {
              name: 'View',
              icon: 'fa fa-eye',
              path: RouteObjectHelper.createPath(EntityTypes.MACHINE, 'view') + '/' + id
            }
          ])
          this.buttons = [{
            name: 'Delete',
            icon: 'fa fa-trash'
          }]
        } else {
          this.actions = this.alwaysActions
          this.buttons = []
        }
      },
      confirmDelete: function () {
        let id = this.$route.params[GlobalEntityIdentifier]
        ApiOperations.del(EntityTypes.MACHINE, id).then(result => {
          Notifications.success(this)
          this.$router.push({name: this.groupDefaultRouteObject(this.$route).name})
        })
      }
    },
    created () {
      this.setActions()
    },
    watch: {
      $route: function () {
        this.setActions()
      }
    }
  }
</script>