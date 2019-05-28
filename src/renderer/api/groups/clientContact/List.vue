<template>
  <div>
    <mau-crud-list>
      <persona-data-table :apiUrl="apiUrl"
                      :actionClicked="actionHandler"
                      :actions="actions"
                      :clientContactMode="true"
                      :localStoragePrefix="'clientList'"
      >
      </persona-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import PersonaDataTable from 'renderer/api/components/dataTables/PersonaDataTable.vue'
  export default {
    name: 'ListClientContact',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.CLIENT_CONTACT.apiName, {paginate: true}),
        actions: [
          {
            name: 'view',
            title: 'Ver',
            icon: 'fa fa-eye'
          }
        ]
      }
    },
    components: {
      PersonaDataTable
    },
    methods: {
      actionHandler: function (action, entityObj) {
        if (action.name === 'view') {
          this.$router.push({
            name: 'ViewClientContact',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
