<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :actions="actions"
                      @actionClicked="actionHandler"
                      :localStoragePrefix="'expenseList'"
      ></mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import ExpensePropertiesReference from 'renderer/api/propertiesReference/ExpensePropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  export default {
    name: 'ListExpense',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.EXPENSE.apiName, {paginate: true}),
        actions: [
          {
            name: 'view',
            title: 'Ver',
            icon: 'fa fa-eye'
          }
        ],
        tableFields: [
          {
            title: ExpensePropertiesReference.DESCRIPTION.title,
            name: ExpensePropertiesReference.DESCRIPTION.name,
            filterType: 'text'
          },
          {
            name: ExpensePropertiesReference.DATE.name,
            title: ExpensePropertiesReference.DATE.title,
            sortField: ExpensePropertiesReference.DATE.name,
            callback: DisplayFunctions.getDate,
            filterType: 'date'
          },
          {
            title: ExpensePropertiesReference.TOTAL.title,
            name: ExpensePropertiesReference.TOTAL.name,
            filterType: 'text'
          },
          {
            title: ExpensePropertiesReference.EXPENSE_TYPE.title,
            name: ExpensePropertiesReference.EXPENSE_TYPE.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.EXPENSE_TYPE.apiName,
            entityFieldName: 'name'
          },
          {
            title: ExpensePropertiesReference.EXPENSE_CATEGORY.title,
            name: ExpensePropertiesReference.EXPENSE_CATEGORY.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.EXPENSE_CATEGORY.apiName,
            entityFieldName: 'name'
          },
          {
            title: ExpensePropertiesReference.EXPENSE_SUBCATEGORY.title,
            name: ExpensePropertiesReference.EXPENSE_SUBCATEGORY.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.EXPENSE_SUBCATEGORY.apiName,
            entityFieldName: 'name'
          },
          {
            title: ExpensePropertiesReference.EXPENSE_BRANCH.title,
            name: ExpensePropertiesReference.EXPENSE_BRANCH.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.EXPENSE_BRANCH.apiName,
            entityFieldName: 'name'
          },
          {
            title: ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.title,
            name: ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.EXPENSE_MONEY_SOURCE.apiName,
            entityFieldName: 'name'
          },
          {
            title: ExpensePropertiesReference.SUPPLIER.title,
            name: ExpensePropertiesReference.SUPPLIER.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.SUPPLIER.apiName,
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
            name: 'ViewExpense',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
