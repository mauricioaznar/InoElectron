<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :actions="actions"
                      @actionClicked="actionHandler"
                      :localStoragePrefix="'invoiceExpenseList'"
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
    name: 'ListInvoiceExpense',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.INVOICE_EXPENSE.apiName, {paginate: true, filterExacts: {expense_type_id: 2}}),
        actions: [
          {
            name: 'view',
            title: 'Ver',
            icon: 'fa fa-eye'
          }
        ],
        tableFields: [
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
            title: ExpensePropertiesReference.SUPPLIER.title,
            name: ExpensePropertiesReference.SUPPLIER.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.SUPPLIER.apiName,
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
            title: ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.title,
            name: ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.EXPENSE_INVOICE_STATUS.apiName,
            entityFieldName: 'name'
          },
          {
            title: ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.title,
            name: ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.EXPENSE_INVOICE_TYPE.apiName,
            entityFieldName: 'name'
          },
          {
            title: ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.title,
            name: ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.EXPENSE_INVOICE_PAYMENT_FORM.apiName,
            entityFieldName: 'name'
          },
          {
            title: ExpensePropertiesReference.INVOICE_CODE.title,
            name: ExpensePropertiesReference.INVOICE_CODE.name,
            filterType: 'text'
          },
          {
            title: ExpensePropertiesReference.INTERNAL_CODE.title,
            name: ExpensePropertiesReference.INTERNAL_CODE.name,
            filterType: 'text'
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
            name: 'ViewInvoiceExpense',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
