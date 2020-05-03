<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :actions="actions"
                      @actionClicked="actionHandler"
                      :localStoragePrefix="'equipmentTransactionList'"
      >
      </mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import PropertiesReference from 'renderer/api/propertiesReference/EquipmentTransactionPropertiesReference'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  export default {
    name: 'ListProduct',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.EQUIPMENT_TRANSACTION.apiName, {paginate: true}),
        tableFields: [
          {
            name: PropertiesReference.DATE_EMITTED.name,
            title: PropertiesReference.DATE_EMITTED.title,
            filterType: 'text',
            dataClass: 'text-center'
          }
        ],
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
      MauDataTable
    },
    methods: {
      actionHandler: function (action, entityObj) {
        if (action.name === 'view') {
          this.$router.push({
            name: 'ViewEquipmentTransaction',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
