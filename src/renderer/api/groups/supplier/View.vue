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
  import SupplierPropertiesReference from 'renderer/api/propertiesReference/SupplierPropertiesReference'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import EntityType from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ViewSupplier',
    data () {
      return {
        entity: null,
        entityType: EntityType.SUPPLIER,
        properties: [
          {
            title: SupplierPropertiesReference.NAME.title,
            name: SupplierPropertiesReference.NAME.name,
            display: DisplayFunctions.getValue
          },
          {
            title: SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.title,
            name: SupplierPropertiesReference.DEFAULT_EXPENSE_TYPE.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: SupplierPropertiesReference.DEFAULT_EXPENSE_CATEGORY.title,
            name: SupplierPropertiesReference.DEFAULT_EXPENSE_CATEGORY.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.title,
            name: SupplierPropertiesReference.DEFAULT_EXPENSE_SUBCATEGORY.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: SupplierPropertiesReference.DEFAULT_EXPENSE_BRANCH.title,
            name: SupplierPropertiesReference.DEFAULT_EXPENSE_BRANCH.name,
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
