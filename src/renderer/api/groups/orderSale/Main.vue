<template>
    <div>
        <action-widget
                :actions="actions"
                :urlActions="urlActions"
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
  import ApiUrls from 'renderer/api/functions/ApiUrls'
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
            path: RouteObjectHelper.createPath(EntityTypes.ORDER_SALE, 'create')
          }
        ],
        urlActions: [],
        alwaysUrlActions: [
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
              path: RouteObjectHelper.createPath(EntityTypes.ORDER_SALE, 'edit') + '/' + id
            },
            {
              name: 'View',
              icon: 'fa fa-eye',
              path: RouteObjectHelper.createPath(EntityTypes.ORDER_SALE, 'view') + '/' + id
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
        ApiOperations.del(EntityTypes.ORDER_SALE, id).then(result => {
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