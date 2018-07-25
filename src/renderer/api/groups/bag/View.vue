<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner
            :id="id"
            :entityType="entityType"
            @entityResult="entityResultHandler"
    >
    </mau-entity-petitioner>
    <mau-entity-view
            v-if="entity"
            :entity="entity"
            :propertiesReference="propertiesReference">
    </mau-entity-view>
  </div>
</template>

<script>
  import PropertiesReference from 'renderer/api/propertiesReference/BagPropertiesReference'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauEntityPetitioner from 'renderer/components/mau-components/mau-entity-petitioner/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import AppActions from 'renderer/app/store/AppActions'
  export default {
    name: 'ViewBag',
    data () {
      return {
        propertiesReference: [
          PropertiesReference.NAME,
          PropertiesReference.DESCRIPTION,
          PropertiesReference.CURRENT_UNIT_PRICE,
          PropertiesReference.CURRENT_GROUP_WEIGHT,
          PropertiesReference.WIDTH,
          PropertiesReference.LENGTH,
          PropertiesReference.BAG_TYPE,
          PropertiesReference.BAG_PACKING
        ],
        entityType: EntityTypes.BAG,
        isRequestedEntityLoading: true,
        entity: null
      }
    },
    created () {
      this.$store.dispatch(AppActions.SET_IS_ROUTE_OBJECT_LOADING, true)
    },
    components: {
      MauEntityPetitioner,
      MauSpinner
    },
    methods: {
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
        this.$store.dispatch(AppActions.SET_IS_ROUTE_OBJECT_LOADING, false)
      }
    },
    props: {
      id: null
    }
  }
</script>

<style lang="scss">

</style>
