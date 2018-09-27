<template>
    <div>
        <mau-data-table :apiUrl="apiUrl"
                        :tableFields="tableFields"
                        :actions="actions"
                        @actionClicked="actionClicked"
        >
        </mau-data-table>
    </div>
</template>

<script>
  import PersonaPropertiesReference from 'renderer/api/propertiesReference/PersonaPropertiesReference'
  import ClientPropertiesReference from 'renderer/api/propertiesReference/ClientPropertiesReference'
  import EmployeePropertiesReference from 'renderer/api/propertiesReference/EmployeePropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import EntityTypes from 'renderer/api/EntityTypes.js'
  export default {
    name: 'MauPersonaDataTable',
    data () {
      return {
        tableFields: []
      }
    },
    props: {
      apiUrl: {
        type: String,
        required: true
      },
      clientMode: {
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
      },
      actions: Array,
      actionClicked: Function
    },
    created () {
      this.tableFields = [
        {
          name: PersonaPropertiesReference.FIRST_NAME.name,
          title: PersonaPropertiesReference.FIRST_NAME.title,
          sortField: PersonaPropertiesReference.FIRST_NAME.name,
          filter: true
        },
        {
          name: PersonaPropertiesReference.LAST_NAME.name,
          title: PersonaPropertiesReference.LAST_NAME.title,
          sortField: PersonaPropertiesReference.LAST_NAME.name,
          filter: true
        },
        {
          name: PersonaPropertiesReference.CELLPHONE.name,
          title: PersonaPropertiesReference.CELLPHONE.title,
          sortField: PersonaPropertiesReference.CELLPHONE.name,
          filter: true
        }
      ]
      if (this.clientMode) {
        this.tableFields.push({
          name: ClientPropertiesReference.COMPANY.name,
          title: ClientPropertiesReference.COMPANY.title,
          callback: DisplayFunctions.getNameFromObject,
          entity: EntityTypes.COMPANY.name,
          entityFieldName: 'name'
        })
        this.tableFields.push({
          name: PersonaPropertiesReference.EMAIL.name,
          title: PersonaPropertiesReference.EMAIL.title,
          sortField: PersonaPropertiesReference.EMAIL.name,
          filter: true
        })
      }
      if (this.employeeMode) {
        this.tableFields.push({
          name: EmployeePropertiesReference.EMPLOYEE_TYPE.name,
          title: EmployeePropertiesReference.EMPLOYEE_TYPE.title,
          callback: DisplayFunctions.getNameFromObject,
          entity: EntityTypes.EMPLOYEE_TYPE.name,
          entityFieldName: 'name'
        })
      }
    },
    components: {
    }
  }
</script>
