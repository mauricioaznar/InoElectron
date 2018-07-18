<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :editFunction="canEdit ? editFunction : null"
                      :viewFunction="viewFunction"
      ></mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import BagOrderSalePropertiesReference from 'renderer/api/propertiesReference/BagOrderSalePropertiesReference'
  import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
  export default {
    name: 'ListBagOrderSale',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.BAG_ORDER_SALE),
        canEdit: true,
        tableFields: [
          {
            name: BagOrderSalePropertiesReference.ORDER_CODE.name,
            title: BagOrderSalePropertiesReference.ORDER_CODE.title,
            sortField: BagOrderSalePropertiesReference.ORDER_CODE.name,
            filter: true
          },
          {
            name: BagOrderSalePropertiesReference.DATE.name,
            title: BagOrderSalePropertiesReference.DATE.title,
            sortField: BagOrderSalePropertiesReference.DATE.name,
            callback: DisplayFunctions.getDateFromDateTime,
            filter: true,
            default: true
          },
          {
            name: BagOrderSalePropertiesReference.BAGS.name,
            title: 'Kilos por bolsa',
            hidden: true,
            callback: DisplayFunctions.getBagWithUnits
          },
          {
            name: BagOrderSalePropertiesReference.BAGS.name,
            title: 'Total',
            hidden: true,
            callback: DisplayFunctions.getBagOrderSaleTotal
          },
          {
            name: BagOrderSalePropertiesReference.CLIENT.name,
            title: BagOrderSalePropertiesReference.CLIENT.title,
            callback: BagOrderSalePropertiesReference.CLIENT.display
          }
        ]
      }
    },
    components: {
    },
    methods: {
      viewFunction: function (expenseType) {
        this.$router.push({
          name: 'ViewBagOrderSale',
          params: { id: expenseType[BagOrderSalePropertiesReference.ID.name] }})
      },
      editFunction: function (expenseType) {
        this.$router.push(
          {name: 'EditBagOrderSale',
            params: { id: expenseType[BagOrderSalePropertiesReference.ID.name] }})
      }
    }
  }
</script>
