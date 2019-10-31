<template>
    <mau-property-viewer :entity="persona" :properties="properties"></mau-property-viewer>
</template>

<script>
    import PersonaPropertiesReference from 'renderer/api/propertiesReference/PersonaPropertiesReference'
    import ClientContactPropertiesReference from 'renderer/api/propertiesReference/ClientContactPropertiesReference'
    import EmployeePropertiesReference from 'renderer/api/propertiesReference/EmployeePropertiesReference'
    import MauPropertyViewer from 'renderer/components/mau-components/mau-property-viewer/MauPropertyViewer.vue'
    import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
    export default {
      name: 'MauPersonaView',
      components: {
        MauPropertyViewer
      },
      data () {
        return {
          entity: null,
          properties: [
          ]
        }
      },
      props: {
        persona: {
          type: Object,
          required: true
        },
        clientContactMode: {
          type: Boolean,
          default: function () {
            return false
          }
        },
        employeeMode: {
          type: Boolean,
          default: function () {
            return false
          }
        }
      },
      created () {
        this.properties = []
        this.properties.push({
          name: PersonaPropertiesReference.FIRST_NAME.name,
          title: PersonaPropertiesReference.FIRST_NAME.title,
          display: DisplayFunctions.getValue
        })
        this.properties.push({
          name: PersonaPropertiesReference.LAST_NAME.name,
          title: PersonaPropertiesReference.LAST_NAME.title,
          display: DisplayFunctions.getValue
        })
        this.properties.push({
          name: PersonaPropertiesReference.CELLPHONE.name,
          title: PersonaPropertiesReference.CELLPHONE.title,
          display: DisplayFunctions.getValue
        })
        if (this.clientContactMode) {
          this.properties.push({
            name: ClientContactPropertiesReference.CLIENT.name,
            title: ClientContactPropertiesReference.CLIENT.title,
            display: DisplayFunctions.getNameFromObject
          })
          this.properties.push({
            name: PersonaPropertiesReference.EMAIL.name,
            title: PersonaPropertiesReference.EMAIL.title,
            display: DisplayFunctions.getValue
          })
        }
        if (this.employeeMode) {
          this.properties.push({
            name: EmployeePropertiesReference.EMPLOYEE_TYPE.name,
            title: EmployeePropertiesReference.EMPLOYEE_TYPE.title,
            display: DisplayFunctions.getNameFromObject
          })
          this.properties.push({
            name: EmployeePropertiesReference.EMPLOYEE_STATUS.name,
            title: EmployeePropertiesReference.EMPLOYEE_STATUS.title,
            display: DisplayFunctions.getNameFromObject
          })
        }
      }
}
</script>
