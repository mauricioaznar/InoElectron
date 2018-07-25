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
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import BagOrderSaleReceiptPropertiesReference from 'renderer/api/propertiesReference/BagOrderSaleReceiptPropertiesReference'
  import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  export default {
    name: 'ListBagOrderSaleReceipt',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.BAG_ORDER_SALE_RECEIPT),
        filterExact: {[BagOrderSaleReceiptPropertiesReference.ORDER_STATUS_TYPE.relationship_id_name]: 2},
        tableFields: [
          {
            name: BagOrderSaleReceiptPropertiesReference.ORDER_CODE.name,
            title: BagOrderSaleReceiptPropertiesReference.ORDER_CODE.title,
            sortField: BagOrderSaleReceiptPropertiesReference.ORDER_CODE.name,
            filter: true
          },
          {
            name: BagOrderSaleReceiptPropertiesReference.DATE.name,
            title: BagOrderSaleReceiptPropertiesReference.DATE.title,
            sortField: BagOrderSaleReceiptPropertiesReference.DATE.name,
            callback: DisplayFunctions.getDateFromDateTime,
            filter: true,
            default: true
          },
          {
            name: BagOrderSaleReceiptPropertiesReference.BAGS.name,
            title: 'Kilos por bolsa',
            hidden: true,
            callback: DisplayFunctions.getBagWithUnitsGiven
          },
          {
            name: BagOrderSaleReceiptPropertiesReference.BAGS.name,
            title: 'Total',
            hidden: true,
            callback: DisplayFunctions.getBagOrderSaleTotalCostGiven
          },
          {
            name: BagOrderSaleReceiptPropertiesReference.CLIENT.name,
            title: BagOrderSaleReceiptPropertiesReference.CLIENT.title,
            callback: BagOrderSaleReceiptPropertiesReference.CLIENT.display
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
            name: 'ViewBagOrderSaleReceipt',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
