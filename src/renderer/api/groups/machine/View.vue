<template>
  <div class="container">
      <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
      <mau-entity-petitioner
              :id="id"
              :entityType="entityType"
              @entityResult="entityResultHandler"
      >
      </mau-entity-petitioner>
      <mau-property-viewer v-if="entity" :entity="entity" :properties="properties"></mau-property-viewer>
  </div>
</template>

<script>
  import MachinePropertiesReference from 'renderer/api/propertiesReference/MachinePropertiesReference'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import EntityType from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ViewMachine',
    data () {
      return {
        entity: null,
        entityType: EntityType.MACHINE,
        properties: [
          {
            title: MachinePropertiesReference.NAME.title,
            name: MachinePropertiesReference.NAME.name,
            display: DisplayFunctions.getValue
          },
          {
            title: MachinePropertiesReference.MACHINE_TYPE.title,
            name: MachinePropertiesReference.MACHINE_TYPE.name,
            display: DisplayFunctions.getNameFromObject
          }
        ]
      }
    },
    components: {
      MauSpinner,
      MauEntityPetitioner,
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

<style lang="scss">

</style>
