<template>
    <div>
        <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
        <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
        <mau-crud-del
                v-if="entity"
                :entity="entity"
                :id="id"
                :entityType="entityType">
        </mau-crud-del>
    </div>
</template>

<script>
  import Entities from 'renderer/api/EntityTypes'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  export default {
    name: 'DelOrderAdjustment',
    data () {
      return {
        entityType: Entities.ORDER_ADJUSTMENT,
        entity: null
      }
    },
    components: {
      MauEntityPetitioner,
      MauSpinner
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
