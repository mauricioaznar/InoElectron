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
  import OrderSaleReceiptPropertiesReference from 'renderer/api/propertiesReference/OrderSaleReceiptPropertiesReference'
  import OrderSaleRequestPropertiesReference from 'renderer/api/propertiesReference/OrderSaleRequestPropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'ListBagOrderSaleReceipt',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.ORDER_SALE_RECEIPT),
        filterExact: {[OrderSaleRequestPropertiesReference.ORDER_STATUS.relationship_id_name]: 2},
        tableFields: [
          {
            name: OrderSaleRequestPropertiesReference.ORDER_CODE.name,
            title: OrderSaleRequestPropertiesReference.ORDER_CODE.title,
            sortField: OrderSaleRequestPropertiesReference.ORDER_CODE.name,
            filter: true
          },
          {
            name: OrderSaleReceiptPropertiesReference.DATE_GIVEN.name,
            title: OrderSaleReceiptPropertiesReference.DATE_GIVEN.title,
            sortField: OrderSaleReceiptPropertiesReference.DATE_GIVEN.name,
            callback: DisplayFunctions.getDateFromDateTime,
            filter: true,
            default: true
          },
          {
            name: OrderSaleReceiptPropertiesReference.PRODUCTS.name,
            title: 'Kilos por bolsa',
            hidden: true,
            callback: DisplayFunctions.getBagWithUnitsGiven
          },
          {
            name: OrderSaleReceiptPropertiesReference.PRODUCTS.name,
            title: 'Total',
            hidden: true,
            callback: DisplayFunctions.getBagOrderSaleTotalCostGiven
          },
          {
            name: OrderSaleRequestPropertiesReference.CLIENT.name,
            title: OrderSaleRequestPropertiesReference.CLIENT.title,
            callback: OrderSaleRequestPropertiesReference.CLIENT.display
          }
        ],
        actions: [
          {
            title: 'Ver',
            name: 'view',
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
            name: 'ViewOrderSaleReceipt',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
