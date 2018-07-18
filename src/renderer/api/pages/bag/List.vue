<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :editFunction="canEdit ? editFunction : null"
                      :viewFunction="viewFunction"
      >
      </mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import TableFields from './BagTableFields'
  import PropertiesReference from 'renderer/api/propertiesReference/BagPropertiesReference'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ListBag',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.BAG),
        canEdit: true,
        tableFields: TableFields
      }
    },
    components: {
    },
    methods: {
      viewFunction: function (entity) {
        this.$router.push({
          name: 'ViewBag',
          params: { id: entity[PropertiesReference.ID.name] }})
      },
      editFunction: function (entity) {
        this.$router.push(
          {name: 'EditBag',
            params: { id: entity[PropertiesReference.ID.name] }})
      }
    }
  }
</script>
