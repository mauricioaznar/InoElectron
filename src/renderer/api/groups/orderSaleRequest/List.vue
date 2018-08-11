<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
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
  import OrderSaleRequestPropertiesReference from 'renderer/api/propertiesReference/OrderSaleRequestPropertiesReference'
  import OrderSaleReceiptPropertiesReference from 'renderer/api/propertiesReference/OrderSaleReceiptPropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'ListBagOrderSaleRequest',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.ORDER_SALE_RECEIPT),
        filterExact: {[OrderSaleRequestPropertiesReference.ORDER_STATUS.relationship_id_name]: 1},
        canEdit: true,
        tableFields: [
          {
            name: OrderSaleRequestPropertiesReference.ORDER_CODE.name,
            title: OrderSaleRequestPropertiesReference.ORDER_CODE.title,
            sortField: OrderSaleRequestPropertiesReference.ORDER_CODE.name,
            filter: true
          },
          {
            name: OrderSaleRequestPropertiesReference.DATE_REQUESTED.name,
            title: OrderSaleRequestPropertiesReference.DATE_REQUESTED.title,
            sortField: OrderSaleRequestPropertiesReference.DATE_REQUESTED.name,
            callback: DisplayFunctions.getDateFromDateTime,
            filter: true,
            default: true
          },
          {
            name: OrderSaleReceiptPropertiesReference.RECEIPT_TYPE.name,
            title: OrderSaleReceiptPropertiesReference.RECEIPT_TYPE.title,
            callback: DisplayFunctions.getNameFromObject
          },
          {
            name: OrderSaleRequestPropertiesReference.PRODUCTS.name,
            title: 'Kilos por bolsa',
            hidden: true,
            callback: DisplayFunctions.getBagWithUnitsRequested
          },
          {
            name: OrderSaleRequestPropertiesReference.PRODUCTS.name,
            title: 'Total',
            hidden: true,
            callback: DisplayFunctions.getBagOrderSaleTotalCostRequested
          },
          {
            name: OrderSaleRequestPropertiesReference.CLIENT.name,
            title: OrderSaleRequestPropertiesReference.CLIENT.title,
            callback: OrderSaleRequestPropertiesReference.CLIENT.display
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
      }
    }
  }
</script>
