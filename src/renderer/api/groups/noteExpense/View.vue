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
    name: 'ViewNoteExpense',
    data () {
      return {
        entity: null,
        entityType: EntityType.NOTE_EXPENSE,
        properties: [
          {
            title: ExpensePropertiesReference.DATE_PAID.title,
            name: ExpensePropertiesReference.DATE_PAID.name,
            display: DisplayFunctions.getDate
          },
          {
            title: ExpensePropertiesReference.SUPPLIER.title,
            name: ExpensePropertiesReference.SUPPLIER.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ExpensePropertiesReference.EXPENSE_ITEMS.title,
            name: ExpensePropertiesReference.EXPENSE_ITEMS.name,
            display: DisplayFunctions.getExpenseItems
          },
          {
            title: ExpensePropertiesReference.COMMENTS.title,
            name: ExpensePropertiesReference.COMMENTS.name,
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
