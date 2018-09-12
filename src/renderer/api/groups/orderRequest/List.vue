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
  import OrderRequestPropertiesReference from 'renderer/api/propertiesReference/OrderRequestPropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'ListOrderRequest',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.ORDER_REQUEST),
        tableFields: [
          {
            name: OrderRequestPropertiesReference.ORDER_CODE.name,
            title: OrderRequestPropertiesReference.ORDER_CODE.title,
            sortField: OrderRequestPropertiesReference.ORDER_CODE.name,
            filter: true
          },
          {
            name: OrderRequestPropertiesReference.DATE.name,
            title: OrderRequestPropertiesReference.DATE.title,
            sortField: OrderRequestPropertiesReference.DATE.name,
            callback: DisplayFunctions.getDateFromDateTime,
            filter: true,
            default: true
          },
          {
            name: OrderRequestPropertiesReference.PRODUCTS.name,
            title: 'Productos solicitados',
            callback: DisplayFunctions.getOrderSaleProducts.name
          },
          {
            name: OrderRequestPropertiesReference.CLIENT.name,
            title: OrderRequestPropertiesReference.CLIENT.title,
            callback: DisplayFunctions.getPersona
          },
          {
            name: OrderRequestPropertiesReference.COMPANY.name,
            title: OrderRequestPropertiesReference.COMPANY.title,
            callback: DisplayFunctions.getNameFromObject
          },
          {
            name: OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.name,
            title: OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.title,
            callback: DisplayFunctions.getNameFromObject
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
