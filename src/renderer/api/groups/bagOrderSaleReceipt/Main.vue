<template>
    <div>
        <action-widget
                :actions="actions"
                @actionClicked="actionClicked"
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
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import Notifications from 'renderer/services/api/Notifications'
  import ApiOperations from 'renderer/services/api/ApiOperations'
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
        ],
        urlActions: [],
        alwaysUrlActions: [
          {
            name: 'Excel',
            icon: 'fa fa-file-excel-o',
            url: ApiUrls.createExcelDownloadsUrl()
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
          this.$router.push({name: RouteObjectHelper.createName(EntityTypes.BAG_ORDER_SALE_RECEIPT, 'create')})
        }
        if (action.name === 'Edit') {
          let id = this.$route.params[GlobalEntityIdentifier]
          this.$router.push({
            name: RouteObjectHelper.createName(EntityTypes.BAG_ORDER_SALE_RECEIPT, 'edit'),
            params: {
              [GlobalEntityIdentifier]: id
            }})
        }
        if (action.name === 'View') {
          let id = this.$route.params[GlobalEntityIdentifier]
          this.$router.push({
            name: RouteObjectHelper.createName(EntityTypes.BAG_ORDER_SALE_RECEIPT, 'view'),
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
              name: 'Edit',
              icon: 'fa fa-edit'
            },
            {
              name: 'Del',
              icon: 'fa fa-trash-o'
            },
            {
              name: 'View',
              icon: 'fa fa-eye'
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
        ApiOperations.del(EntityTypes.BAG_ORDER_SALE_RECEIPT, id).then(result => {
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