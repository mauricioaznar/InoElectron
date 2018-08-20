<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :rowClassFunction="rowClassFunction"
                      :actions="actions"
                      :filterExact="filterExact"
                      @actionClicked="actionHandler"
      ></mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import ApiUrls from 'renderer/api/functions/ApiUrls'
  import OrderSalePropertiesReference from 'renderer/api/propertiesReference/OrderSalePropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'ListBagOrderSaleRequest',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.ORDER_SALE_RECEIPT),
        filterExact: {[OrderSalePropertiesReference.ORDER_SALE_TYPE.relationship_id_name]: 1},
        tableFields: [
          {
            name: OrderSalePropertiesReference.ORDER_CODE.name,
            title: OrderSalePropertiesReference.ORDER_CODE.title,
            sortField: OrderSalePropertiesReference.ORDER_CODE.name,
            filter: true
          },
          {
            name: OrderSalePropertiesReference.DATE_REQUESTED.name,
            title: OrderSalePropertiesReference.DATE_REQUESTED.title,
            sortField: OrderSalePropertiesReference.DATE_REQUESTED.name,
            callback: DisplayFunctions.getDateFromDateTime,
            filter: true,
            default: true
          },
          {
            name: OrderSalePropertiesReference.RECEIPT_TYPE.name,
            title: OrderSalePropertiesReference.RECEIPT_TYPE.title,
            callback: DisplayFunctions.getNameFromObject
          },
          {
            name: OrderSalePropertiesReference.PRODUCTS.name,
            title: 'Productos solicitados',
            callback: DisplayFunctions.getOrderSaleProducts.name + '|' + 1
          },
          {
            name: OrderSalePropertiesReference.CLIENT.name,
            title: OrderSalePropertiesReference.CLIENT.title,
            callback: DisplayFunctions.getPersona
          },
          {
            name: OrderSalePropertiesReference.TOTAL_COST_REQUESTED.name,
            title: OrderSalePropertiesReference.TOTAL_COST_REQUESTED.title,
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
            name: 'ViewOrderSaleRequest',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      },
      rowClassFunction: function (orderSale) {
        if (orderSale[OrderSalePropertiesReference.RECEIPT_TYPE.name][GlobalEntityIdentifier] === 1) {
          return 'no-tax'
        } else {
          return 'with-tax'
        }
      }
    }
  }
</script>
