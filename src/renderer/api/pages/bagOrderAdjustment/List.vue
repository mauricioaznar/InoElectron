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
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  import OrderAdjustmentPropertiesReference from 'renderer/api/propertiesReference/BagOrderAdjustmentPropertiesReference'
  import SimpleOrderPropertiesReference from 'renderer/api/propertiesReference/BagOrderPropertiesReference'
  import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
  export default {
    name: 'ListBagOrderAdjustment',
    created () {
    },
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.BAG_ORDER_ADJUSTMENT),
        canEdit: true,
        tableFields: [
          {
            name: SimpleOrderPropertiesReference.ORDER_CODE.name,
            title: SimpleOrderPropertiesReference.ORDER_CODE.title,
            filter: true,
            default: true
          },
          {
            name: SimpleOrderPropertiesReference.DATE.name,
            title: SimpleOrderPropertiesReference.DATE.title,
            sortField: SimpleOrderPropertiesReference.DATE.name,
            callback: DisplayFunctions.getDateFromDateTime,
            filter: true,
            default: true
          },
          {
            name: SimpleOrderPropertiesReference.BAGS.name,
            title: SimpleOrderPropertiesReference.BAGS.title,
            hidden: true,
            callback: DisplayFunctions.getBagWithUnits
          },
          {
            name: OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.name,
            title: OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.title,
            callback: OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.display
          }
        ]
      }
    },
    components: {
    },
    methods: {
      viewFunction: function (expenseType) {
        this.$router.push({
          name: 'ViewBagOrderAdjustment',
          params: { id: expenseType[GlobalEntityIdentifier] }})
      },
      editFunction: function (expenseType) {
        this.$router.push(
          {name: 'EditBagOrderAdjustment',
            params: { id: expenseType[GlobalEntityIdentifier] }})
      }
    }
  }
</script>
