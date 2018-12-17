<template>
  <div>
    <mau-crud-list>
      <persona-data-table :apiUrl="apiUrl"
                      :actionClicked="actionHandler"
                      :actions="actions"
                      :employeeMode="true"
      >
      </persona-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import ApiUrls from 'renderer/api/functions/ApiUrls'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import PersonaDataTable from 'renderer/api/components/dataTables/PersonaDataTable.vue'
  export default {
    name: 'ListClient',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.EMPLOYEE),
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
            name: 'ViewEmployee',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
