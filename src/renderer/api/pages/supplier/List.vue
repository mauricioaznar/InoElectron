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
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  import PersonaDataTable from 'renderer/api/components/generic/persona/PersonaDataTable.vue'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  export default {
    name: 'ListSupplier',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.SUPPLIER)
      }
    },
    components: {
      PersonaDataTable
    },
    methods: {
      viewFunction: function (supplier) {
        this.$router.push({
          name: 'ViewSupplier',
          params: { id: supplier[GlobalEntityIdentifier] }})
      },
      editFunction: function (supplier) {
        this.$router.push({
          name: 'EditSupplier',
          params: { id: supplier[GlobalEntityIdentifier] }})
      }
    }
  }
</script>
