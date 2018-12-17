<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-property-viewer v-if="entity" :entity="entity" :properties="properties"></mau-property-viewer>
  </div>
</template>

<script>
  import BagOrderAdjustmentPropertiesReference from 'renderer/api/propertiesReference/OrderAdjustmentPropertiesReference'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer.vue'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    components: {
      MauEntityPetitioner,
      MauSpinner,
      MauPropertyViewer
    },
    name: 'ViewOrderAdjustment',
    data () {
      return {
        properties: [
          {
            title: BagOrderAdjustmentPropertiesReference.DATE.title,
            name: BagOrderAdjustmentPropertiesReference.DATE.name,
            display: DisplayFunctions.getDate
          },
          {
            title: BagOrderAdjustmentPropertiesReference.PRODUCTS.title,
            name: BagOrderAdjustmentPropertiesReference.PRODUCTS.name,
            display: DisplayFunctions.getProducts
          },
          {
            title: BagOrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.title,
            name: BagOrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.name,
            display: DisplayFunctions.getNameFromObject
          }
        ],
        entityType: EntityTypes.ORDER_ADJUSTMENT,
        entity: null
      }
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
