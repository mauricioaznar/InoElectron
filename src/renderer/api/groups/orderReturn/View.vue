<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-property-viewer v-if="entity" :entity="entity" :properties="properties"></mau-property-viewer>
  </div>
</template>

<script>
  import OrderReturnPropertiesReference from 'renderer/api/propertiesReference/OrderReturnPropertiesReference'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ViewOrderReturn',
    data () {
      return {
        entityType: EntityTypes.ORDER_RETURN,
        properties: [
          {
            title: OrderReturnPropertiesReference.DATE.title,
            name: OrderReturnPropertiesReference.DATE.name,
            display: DisplayFunctions.getValue
          },
          {
            title: OrderReturnPropertiesReference.QUANTITY.title,
            name: OrderReturnPropertiesReference.QUANTITY.name,
            display: DisplayFunctions.getDate
          },
          {
            title: OrderReturnPropertiesReference.ORDER_RETURN_TYPE.title,
            name: OrderReturnPropertiesReference.ORDER_RETURN_TYPE.name,
            display: DisplayFunctions.getNameFromObject
          }
        ],
        entity: null
      }
    },
    components: {
      MauEntityPetitioner,
      MauSpinner,
      MauPropertyViewer
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
