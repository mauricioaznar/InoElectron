<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :actions="actions"
                      @actionClicked="actionHandler"
      ></mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import OrderProductionPropertiesReference from 'renderer/api/propertiesReference/OrderProductionPropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  export default {
    name: 'ListBagOrderProduction',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.BAG_ORDER_PRODUCTION.apiName,
          {paginate: true,
            filterExacts: {[OrderProductionPropertiesReference.ORDER_PRODUCTION_TYPE.relationship_id_name]: 1}}),
        canEdit: true,
        tableFields: [
          {
            name: OrderProductionPropertiesReference.PRODUCTS.name,
            title: 'Productos',
            callback: DisplayFunctions.getProducts,
            hidden: true
          },
          {
            name: OrderProductionPropertiesReference.START_DATE_TIME.name,
            title: OrderProductionPropertiesReference.START_DATE_TIME.title,
            sortField: OrderProductionPropertiesReference.START_DATE_TIME.name,
            filter: true
          },
          {
            name: OrderProductionPropertiesReference.WASTE.name,
            title: OrderProductionPropertiesReference.WASTE.title,
            sortField: OrderProductionPropertiesReference.WASTE.name,
            filter: true
          },
          {
            name: OrderProductionPropertiesReference.END_DATE_TIME.name,
            title: OrderProductionPropertiesReference.END_DATE_TIME.title,
            sortField: OrderProductionPropertiesReference.END_DATE_TIME.name,
            filter: true
          },
          {
            name: OrderProductionPropertiesReference.EMPLOYEE.name,
            title: OrderProductionPropertiesReference.EMPLOYEE.title,
            callback: DisplayFunctions.getPersona,
            entity: EntityTypes.EMPLOYEE.name,
            entityFieldName: 'last_name'
          },
          {
            name: OrderProductionPropertiesReference.MACHINES.name,
            title: OrderProductionPropertiesReference.MACHINES.title,
            callback: DisplayFunctions.getFirstNameFromArray,
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
            name: 'ViewBagOrderProduction',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
