<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-entity-view v-if="entity" :entity="entity" :propertiesReference="propertiesReference"></mau-entity-view>
  </div>
</template>

<script>
  import PropertiesReference from 'renderer/api/propertiesReference/OrderSaleRequestPropertiesReference'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ViewOrderSaleRequest',
    components: {
      MauEntityPetitioner,
      MauSpinner},
    data () {
      return {
        propertiesReference: [
          PropertiesReference.ORDER_CODE,
          PropertiesReference.DATE_REQUESTED,
          PropertiesReference.CLIENT,
          PropertiesReference.PRODUCTS
        ],
        entityType: EntityTypes.ORDER_SALE_REQUEST,
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
