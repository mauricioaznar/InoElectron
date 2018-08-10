<template>
    <div>
        <action-widget
                :actions=actions
        >
        </action-widget>
        <b-modal
                ref="confirmDelete"
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
    import RouteObjectHelper from 'renderer/api/functions/RouteObjectHelper'
    import EntityTypes from 'renderer/api/EntityTypes'
    import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
    import ApiOperations from 'renderer/api/functions/ApiOperations'
    import Notifications from 'renderer/api/functions/Notifications'
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
              path: RouteObjectHelper.createPath(EntityTypes.ORDER_ADJUSTMENT, 'create')
            }
          ]
        }
      },
      computed: {
        ...mapGetters([
          'groupDefaultRouteObject'
        ])
      },
      methods: {
        confirmDelete: function () {
          let id = this.$route.params[GlobalEntityIdentifier]
          ApiOperations.del(EntityTypes.ORDER_ADJUSTMENT, id).then(result => {
            Notifications.success(this)
            this.$router.push({name: this.groupDefaultRouteObject(this.$route).name})
          })
        },
        setActions: function () {
          if (this.$route.params[GlobalEntityIdentifier]) {
            let id = this.$route.params[GlobalEntityIdentifier]
            this.actions = this.alwaysActions.concat([
              {
                name: 'Edit',
                icon: 'fa fa-edit',
                path: RouteObjectHelper.createPath(EntityTypes.ORDER_ADJUSTMENT, 'edit') + '/' + id
              },
              {
                name: 'View',
                icon: 'fa fa-eye',
                path: RouteObjectHelper.createPath(EntityTypes.ORDER_ADJUSTMENT, 'view') + '/' + id
              }
            ])
          } else {
            this.actions = this.alwaysActions
          }
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