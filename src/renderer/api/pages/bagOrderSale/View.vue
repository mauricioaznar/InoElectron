<template>
  <div class="container">
    <mau-crud-view>
      <template slot-scope="params">
        <mau-entity-view :entity="params.entity" :propertiesReference="propertiesReference"></mau-entity-view>
      </template>
    </mau-crud-view>
  </div>
</template>

<script>
  import OrderSalePropertiesReference from 'renderer/api/propertiesReference/BagOrderSalePropertiesReference'
  export default {
    name: 'ViewBagOrderSale',
    data () {
      return {
        propertiesReference: [
          OrderSalePropertiesReference.ORDER_CODE,
          OrderSalePropertiesReference.BAGS,
          OrderSalePropertiesReference.DATE,
          OrderSalePropertiesReference.CLIENT
        ]
      }
    },
    props: {
      id: null
    }
  }
</script>
