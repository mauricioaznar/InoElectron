<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-property-viewer v-if="entity" :entity="entity" :properties="properties"></mau-property-viewer>
  </div>
</template>

<script>
  import OrderProductionPropertiesReference from 'renderer/api/propertiesReference/OrderProductionPropertiesReference'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer.vue'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ViewRollOrderProduction',
    components: {
      MauEntityPetitioner,
      MauSpinner,
      MauPropertyViewer
    },
    data () {
      return {
        properties: [
          {
            title: OrderProductionPropertiesReference.START_DATE_TIME.title,
            name: OrderProductionPropertiesReference.START_DATE_TIME.name,
            display: DisplayFunctions.getDateTime
          },
          {
            title: OrderProductionPropertiesReference.END_DATE_TIME.title,
            name: OrderProductionPropertiesReference.END_DATE_TIME.name,
            display: DisplayFunctions.getDateTime
          },
          {
            title: OrderProductionPropertiesReference.PRODUCTS.title,
            name: OrderProductionPropertiesReference.PRODUCTS.name,
            display: DisplayFunctions.getProducts
          },
          {
            name: OrderProductionPropertiesReference.EMPLOYEES.name,
            title: OrderProductionPropertiesReference.EMPLOYEES.title,
            display: DisplayFunctions.getPersonaArray
          },
          {
            title: OrderProductionPropertiesReference.MACHINES.title,
            name: OrderProductionPropertiesReference.MACHINES.name,
            display: DisplayFunctions.getMachineNames
          },
          {
            title: OrderProductionPropertiesReference.WASTE.title,
            name: OrderProductionPropertiesReference.WASTE.name,
            display: DisplayFunctions.getValue
          },
          {
            title: OrderProductionPropertiesReference.PERFORMANCE.title,
            name: OrderProductionPropertiesReference.PERFORMANCE.name,
            display: DisplayFunctions.getPercentage
          }
        ],
        entityType: EntityTypes.ROLL_ORDER_PRODUCTION,
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
