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
            title: ExpensePropertiesReference.SUBTOTAL.title,
            name: ExpensePropertiesReference.SUBTOTAL.name,
            filterType: 'text'
          },
          {
            title: ExpensePropertiesReference.TAX.title,
            name: ExpensePropertiesReference.TAX.name,
            filterType: 'text'
          },
          {
            title: ExpensePropertiesReference.TOTAL.title,
            name: ExpensePropertiesReference.TOTAL.name
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
          },
          {
            title: ExpensePropertiesReference.EXPENSE_STATUS.title,
            name: ExpensePropertiesReference.EXPENSE_STATUS.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.EXPENSE_STATUS.apiName,
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
            title: ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.title,
            name: ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.EXPENSE_INVOICE_PAYMENT_METHOD.apiName,
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
            title: ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.title,
            name: ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.EXPENSE_INVOICE_CDFI_USE.apiName,
            entityFieldName: 'name'
          },
          {
            title: ExpensePropertiesReference.INVOICE_CODE.title,
            name: ExpensePropertiesReference.INVOICE_CODE.name,
            filterType: 'text'
          },
          {
            name: ExpensePropertiesReference.INVOICE_PAID_DATE.name,
            title: ExpensePropertiesReference.INVOICE_PAID_DATE.title,
            sortField: ExpensePropertiesReference.INVOICE_PAID_DATE.name,
            callback: DisplayFunctions.getDate,
            filterType: 'date'
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
