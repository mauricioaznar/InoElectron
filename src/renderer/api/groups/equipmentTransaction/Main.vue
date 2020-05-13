<template>
    <div>
        <action-widget
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
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
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
              path: RouteObjectHelper.createPath(EntityTypes.EQUIPMENT_TRANSACTION, 'create')
            }
          ],
          buttons: []
        }
      },
      computed: {
        ...mapGetters(['groupDefaultRouteObject'])
      },
      methods: {
        buttonClicked: function (action) {
          if (action.name === 'Delete') {
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
                path: RouteObjectHelper.createPath(EntityTypes.EQUIPMENT_TRANSACTION, 'edit') + '/' + id
              },
              {
                name: 'View',
                icon: 'fa fa-eye',
                path: RouteObjectHelper.createPath(EntityTypes.EQUIPMENT_TRANSACTION, 'view') + '/' + id
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
          GenericApiOperations.del(EntityTypes.EQUIPMENT_TRANSACTION.apiName, id).then(result => {
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
