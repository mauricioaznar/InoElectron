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
  import PropertiesReference from 'renderer/api/propertiesReference/BagOrderPropertiesReference'
  export default {
    name: 'ViewBagOrderProduction',
    data () {
      return {
        propertiesReference: [
          PropertiesReference.ORDER_CODE,
          PropertiesReference.DATE,
          PropertiesReference.BAGS
        ]
      }
    },
    props: {
      id: null
    }
  }
</script>
