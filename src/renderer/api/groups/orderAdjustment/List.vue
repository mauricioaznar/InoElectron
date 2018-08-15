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
  import ApiUrls from 'renderer/api/functions/ApiUrls'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import BagOrderAdjustmentPropertiesReference from 'renderer/api/propertiesReference/OrderAdjustmentPropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ListBagOrderAdjustment',
    created () {
    },
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.ORDER_ADJUSTMENT),
        canEdit: true,
        tableFields: [
          {
            name: BagOrderAdjustmentPropertiesReference.DATE.name,
            title: BagOrderAdjustmentPropertiesReference.DATE.title,
            sortField: BagOrderAdjustmentPropertiesReference.DATE.name,
            callback: DisplayFunctions.getDateFromDateTime,
            filter: true,
            default: true
          },
          {
            name: BagOrderAdjustmentPropertiesReference.PRODUCTS.name,
            title: BagOrderAdjustmentPropertiesReference.PRODUCTS.title,
            hidden: true,
            callback: DisplayFunctions.getProducts
          },
          {
            name: BagOrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.name,
            title: BagOrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.title,
            callback: BagOrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.display
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
            name: 'ViewOrderAdjustment',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
