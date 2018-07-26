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
  import BagOrderSaleRequestPropertiesReference from 'renderer/api/propertiesReference/BagOrderSaleRequestPropertiesReference'
  import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  export default {
    name: 'ListBagOrderSaleReceipt',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.BAG_ORDER_SALE_RECEIPT),
        filterExact: {[BagOrderSaleRequestPropertiesReference.ORDER_STATUS_TYPE.relationship_id_name]: 2},
        tableFields: [
          {
            name: BagOrderSaleRequestPropertiesReference.ORDER_CODE.name,
            title: BagOrderSaleRequestPropertiesReference.ORDER_CODE.title,
            sortField: BagOrderSaleRequestPropertiesReference.ORDER_CODE.name,
            filter: true
          },
          {
            name: BagOrderSaleReceiptPropertiesReference.DATE_GIVEN.name,
            title: BagOrderSaleReceiptPropertiesReference.DATE_GIVEN.title,
            sortField: BagOrderSaleReceiptPropertiesReference.DATE_GIVEN.name,
            callback: DisplayFunctions.getDateFromDateTime,
            filter: true,
            default: true
          },
          {
            name: BagOrderSaleReceiptPropertiesReference.RECEIPT_TYPE.name,
            title: BagOrderSaleReceiptPropertiesReference.RECEIPT_TYPE.title,
            callback: DisplayFunctions.getNameFromObject
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
            name: BagOrderSaleRequestPropertiesReference.CLIENT.name,
            title: BagOrderSaleRequestPropertiesReference.CLIENT.title,
            callback: BagOrderSaleRequestPropertiesReference.CLIENT.display
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
