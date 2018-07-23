<template>
  <div>
    <mau-crud-list>
      <persona-data-table :apiUrl="apiUrl"
                      :actions="actions"
                      @actionClicked="actionHandler"
      >
      </persona-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  import PersonaDataTable from 'renderer/api/components/generic/persona/PersonaDataTable.vue'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  export default {
    name: 'ListSupplier',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.SUPPLIER),
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
            name: 'ViewSupplier',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
