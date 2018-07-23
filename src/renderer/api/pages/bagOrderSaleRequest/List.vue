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
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import BagOrderSaleRequestPropertiesReference from 'renderer/api/propertiesReference/BagOrderSaleRequestPropertiesReference'
  import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  export default {
    name: 'ListBagOrderSaleRequest',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.BAG_ORDER_SALE_RECEIPT),
        filterExact: {[BagOrderSaleRequestPropertiesReference.ORDER_STATUS_TYPE.relationship_id_name]: 2},
        canEdit: true,
        tableFields: [
          {
            name: BagOrderSaleRequestPropertiesReference.ORDER_CODE.name,
            title: BagOrderSaleRequestPropertiesReference.ORDER_CODE.title,
            sortField: BagOrderSaleRequestPropertiesReference.ORDER_CODE.name,
            filter: true
          },
          {
            name: BagOrderSaleRequestPropertiesReference.DATE.name,
            title: BagOrderSaleRequestPropertiesReference.DATE.title,
            sortField: BagOrderSaleRequestPropertiesReference.DATE.name,
            callback: DisplayFunctions.getDateFromDateTime,
            filter: true,
            default: true
          },
          {
            name: BagOrderSaleRequestPropertiesReference.BAGS.name,
            title: 'Kilos por bolsa',
            hidden: true,
            callback: DisplayFunctions.getBagWithUnitsRequested
          },
          {
            name: BagOrderSaleRequestPropertiesReference.BAGS.name,
            title: 'Total',
            hidden: true,
            callback: DisplayFunctions.getBagOrderSaleTotalCostRequested
          },
          {
            name: BagOrderSaleRequestPropertiesReference.CLIENT.name,
            title: BagOrderSaleRequestPropertiesReference.CLIENT.title,
            callback: BagOrderSaleRequestPropertiesReference.CLIENT.display
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
            name: 'ViewBagOrderSaleRequest',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
