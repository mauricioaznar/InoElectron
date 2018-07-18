<template>
  <div>
    <mau-crud-list>
      <persona-data-table :apiUrl="apiUrl"
                      :editFunction="editFunction"
                      :viewFunction="viewFunction"
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
        apiUrl: ApiUrls.createListUrl(EntityTypes.CLIENT)
      }
    },
    components: {
      PersonaDataTable
    },
    methods: {
      viewFunction: function (client) {
        this.$router.push({
          name: 'ViewClient',
          params: { id: client[GlobalEntityIdentifier] }})
      },
      editFunction: function (client) {
        this.$router.push({
          name: 'EditClient',
          params: { id: client[GlobalEntityIdentifier] }})
      }
    }
  }
</script>
