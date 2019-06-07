<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-property-viewer v-if="entity" :entity="entity" :properties="properties"></mau-property-viewer>
  </div>
</template>

<script>
  import OrderRequestPropertiesReference from 'renderer/api/propertiesReference/OrderRequestPropertiesReference'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ViewOrderRequest',
    data () {
      return {
        entityType: EntityTypes.ORDER_REQUEST,
        properties: [
          {
            title: OrderRequestPropertiesReference.ORDER_CODE.title,
            name: OrderRequestPropertiesReference.ORDER_CODE.name,
            display: DisplayFunctions.getValue
          },
          {
            title: OrderRequestPropertiesReference.DATE.title,
            name: OrderRequestPropertiesReference.DATE.name,
            display: DisplayFunctions.getDate
          },
          {
            title: OrderRequestPropertiesReference.ESTIMATED_DELIVERY_DATE.title,
            name: OrderRequestPropertiesReference.ESTIMATED_DELIVERY_DATE.name,
            display: DisplayFunctions.getDate
          },
          {
            title: OrderRequestPropertiesReference.CLIENT_CONTACT.title,
            name: OrderRequestPropertiesReference.CLIENT_CONTACT.name,
            display: DisplayFunctions.getPersona
          },
          {
            title: OrderRequestPropertiesReference.CLIENT.title,
            name: OrderRequestPropertiesReference.CLIENT.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.title,
            name: OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: OrderRequestPropertiesReference.ORDER_SALES_PRODUCTS_REQUESTED.title,
            name: OrderRequestPropertiesReference.ORDER_SALES_PRODUCTS_REQUESTED.name,
            display: DisplayFunctions.getOrderSalesProductsRequested
          },
          {
            title: OrderRequestPropertiesReference.ORDER_SALES_PRODUCTS_NOT_REQUESTED.title,
            name: OrderRequestPropertiesReference.ORDER_SALES_PRODUCTS_NOT_REQUESTED.name,
            display: DisplayFunctions.getOrderSalesProductsNotRequested
          },
          {
            title: OrderRequestPropertiesReference.TOTAL_COST.title,
            name: OrderRequestPropertiesReference.TOTAL_COST.name,
            display: DisplayFunctions.getValue
          }
        ],
        entity: null
      }
    },
    components: {
      MauEntityPetitioner,
      MauSpinner,
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
