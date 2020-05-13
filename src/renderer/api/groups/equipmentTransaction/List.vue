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
  import EquipmentTransactionPropertiesReference from 'renderer/api/propertiesReference/EquipmentTransactionPropertiesReference'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ListProduct',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.EQUIPMENT_TRANSACTION.apiName, {paginate: true}),
        tableFields: [
          {
            name: GlobalEntityIdentifier,
            title: GlobalEntityIdentifier,
            filterType: 'text',
            dataClass: 'text-center'
          },
          {
            name: EquipmentTransactionPropertiesReference.DATE_EMITTED.name,
            title: EquipmentTransactionPropertiesReference.DATE_EMITTED.title,
            filterType: 'text',
            dataClass: 'text-center'
          },
          {
            name: EquipmentTransactionPropertiesReference.DESCRIPTION.name,
            title: EquipmentTransactionPropertiesReference.DESCRIPTION.title,
            filterType: 'text'
          },
          {
            name: EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_ITEMS.name,
            title: 'Items',
            callback: DisplayFunctions.getItemsWithQuantity
          },
          {
            title: EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_TYPE.title,
            name: EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_TYPE.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.EQUIPMENT_TRANSACTION_TYPE.apiName,
            entityFieldName: 'name'
          },
          {
            title: EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_STATUS.title,
            name: EquipmentTransactionPropertiesReference.EQUIPMENT_TRANSACTION_STATUS.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.EQUIPMENT_TRANSACTION_STATUS.apiName,
            entityFieldName: 'name'
          },
          {
            title: EquipmentTransactionPropertiesReference.BRANCH.title,
            name: EquipmentTransactionPropertiesReference.BRANCH.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.BRANCH.apiName,
            entityFieldName: 'name'
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
