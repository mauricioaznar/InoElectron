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
            title: ExpensePropertiesReference.NAME.title,
            name: ExpensePropertiesReference.NAME.name,
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
            title: ExpensePropertiesReference.EXPENSE_BRANCH.title,
            name: ExpensePropertiesReference.EXPENSE_BRANCH.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ExpensePropertiesReference.SUPPLIER.title,
            name: ExpensePropertiesReference.SUPPLIER.name,
            display: DisplayFunctions.getNameFromObject
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
