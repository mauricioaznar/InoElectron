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
    name: 'ListNoteExpense',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.NOTE_EXPENSE.apiName, {paginate: true, filterExacts: {expense_type_id: 1}}),
        actions: [
          {
            name: 'view',
            title: 'Ver',
            icon: 'fa fa-eye'
          }
        ],
        tableFields: [
          {
            title: ExpensePropertiesReference.SUPPLIER.title,
            name: ExpensePropertiesReference.SUPPLIER.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.SUPPLIER.apiName,
            entityFieldName: 'name'
          },
          {
            name: ExpensePropertiesReference.DATE_PAID.name,
            title: ExpensePropertiesReference.DATE_PAID.title,
            sortField: ExpensePropertiesReference.DATE_PAID.name,
            callback: DisplayFunctions.getDate,
            filterType: 'date'
          },
          {
            title: ExpensePropertiesReference.EXPENSE_ITEMS.title,
            name: ExpensePropertiesReference.EXPENSE_ITEMS.name,
            callback: DisplayFunctions.getExpenseItems,
            filterType: 'entity',
            entityName: EntityTypes.EXPENSE_ITEM.apiName,
            entityFieldName: 'description'
          },
          {
            title: ExpensePropertiesReference.EXPENSE_STATUS.title,
            name: ExpensePropertiesReference.EXPENSE_STATUS.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.EXPENSE_STATUS.apiName,
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
            name: 'ViewNoteExpense',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
