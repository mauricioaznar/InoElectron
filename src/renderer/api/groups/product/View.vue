<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner
            :id="id"
            :entityType="entityType"
            @entityResult="entityResultHandler"
    >
    </mau-entity-petitioner>
    <mau-property-viewer
            v-if="entity"
            :entity="entity"
            :properties="properties">
    </mau-property-viewer>
  </div>
</template>

<script>
  import ProductPropertiesReference from 'renderer/api/propertiesReference/ProductPropertiesReference'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer.vue'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import AppActions from 'renderer/app/store/AppActions'
  export default {
    name: 'ViewProduct',
    data () {
      return {
        properties: [
          {
            title: ProductPropertiesReference.PRODUCT_TYPE.title,
            name: ProductPropertiesReference.PRODUCT_TYPE.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ProductPropertiesReference.CODE.title,
            name: ProductPropertiesReference.CODE.name,
            display: DisplayFunctions.getValue
          },
          {
            title: ProductPropertiesReference.DESCRIPTION.title,
            name: ProductPropertiesReference.DESCRIPTION.name,
            display: DisplayFunctions.getValue
          },
          {
            title: ProductPropertiesReference.CURRENT_KILO_PRICE.title,
            name: ProductPropertiesReference.CURRENT_KILO_PRICE.name,
            display: DisplayFunctions.getValue
          },
          {
            title: ProductPropertiesReference.PACKING.title,
            name: ProductPropertiesReference.PACKING.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ProductPropertiesReference.MATERIAL.title,
            name: ProductPropertiesReference.MATERIAL.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ProductPropertiesReference.WIDTH.title,
            name: ProductPropertiesReference.WIDTH.name,
            display: DisplayFunctions.getValue
          }
        ],
        entityType: EntityTypes.PRODUCT,
        isRequestedEntityLoading: true,
        entity: null
      }
    },
    created () {
      this.$store.dispatch(AppActions.SET_IS_ROUTE_OBJECT_LOADING, true)
    },
    components: {
      MauEntityPetitioner,
      MauSpinner,
      MauPropertyViewer
    },
    methods: {
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
        let productTypeId = entityObj[ProductPropertiesReference.PRODUCT_TYPE.relationship_id_name]
        if (productTypeId === 1) {
          this.properties.push({
            title: ProductPropertiesReference.LENGTH.title,
            name: ProductPropertiesReference.LENGTH.name,
            display: DisplayFunctions.getValue
          })
          this.properties.push({
            title: ProductPropertiesReference.CURRENT_GROUP_WEIGHT.title,
            name: ProductPropertiesReference.CURRENT_GROUP_WEIGHT.name,
            display: DisplayFunctions.getValue
          })
          this.properties.push({
            title: ProductPropertiesReference.GROUP_WEIGHT_STRICT.title,
            name: ProductPropertiesReference.GROUP_WEIGHT_STRICT.name,
            display: DisplayFunctions.getThreeStateBoolean
          })
        }
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
