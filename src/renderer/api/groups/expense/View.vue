<template>
  <div class="container">
      <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
      <mau-entity-petitioner
              :id="id"
              :entityType="entityType"
              @entityResult="entityResultHandler"
      >
      </mau-entity-petitioner>
      <mau-property-viewer v-if="entity" :entity="entity" :properties="properties"></mau-property-viewer>
  </div>
</template>

<script>
  import ExpensePropertiesReference from 'renderer/api/propertiesReference/ExpensePropertiesReference'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import EntityType from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ViewExpense',
    data () {
      return {
        entity: null,
        entityType: EntityType.EXPENSE,
        properties: [
          {
            title: ExpensePropertiesReference.DATE.title,
            name: ExpensePropertiesReference.DATE.name,
            display: DisplayFunctions.getDate
          },
          {
            title: ExpensePropertiesReference.SUBTOTAL.title,
            name: ExpensePropertiesReference.SUBTOTAL.name,
            display: DisplayFunctions.getValue
          },
          {
            title: ExpensePropertiesReference.TOTAL.title,
            name: ExpensePropertiesReference.TOTAL.name,
            display: DisplayFunctions.getValue
          },
          {
            title: ExpensePropertiesReference.DESCRIPTION.title,
            name: ExpensePropertiesReference.DESCRIPTION.name,
            display: DisplayFunctions.getValue
          },
          {
            title: ExpensePropertiesReference.EXPENSE_TYPE.title,
            name: ExpensePropertiesReference.EXPENSE_TYPE.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ExpensePropertiesReference.EXPENSE_CATEGORY.title,
            name: ExpensePropertiesReference.EXPENSE_CATEGORY.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ExpensePropertiesReference.EXPENSE_SUBCATEGORY.title,
            name: ExpensePropertiesReference.EXPENSE_SUBCATEGORY.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.title,
            name: ExpensePropertiesReference.EXPENSE_MONEY_SOURCE.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ExpensePropertiesReference.BRANCH.title,
            name: ExpensePropertiesReference.BRANCH.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ExpensePropertiesReference.SUPPLIER.title,
            name: ExpensePropertiesReference.SUPPLIER.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ExpensePropertiesReference.EXPENSE_STATUS.title,
            name: ExpensePropertiesReference.EXPENSE_STATUS.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.title,
            name: ExpensePropertiesReference.EXPENSE_INVOICE_STATUS.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.title,
            name: ExpensePropertiesReference.EXPENSE_INVOICE_CDFI_USE.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.title,
            name: ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_FORM.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.title,
            name: ExpensePropertiesReference.EXPENSE_INVOICE_PAYMENT_METHOD.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.title,
            name: ExpensePropertiesReference.EXPENSE_INVOICE_TYPE.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ExpensePropertiesReference.INVOICE_PAID_DATE.title,
            name: ExpensePropertiesReference.INVOICE_PAID_DATE.name,
            display: DisplayFunctions.getDate
          },
          {
            title: ExpensePropertiesReference.INVOICE_CODE.title,
            name: ExpensePropertiesReference.INVOICE_CODE.name,
            display: DisplayFunctions.getValue
          }
        ]
      }
    },
    components: {
      MauSpinner,
      MauEntityPetitioner,
      MauPropertyViewer
    },
    props: {
      id: null
    },
    methods: {
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      }
    }
  }
</script>

<style lang="scss">

</style>
