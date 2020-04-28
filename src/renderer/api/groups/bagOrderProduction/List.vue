<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :actions="actions"
                      @actionClicked="actionHandler"
                      :localStoragePrefix="'bagOrderProductionList'"
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
            title: 'Productos (descripcion)',
            callback: DisplayFunctions.getProducts,
            filterType: 'entity',
            entityName: OrderProductionPropertiesReference.PRODUCTS.name,
            entityFieldName: 'description'
          },
          {
            name: OrderProductionPropertiesReference.START_DATE_TIME.name,
            title: OrderProductionPropertiesReference.START_DATE_TIME.title,
            sortField: OrderProductionPropertiesReference.START_DATE_TIME.name,
            filterType: 'date'
          },
          {
            name: OrderProductionPropertiesReference.WASTE.name,
            title: OrderProductionPropertiesReference.WASTE.title,
            sortField: OrderProductionPropertiesReference.WASTE.name,
            filterType: 'text'
          },
          {
            name: OrderProductionPropertiesReference.END_DATE_TIME.name,
            title: OrderProductionPropertiesReference.END_DATE_TIME.title,
            sortField: OrderProductionPropertiesReference.END_DATE_TIME.name,
            filterType: 'date'
          },
          {
            name: OrderProductionPropertiesReference.EMPLOYEE.name,
            title: OrderProductionPropertiesReference.EMPLOYEE.title,
            callback: DisplayFunctions.getPersona,
            filterType: 'entity',
            entityName: EntityTypes.EMPLOYEE.name,
            entityFieldName: 'fullname'
          },
          {
            name: OrderProductionPropertiesReference.PERFORMANCE.name,
            title: OrderProductionPropertiesReference.PERFORMANCE.title,
            callback: DisplayFunctions.getValue
          },
          {
            name: OrderProductionPropertiesReference.MACHINES.name,
            title: OrderProductionPropertiesReference.MACHINES.title,
            callback: DisplayFunctions.getFirstNameFromArray,
            filterType: 'entity',
            entityName: EntityTypes.MACHINE.name,
            entityFieldName: 'name'
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
