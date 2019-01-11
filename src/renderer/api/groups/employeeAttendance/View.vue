<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-property-viewer v-if="entity" :entity="entity" :properties="properties"></mau-property-viewer>
  </div>
</template>

<script>
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import EmployeeAttendancePropertiesReference from 'renderer/api/propertiesReference/EmployeeAttendancePropertiesReference'
  import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ViewEmployeeAttendance',
    components: {
      MauEntityPetitioner,
      MauSpinner,
      MauPropertyViewer
    },
    data () {
      return {
        properties: [
          {
            title: EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.title,
            name: EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.name,
            display: DisplayFunctions.getDateTime
          },
          {
            title: EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.title,
            name: EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.name,
            display: DisplayFunctions.getDateTime
          },
          {
            title: EmployeeAttendancePropertiesReference.EMPLOYEE.title,
            name: EmployeeAttendancePropertiesReference.EMPLOYEE.name,
            display: DisplayFunctions.getPersona
          },
          {
            title: EmployeeAttendancePropertiesReference.ENTRANCE_IMAGE_NAME.title,
            name: EmployeeAttendancePropertiesReference.ENTRANCE_IMAGE_NAME.name,
            display: DisplayFunctions.getEmployeeAttendanceImageForView
          },
          {
            title: EmployeeAttendancePropertiesReference.EXIT_IMAGE_NAME.title,
            name: EmployeeAttendancePropertiesReference.EXIT_IMAGE_NAME.name,
            display: DisplayFunctions.getEmployeeAttendanceImageForView
          }
        ],
        entityType: EntityTypes.EMPLOYEE_ATTENDANCE,
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
