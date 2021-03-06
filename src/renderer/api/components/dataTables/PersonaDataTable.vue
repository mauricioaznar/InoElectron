<template>
    <div>
        <mau-data-table :apiUrl="apiUrl"
                        :tableFields="tableFields"
                        :actions="actions"
                        @actionClicked="actionClicked"
                        :localStoragePrefix="localStoragePrefix"
        >
        </mau-data-table>
    </div>
</template>

<script>
  import PersonaPropertiesReference from 'renderer/api/propertiesReference/PersonaPropertiesReference'
  import ClientContactPropertiesReference from 'renderer/api/propertiesReference/ClientContactPropertiesReference'
  import EmployeePropertiesReference from 'renderer/api/propertiesReference/EmployeePropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import EntityTypes from 'renderer/api/EntityTypes.js'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
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
      },
      actions: Array,
      actionClicked: Function,
      localStoragePrefix: {
        type: String,
        required: true
      }
    },
    created () {
      this.tableFields = [
        {
          name: PersonaPropertiesReference.FIRST_NAME.name,
          title: PersonaPropertiesReference.FIRST_NAME.title,
          sortField: PersonaPropertiesReference.FIRST_NAME.name,
          filterType: 'text'
        },
        {
          name: PersonaPropertiesReference.LAST_NAME.name,
          title: PersonaPropertiesReference.LAST_NAME.title,
          sortField: PersonaPropertiesReference.LAST_NAME.name,
          filterType: 'text'
        },
        {
          name: PersonaPropertiesReference.FULLNAME.name,
          title: PersonaPropertiesReference.FULLNAME.title,
          sortField: PersonaPropertiesReference.FULLNAME.name,
          filterType: 'text'
        },
        {
          name: PersonaPropertiesReference.CELLPHONE.name,
          title: PersonaPropertiesReference.CELLPHONE.title,
          sortField: PersonaPropertiesReference.CELLPHONE.name,
          filterType: 'text'
        }
      ]
      if (this.clientContactMode) {
        this.tableFields.push({
          name: ClientContactPropertiesReference.CLIENT.name,
          title: ClientContactPropertiesReference.CLIENT.title,
          callback: DisplayFunctions.getNameFromObject,
          filterType: 'entity',
          entityName: EntityTypes.CLIENT.name,
          entityFieldName: 'name'
        })
        this.tableFields.push({
          name: PersonaPropertiesReference.EMAIL.name,
          title: PersonaPropertiesReference.EMAIL.title,
          sortField: PersonaPropertiesReference.EMAIL.name,
          filterType: 'text'
        })
      }
      if (this.employeeMode) {
        this.tableFields.push({
          name: EmployeePropertiesReference.EMPLOYEE_TYPE.name,
          title: EmployeePropertiesReference.EMPLOYEE_TYPE.title,
          callback: DisplayFunctions.getNameFromObject,
          filterType: 'entity',
          entityName: EntityTypes.EMPLOYEE_TYPE.name,
          entityFieldName: 'name'
        })
        this.tableFields.push({
          name: EmployeePropertiesReference.BRANCH.name,
          title: EmployeePropertiesReference.BRANCH.title,
          callback: DisplayFunctions.getNameFromObject,
          filterType: 'entity',
          entityName: EntityTypes.BRANCH.name,
          entityFieldName: 'name'
        })
        this.tableFields.push({
          name: EmployeePropertiesReference.EMPLOYEE_STATUS.name,
          title: EmployeePropertiesReference.EMPLOYEE_STATUS.title,
          callback: DisplayFunctions.getNameFromObject,
          filterType: 'entity',
          entityName: EntityTypes.EMPLOYEE_STATUS.name,
          entityFieldName: 'name'
        })
        this.tableFields.push({
          name: EmployeePropertiesReference.BASE_SALARY.name,
          title: EmployeePropertiesReference.BASE_SALARY.title,
          sortField: EmployeePropertiesReference.BASE_SALARY.name,
          filterType: 'text'
        })
        this.tableFields.push({
          name: EmployeePropertiesReference.HOURS_SHOULD_WORK.name,
          title: EmployeePropertiesReference.HOURS_SHOULD_WORK.title,
          sortField: EmployeePropertiesReference.HOURS_SHOULD_WORK.name,
          filterType: 'text'
        })
        this.tableFields.push({
          name: EmployeePropertiesReference.CREDIT_REQUIRED.name,
          title: EmployeePropertiesReference.CREDIT_REQUIRED.title,
          sortField: EmployeePropertiesReference.CREDIT_REQUIRED.name,
          callback: DisplayFunctions.getTwoStateBoolean
        })
        this.tableFields.push({
          name: EmployeePropertiesReference.CREDIT.name,
          title: EmployeePropertiesReference.CREDIT.title,
          sortField: EmployeePropertiesReference.CREDIT.name,
          filterType: 'text'
        })
        this.tableFields.push({
          name: EmployeePropertiesReference.INFONAVIT.name,
          title: EmployeePropertiesReference.INFONAVIT.title,
          sortField: EmployeePropertiesReference.INFONAVIT.name,
          filterType: 'text'
        })
      }
    },
    components: {
      MauDataTable
    }
  }
</script>
