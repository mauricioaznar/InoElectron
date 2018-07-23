<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-entity-view v-if="entity" :entity="entity" :propertiesReference="propertiesReference"></mau-entity-view>
    <a class="btn-submit btn col-md-3 col-sm-12 py-2"
       :href="pdfRoute">
      Comprobante de pago
    </a>
  </div>
</template>

<script>
  import BagOrderSaleReceiptPropertiesReference from 'renderer/api/propertiesReference/BagOrderSaleReceiptPropertiesReference'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/components/mau-components/mau-entity-petitioner/MauEntityPetitioner.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  export default {
    name: 'ViewBagOrderSaleReceipt',
    components: {
      MauEntityPetitioner,
      MauSpinner},
    data () {
      return {
        propertiesReference: [
          BagOrderSaleReceiptPropertiesReference.ORDER_CODE,
          BagOrderSaleReceiptPropertiesReference.DATE,
          BagOrderSaleReceiptPropertiesReference.BAGS
        ],
        entityType: EntityTypes.BAG_ORDER_SALE_RECEIPT,
        entity: null,
        pdfRoute: ApiUrls.createBaseUrl(EntityTypes.AUTH) + '/downloads/pdf/' + this.id
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
