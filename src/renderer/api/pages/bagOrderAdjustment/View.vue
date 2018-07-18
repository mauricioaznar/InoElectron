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
  import OrderPropertiesReference from 'renderer/api/propertiesReference/BagOrderPropertiesReference'
  import OrderAdjustmentPropertiesReference from 'renderer/api/propertiesReference/BagOrderAdjustmentPropertiesReference'
  export default {
    name: 'ViewOrderAdjustment',
    data () {
      return {
        propertiesReference: [
          OrderPropertiesReference.ORDER_CODE,
          OrderPropertiesReference.DATE,
          OrderPropertiesReference.BAGS,
          OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE
        ]
      }
    },
    props: {
      id: null
    }
  }
</script>
