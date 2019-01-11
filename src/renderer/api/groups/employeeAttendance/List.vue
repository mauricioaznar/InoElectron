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
            name: EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.name,
            title: EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.title,
            sortField: EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.name,
            filter: true
          },
          {
            name: EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.name,
            title: EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.title,
            sortField: EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.name,
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
            name: EmployeeAttendancePropertiesReference.ENTRANCE_IMAGE_NAME.name,
            title: EmployeeAttendancePropertiesReference.ENTRANCE_IMAGE_NAME.title,
            callback: DisplayFunctions.getEmployeeAttendanceImageForList
          },
          {
            name: EmployeeAttendancePropertiesReference.EXIT_IMAGE_NAME.name,
            title: EmployeeAttendancePropertiesReference.EXIT_IMAGE_NAME.title,
            callback: DisplayFunctions.getEmployeeAttendanceImageForList
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
