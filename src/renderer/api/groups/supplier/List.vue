<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :actions="actions"
                      @actionClicked="actionHandler"
                      :localStoragePrefix="'supplierList'"
      ></mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import SupplierPropertiesReference from 'renderer/api/propertiesReference/SupplierPropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  export default {
    name: 'ListSupplier',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.SUPPLIER.apiName, {paginate: true}),
        actions: [
          {
            name: 'view',
            title: 'Ver',
            icon: 'fa fa-eye'
          }
        ],
        tableFields: [
          {
            title: SupplierPropertiesReference.NAME.title,
            name: SupplierPropertiesReference.NAME.name,
            callback: DisplayFunctions.getValue,
            filterType: 'text'
          },
          {
            title: SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.title,
            name: SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: 'defaultExpenseType',
            entityFieldName: 'name'
          },
          {
            title: SupplierPropertiesReference.DEFAULT_BRANCH.title,
            name: SupplierPropertiesReference.DEFAULT_BRANCH.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: 'defaultBranch',
            entityFieldName: 'name'
          },
          {
            title: SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.title,
            name: SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: 'defaultExpenseSubcategory',
            entityFieldName: 'name'
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
            name: 'ViewSupplier',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
