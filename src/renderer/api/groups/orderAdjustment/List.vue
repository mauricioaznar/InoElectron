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
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import BagOrderAdjustmentPropertiesReference from 'renderer/api/propertiesReference/OrderAdjustmentPropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  export default {
    name: 'ListBagOrderAdjustment',
    created () {
    },
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.ORDER_ADJUSTMENT.apiName, {paginate: true}),
        canEdit: true,
        tableFields: [
          {
            name: BagOrderAdjustmentPropertiesReference.DATE.name,
            title: BagOrderAdjustmentPropertiesReference.DATE.title,
            sortField: BagOrderAdjustmentPropertiesReference.DATE.name,
            callback: DisplayFunctions.getDateFromDateTime,
            filterType: 'date'
          },
          {
            name: BagOrderAdjustmentPropertiesReference.PRODUCTS.name,
            title: BagOrderAdjustmentPropertiesReference.PRODUCTS.title,
            filterType: 'entity',
            entityName: BagOrderAdjustmentPropertiesReference.PRODUCTS.name,
            entityFieldName: 'description',
            callback: DisplayFunctions.getProducts
          },
          {
            name: BagOrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.name,
            title: BagOrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.title,
            callback: BagOrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.display,
            filterEntity: 'entity',
            entityName: EntityTypes.ORDER_ADJUSTMENT_TYPE.name,
            entityFieldName: 'name'
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
      MauDataTable
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
