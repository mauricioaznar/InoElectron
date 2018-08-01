<template>
    <div>
        <action-widget
                :actions="actions"
        ></action-widget>
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
              path: RouteObjectHelper.createPath(EntityTypes.BAG, 'create')
            }
          ]
        }
      },
      computed: {
        ...mapGetters(['groupDefaultRouteObject'])
      },
      methods: {
        actionClicked: function (action) {
        },
        setActions: function () {
          if (this.$route.params[GlobalEntityIdentifier]) {
            let id = this.$route.params[GlobalEntityIdentifier]
            this.actions = this.alwaysActions.concat([
              {
                name: 'Edit',
                icon: 'fa fa-edit',
                path: RouteObjectHelper.createPath(EntityTypes.BAG, 'edit') + '/' + id
              },
              {
                name: 'View',
                icon: 'fa fa-eye',
                path: RouteObjectHelper.createPath(EntityTypes.BAG, 'view') + '/' + id
              }
            ])
          } else {
            this.actions = this.alwaysActions
          }
        },
        confirmDelete: function () {
          let id = this.$route.params[GlobalEntityIdentifier]
          ApiOperations.del(EntityTypes.BAG, id).then(result => {
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