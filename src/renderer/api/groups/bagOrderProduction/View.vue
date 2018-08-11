<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-entity-view v-if="entity" :entity="entity" :propertiesReference="propertiesReference"></mau-entity-view>
  </div>
</template>

<script>
  import BagOrderProductionPropertiesReference from 'renderer/api/propertiesReference/BagOrderProductionPropertiesReference'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ViewBagOrderProduction',
    components: {
      MauEntityPetitioner,
      MauSpinner},
    data () {
      return {
        propertiesReference: [
          BagOrderProductionPropertiesReference.PRODUCTS,
          BagOrderProductionPropertiesReference.EMPLOYEE,
          BagOrderProductionPropertiesReference.MACHINE
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
