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
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import EmployeeAttendancePropertiesReference from 'renderer/api/propertiesReference/EmployeeAttendancePropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  export default {
    name: 'ListEmployeeAttendance',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.EMPLOYEE_ATTENDANCE.apiName, {paginate: true}),
        tableFields: [
          {
            name: EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.name,
            title: EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.title,
            sortField: EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.name,
            filterType: 'date'
          },
          {
            name: EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.name,
            title: EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.title,
            sortField: EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.name,
            filterType: 'date'
          },
          {
            name: EmployeeAttendancePropertiesReference.EMPLOYEE.name,
            title: EmployeeAttendancePropertiesReference.EMPLOYEE.title,
            sortField: EmployeeAttendancePropertiesReference.EMPLOYEE.name,
            callback: DisplayFunctions.getPersona,
            filterType: 'entity',
            entityName: EntityTypes.EMPLOYEE.name,
            entityFieldName: 'last_name'
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
      MauDataTable
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
