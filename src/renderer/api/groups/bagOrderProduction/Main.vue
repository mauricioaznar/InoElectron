<template>
    <div>
        <action-widget
                :actions="actions"
                @actionClicked="actionClicked"
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
            icon: 'fa fa-plus'
          }
        ]
      }
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    methods: {
      actionClicked: function (action) {
        if (action.name === 'Create') {
          let createName = RouteObjectHelper.createName(EntityTypes.BAG_ORDER_PRODUCTION, 'create')
          this.$router.push({name: createName})
        }
        if (action.name === 'View') {
          let id = this.$route.params[GlobalEntityIdentifier]
          this.$router.push({
            name: RouteObjectHelper.createName(EntityTypes.BAG_ORDER_PRODUCTION, 'view'),
            params: {
              [GlobalEntityIdentifier]: id
            }})
        }
        if (action.name === 'Edit') {
          let id = this.$route.params[GlobalEntityIdentifier]
          this.$router.push({
            name: RouteObjectHelper.createName(EntityTypes.BAG_ORDER_PRODUCTION, 'edit'),
            params: {
              [GlobalEntityIdentifier]: id
            }})
        }
        if (action.name === 'Del') {
          this.$refs.confirmDelete.show()
        }
      },
      setActions: function () {
        if (this.$route.params[GlobalEntityIdentifier]) {
          this.actions = this.alwaysActions.concat([
            {
              name: 'Del',
              icon: 'fa fa-trash-o'
            },
            {
              name: 'View',
              icon: 'fa fa-eye'
            },
            {
              name: 'Edit',
              icon: 'fa fa-edit'
            }
          ])
        } else {
          this.actions = this.alwaysActions
        }
      },
      confirmDelete: function () {
        let id = this.$route.params[GlobalEntityIdentifier]
        ApiOperations.del(EntityTypes.BAG_ORDER_PRODUCTION, id).then(result => {
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