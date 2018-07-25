<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-entity-view v-if="entity" :entity="entity" :propertiesReference="propertiesReference"></mau-entity-view>
  </div>
</template>

<script>
  import OrderPropertiesReference from 'renderer/api/propertiesReference/BagOrderPropertiesReference'
  import OrderAdjustmentPropertiesReference from 'renderer/api/propertiesReference/BagOrderAdjustmentPropertiesReference'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/components/mau-components/mau-entity-petitioner/MauEntityPetitioner.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    components: {
      MauEntityPetitioner,
      MauSpinner},
    name: 'ViewOrderAdjustment',
    data () {
      return {
        propertiesReference: [
          OrderPropertiesReference.ORDER_CODE,
          OrderPropertiesReference.DATE,
          OrderPropertiesReference.BAGS,
          OrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE
        ],
        entityType: EntityTypes.BAG_ORDER_ADJUSTMENT,
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
