<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :rowClassFunction="rowClassFunction"
                      :actions="actions"
                      @actionClicked="actionHandler"
                      :localStoragePrefix="'orderRequestList'"
      ></mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import OrderRequestPropertiesReference from 'renderer/api/propertiesReference/OrderRequestPropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  export default {
    name: 'ListOrderRequest',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.ORDER_REQUEST.apiName, {paginate: true}),
        tableFields: [
          {
            name: OrderRequestPropertiesReference.ORDER_CODE.name,
            title: OrderRequestPropertiesReference.ORDER_CODE.title,
            sortField: OrderRequestPropertiesReference.ORDER_CODE.name,
            filterType: 'text'
          },
          {
            name: OrderRequestPropertiesReference.DATE.name,
            title: OrderRequestPropertiesReference.DATE.title,
            sortField: OrderRequestPropertiesReference.DATE.name,
            callback: DisplayFunctions.getDateFromDateTime,
            filterType: 'date'
          },
          {
            name: OrderRequestPropertiesReference.ORDER_SALES_PRODUCTS_REQUESTED.name,
            title: OrderRequestPropertiesReference.ORDER_SALES_PRODUCTS_REQUESTED.title,
            callback: DisplayFunctions.getOrderSalesProductsRequested

          },
          {
            name: OrderRequestPropertiesReference.ORDER_SALES_PRODUCTS_NOT_REQUESTED.name,
            title: OrderRequestPropertiesReference.ORDER_SALES_PRODUCTS_NOT_REQUESTED.title,
            callback: DisplayFunctions.getOrderSalesProductsNotRequested
          },
          {
            name: OrderRequestPropertiesReference.CLIENT_CONTACT.name,
            title: OrderRequestPropertiesReference.CLIENT_CONTACT.title,
            callback: DisplayFunctions.getPersona,
            filterType: 'entity',
            entityName: EntityTypes.CLIENT_CONTACT.name,
            entityFieldName: 'fullname'
          },
          {
            name: OrderRequestPropertiesReference.CLIENT.name,
            title: OrderRequestPropertiesReference.CLIENT.title,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.CLIENT.name,
            entityFieldName: 'name'
          },
          {
            name: OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.name,
            title: OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.title,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.ORDER_REQUEST_STATUS.name,
            entityFieldName: 'name'
          },
          {
            name: OrderRequestPropertiesReference.TOTAL_COST.name,
            title: OrderRequestPropertiesReference.TOTAL_COST.title,
            callback: DisplayFunctions.getValue
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
            name: 'ViewOrderRequest',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      },
      rowClassFunction: function (orderSale) {
      }
    }
  }
</script>
