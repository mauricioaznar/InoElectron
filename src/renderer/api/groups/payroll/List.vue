<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :actions="actions"
                      @actionClicked="actionHandler"
                      :localStoragePrefix="'payrollList'"
      ></mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import PayrollPropertiesReference from 'renderer/api/propertiesReference/PayrollPropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  export default {
    name: 'ListPayroll',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.PAYROLL.apiName, {paginate: true}),
        actions: [
          {
            name: 'view',
            title: 'Ver',
            icon: 'fa fa-eye'
          }
        ],
        tableFields: [
          {
            title: PayrollPropertiesReference.START_DATE_TIME.title,
            name: PayrollPropertiesReference.START_DATE_TIME.name,
            callback: DisplayFunctions.getValue,
            filterType: 'date'
          },
          {
            title: PayrollPropertiesReference.END_DATE_TIME.title,
            name: PayrollPropertiesReference.END_DATE_TIME.name,
            callback: DisplayFunctions.getValue,
            filterType: 'date'
          },
          {
            title: PayrollPropertiesReference.PAYROLL_TYPE.title,
            name: PayrollPropertiesReference.PAYROLL_TYPE.name,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.MACHINE_TYPE.name,
            entityFieldName: 'name'
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
            name: 'ViewPayroll',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
