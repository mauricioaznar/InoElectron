<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-property-viewer v-if="entity" :entity="entity" :properties="properties"></mau-property-viewer>
  </div>
</template>

<script>
  import OrderSalePropertiesReference from 'renderer/api/propertiesReference/OrderSalePropertiesReference'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ViewOrderSaleReceipt',
    components: {
      MauEntityPetitioner,
      MauSpinner,
      MauPropertyViewer
    },
    data () {
      return {
        properties: [
          {
            title: OrderSalePropertiesReference.ORDER_CODE.title,
            name: OrderSalePropertiesReference.ORDER_CODE.name,
            display: DisplayFunctions.getValue
          },
          {
            title: OrderSalePropertiesReference.DATE_REQUESTED.title,
            name: OrderSalePropertiesReference.DATE_REQUESTED.name,
            display: DisplayFunctions.getDate
          },
          {
            title: OrderSalePropertiesReference.DATE_GIVEN.title,
            name: OrderSalePropertiesReference.DATE_GIVEN.name,
            display: DisplayFunctions.getDate
          },
          {
            title: OrderSalePropertiesReference.RECEIPT_TYPE.title,
            name: OrderSalePropertiesReference.RECEIPT_TYPE.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: 'Productos solicitados',
            name: OrderSalePropertiesReference.PRODUCTS.name,
            display: DisplayFunctions.getOrderSaleProducts,
            arguments: [1]
          },
          {
            name: OrderSalePropertiesReference.PRODUCTS.name,
            title: 'Total solictado',
            hidden: true,
            display: DisplayFunctions.getOrderSaleTotalCost,
            arguments: [1]
          },
          {
            title: 'Productos entregados',
            name: OrderSalePropertiesReference.PRODUCTS.name,
            display: DisplayFunctions.getOrderSaleProducts,
            arguments: [2]
          },
          {
            name: OrderSalePropertiesReference.PRODUCTS.name,
            title: 'Total entregado',
            hidden: true,
            display: DisplayFunctions.getOrderSaleTotalCost,
            arguments: [2]
          },
          {
            title: OrderSalePropertiesReference.CLIENT.title,
            name: OrderSalePropertiesReference.CLIENT.name,
            display: DisplayFunctions.getNameFromObject
          }
        ],
        entityType: EntityTypes.ORDER_SALE_RECEIPT,
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
