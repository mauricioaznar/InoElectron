<template>
    <div>
        <action-widget
                :actions="actions"
                :urlActions="urlActions"
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
  import ApiUrls from 'renderer/api/functions/ApiUrls'
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
            path: RouteObjectHelper.createPath(EntityTypes.ORDER_SALE_RECEIPT, 'create')
          }
        ],
        urlActions: [],
        alwaysUrlActions: [
        ]
      }
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    methods: {
      setActions: function () {
        if (this.$route.params[GlobalEntityIdentifier]) {
          let id = this.$route.params[GlobalEntityIdentifier]
          this.actions = this.alwaysActions.concat([
            {
              name: 'Edit',
              icon: 'fa fa-edit',
              path: RouteObjectHelper.createPath(EntityTypes.ORDER_SALE_RECEIPT, 'edit') + '/' + id
            },
            {
              name: 'View',
              icon: 'fa fa-eye',
              path: RouteObjectHelper.createPath(EntityTypes.ORDER_SALE_RECEIPT, 'view') + '/' + id
            }
          ])
        } else {
          this.actions = this.alwaysActions
        }
      },
      setUrlActions: function () {
        if (this.$route.params[GlobalEntityIdentifier]) {
          this.urlActions = this.alwaysUrlActions.concat([
            {
              name: 'PDF',
              icon: 'fa fa-file-pdf-o',
              url: ApiUrls.createPdfDownloadUrl(this.$route.params[GlobalEntityIdentifier])
            }
          ])
        } else {
          this.urlActions = this.alwaysUrlActions
        }
      },
      confirmDelete: function () {
        let id = this.$route.params[GlobalEntityIdentifier]
        ApiOperations.del(EntityTypes.ORDER_SALE_RECEIPT, id).then(result => {
          Notifications.success(this)
          this.$router.push({name: this.groupDefaultRouteObject(this.$route).name})
        })
      }
    },
    created () {
      this.setActions()
      this.setUrlActions()
    },
    watch: {
      $route: function () {
        this.setActions()
        this.setUrlActions()
      }
    }
  }
</script>