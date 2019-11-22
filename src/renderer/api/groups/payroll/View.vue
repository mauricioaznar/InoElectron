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
  import PayrollPropertiesReference from 'renderer/api/propertiesReference/PayrollPropertiesReference'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import EntityType from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ViewPayroll',
    data () {
      return {
        entity: null,
        entityType: EntityType.PAYROLL,
        properties: [
          {
            title: PayrollPropertiesReference.START_DATE_TIME.title,
            name: PayrollPropertiesReference.START_DATE_TIME.name,
            display: DisplayFunctions.getValue
          },
          {
            title: PayrollPropertiesReference.END_DATE_TIME.title,
            name: PayrollPropertiesReference.END_DATE_TIME.name,
            display: DisplayFunctions.getValue
          },
          {
            title: PayrollPropertiesReference.MACHINE_TYPE.title,
            name: PayrollPropertiesReference.MACHINE_TYPE.name,
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
