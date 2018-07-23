<template>
  <div>
    <mau-crud-list>
      <persona-data-table :apiUrl="apiUrl"
                      :actionClicked="actionHandler"
                      :actions="actions"
      >
      </persona-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  import PersonaDataTable from 'renderer/api/components/generic/persona/PersonaDataTable.vue'
  export default {
    name: 'ListClient',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.CLIENT),
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
            name: 'ViewClient',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
