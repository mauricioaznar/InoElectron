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
  import ProductionEventPropertiesReference from 'renderer/api/propertiesReference/ProductionEventPropertiesReference'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer.vue'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ViewProductionEvent',
    data () {
      return {
        properties: [
          {
            title: ProductionEventPropertiesReference.START_DATE_TIME.title,
            name: ProductionEventPropertiesReference.START_DATE_TIME.name,
            display: DisplayFunctions.getDateTime
          },
          {
            title: ProductionEventPropertiesReference.END_DATE_TIME.title,
            name: ProductionEventPropertiesReference.END_DATE_TIME.name,
            display: DisplayFunctions.getDateTime
          },
          {
            title: ProductionEventPropertiesReference.MACHINE.title,
            name: ProductionEventPropertiesReference.MACHINE.name,
            display: DisplayFunctions.getNameFromObject
          },
          {
            title: ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPES.title,
            name: ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPES.name,
            display: DisplayFunctions.getNameArray
          },
          {
            title: ProductionEventPropertiesReference.REPORT_EMPLOYEE.title,
            name: ProductionEventPropertiesReference.REPORT_EMPLOYEE.name,
            display: DisplayFunctions.getPersona
          },
          {
            title: ProductionEventPropertiesReference.REPORT_EMPLOYEE_DESCRIPTION.title,
            name: ProductionEventPropertiesReference.REPORT_EMPLOYEE_DESCRIPTION.name,
            display: DisplayFunctions.getValue
          },
          {
            title: ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE.title,
            name: ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE.name,
            display: DisplayFunctions.getPersona
          },
          {
            title: ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE_DESCRIPTION.title,
            name: ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE_DESCRIPTION.name,
            display: DisplayFunctions.getValue
          }
        ],
        entityType: EntityTypes.PRODUCTION_EVENT,
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
        this.isRequestedEntityLoading = false
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
