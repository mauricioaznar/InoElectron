<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :rowClassFunction="rowClassFunction"
                      :actions="actions"
                      @actionClicked="actionHandler"
      ></mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import ApiUrls from 'renderer/api/functions/ApiUrls'
  import EmployeeAttendancePropertiesReference from 'renderer/api/propertiesReference/EmployeeAttendancePropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'ListEmployeeAttendance',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.EMPLOYEE_ATTENDANCE),
        tableFields: [
          {
            name: EmployeeAttendancePropertiesReference.DATE_TIME.name,
            title: EmployeeAttendancePropertiesReference.DATE_TIME.title,
            sortField: EmployeeAttendancePropertiesReference.DATE_TIME.name,
            filter: true
          },
          {
            name: EmployeeAttendancePropertiesReference.EMPLOYEE.name,
            title: EmployeeAttendancePropertiesReference.EMPLOYEE.title,
            sortField: EmployeeAttendancePropertiesReference.EMPLOYEE.name,
            entity: EntityTypes.EMPLOYEE.name,
            entityFieldName: 'last_name',
            callback: DisplayFunctions.getPersona,
            filter: true
          },
          {
            name: EmployeeAttendancePropertiesReference.EMPLOYEE_ATTENDANCE_TYPE.name,
            title: EmployeeAttendancePropertiesReference.EMPLOYEE_ATTENDANCE_TYPE.title,
            callback: DisplayFunctions.getNameFromObject,
            entity: EntityTypes.EMPLOYEE_ATTENDANCE_TYPE.name,
            entityFieldName: 'name',
            filter: true
          }
        ],
        actions: [
          {
            name: 'view',
            title: 'Ver',
            icon: 'fa fa-eye'
          }
        ]
      }
    },
    components: {
    },
    methods: {
      actionHandler: function (action, entityObj) {
        if (action.name === 'view') {
          this.$router.push({
            name: 'ViewEmployeeAttendance',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      },
      rowClassFunction: function (orderSale) {
      }
    }
  }
</script>
