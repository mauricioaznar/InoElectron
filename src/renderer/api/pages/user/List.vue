<template>
  <div>
    <mau-crud-list :entityName="'User'">
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :editFunction="canEdit ? editFunction : null"
                      :viewFunction="viewFunction"
      ></mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  import PropertiesReference from './PropertiesReference'
  import TableFields from './TableFields'
  export default {
    name: 'ListUser',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.USER),
        canEdit: true,
        tableFields: TableFields
      }
    },
    components: {
    },
    methods: {
      viewFunction: function (client) {
        this.$router.push({
          name: 'ViewUser',
          params: { id: client[PropertiesReference.ID.name] }})
      },
      editFunction: function (client) {
        this.$router.push(
          {name: 'EditUser',
            params: { id: client[PropertiesReference.ID.name] }})
      }
    }
  }
</script>
