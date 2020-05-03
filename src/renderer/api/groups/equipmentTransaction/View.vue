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
  import EquipmentTransactionPropertiesReference from 'renderer/api/propertiesReference/EquipmentTransactionPropertiesReference'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer.vue'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ViewProduct',
    data () {
      return {
        properties: [
          {
            title: EquipmentTransactionPropertiesReference.DATE_EMITTED.title,
            name: EquipmentTransactionPropertiesReference.DATE_EMITTED.name,
            display: DisplayFunctions.getDate
          }
        ],
        entityType: EntityTypes.EQUIPMENT_TRANSACTION,
        isRequestedEntityLoading: true,
        entity: null
      }
    },
    created () {
    },
    components: {
      MauEntityPetitioner,
      MauSpinner,
      MauPropertyViewer
    },
    methods: {
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      }
    },
    props: {
      id: null
    }
  }
</script>

<style lang="scss">

</style>
