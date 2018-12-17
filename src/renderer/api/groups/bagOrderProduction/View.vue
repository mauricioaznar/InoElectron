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
  import EntityTypes from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ViewBagOrderProduction',
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
            title: OrderProductionPropertiesReference.EMPLOYEE.title,
            name: OrderProductionPropertiesReference.EMPLOYEE.name,
            display: DisplayFunctions.getPersona
          },
          {
            title: 'Maquina',
            name: OrderProductionPropertiesReference.MACHINES.name,
            display: DisplayFunctions.getFirstNameFromArray
          },
          {
            title: 'Productos',
            name: OrderProductionPropertiesReference.PRODUCTS.name,
            display: DisplayFunctions.getProducts
          },
          {
            title: OrderProductionPropertiesReference.WASTE.title,
            name: OrderProductionPropertiesReference.WASTE.name,
            display: DisplayFunctions.getValue
          }
        ],
        entityType: EntityTypes.BAG_ORDER_PRODUCTION,
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
