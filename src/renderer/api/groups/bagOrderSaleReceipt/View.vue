<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-entity-view v-if="entity" :entity="entity" :propertiesReference="propertiesReference"></mau-entity-view>
  </div>
</template>

<script>
  import BagOrderSaleReceiptPropertiesReference from 'renderer/api/propertiesReference/BagOrderSaleReceiptPropertiesReference'
  import BagOrderSaleRequestPropertiesReference from 'renderer/api/propertiesReference/BagOrderSaleRequestPropertiesReference'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ViewBagOrderSaleReceipt',
    components: {
      MauEntityPetitioner,
      MauSpinner},
    data () {
      return {
        propertiesReference: [
          BagOrderSaleRequestPropertiesReference.ORDER_CODE,
          BagOrderSaleRequestPropertiesReference.DATE_REQUESTED,
          BagOrderSaleReceiptPropertiesReference.DATE_GIVEN,
          BagOrderSaleRequestPropertiesReference.CLIENT,
          BagOrderSaleReceiptPropertiesReference.RECEIPT_TYPE,
          BagOrderSaleReceiptPropertiesReference.BAGS
        ],
        entityType: EntityTypes.BAG_ORDER_SALE_RECEIPT,
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
