<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :actions="actions"
                      @actionClicked="actionHandler"
      >
      </mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import ProductionEventPropertiesReference from 'renderer/api/propertiesReference/ProductionEventPropertiesReference'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  export default {
    name: 'ListProductionEvent',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.PRODUCTION_EVENT.apiName, {paginate: true}),
        tableFields: [
          {
            name: ProductionEventPropertiesReference.DESCRIPTION.name,
            title: ProductionEventPropertiesReference.DESCRIPTION.title,
            callback: DisplayFunctions.getValue
          },
          {
            name: ProductionEventPropertiesReference.START_DATE_TIME.name,
            title: ProductionEventPropertiesReference.START_DATE_TIME.title,
            callback: DisplayFunctions.getDateTime
          },
          {
            name: ProductionEventPropertiesReference.END_DATE_TIME.name,
            title: ProductionEventPropertiesReference.END_DATE_TIME.title,
            callback: DisplayFunctions.getDateTime
          },
          {
            name: ProductionEventPropertiesReference.MACHINE.name,
            title: ProductionEventPropertiesReference.MACHINE.title,
            callback: DisplayFunctions.getNameFromObject,
            entity: EntityTypes.MACHINE.name,
            entityFieldName: 'name'
          },
          {
            name: ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPE.name,
            title: ProductionEventPropertiesReference.PRODUCTION_EVENT_TYPE.title,
            callback: DisplayFunctions.getNameFromObject,
            entity: EntityTypes.PRODUCTION_EVENT_TYPE.name,
            entityFieldName: 'name'
          },
          {
            name: ProductionEventPropertiesReference.CHECKS.name,
            title: ProductionEventPropertiesReference.CHECKS.title,
            callback: DisplayFunctions.getNameArray,
            hidden: true
          },
          {
            name: ProductionEventPropertiesReference.REPORT_EMPLOYEE.name,
            title: ProductionEventPropertiesReference.REPORT_EMPLOYEE.title,
            callback: DisplayFunctions.getPersona,
            entity: EntityTypes.EMPLOYEE.name,
            hidden: true
          },
          {
            name: ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE.name,
            title: ProductionEventPropertiesReference.MAINTENANCE_EMPLOYEE.title,
            callback: DisplayFunctions.getPersona,
            entity: EntityTypes.EMPLOYEE.name,
            hidden: true
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
            name: 'ViewProductionEvent',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
