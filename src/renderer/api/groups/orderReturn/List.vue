<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :rowClassFunction="rowClassFunction"
                      :actions="actions"
                      @actionClicked="actionHandler"
                      :localStoragePrefix="'orderReturnList'"
      ></mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import OrderReturnPropertiesReference from 'renderer/api/propertiesReference/OrderReturnPropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  export default {
    name: 'ListOrderReturn',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.ORDER_RETURN.apiName, {paginate: true}),
        tableFields: [
          {
            name: OrderReturnPropertiesReference.DATE.name,
            title: OrderReturnPropertiesReference.DATE.title,
            sortField: OrderReturnPropertiesReference.DATE.name,
            callback: DisplayFunctions.getDate,
            filterType: 'date'
          },
          {
            name: OrderReturnPropertiesReference.ORDER_RETURN_TYPE.name,
            title: OrderReturnPropertiesReference.ORDER_RETURN_TYPE.title,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.ORDER_RETURN_TYPE.name,
            entityFieldName: 'name'
          },
          {
            name: OrderReturnPropertiesReference.QUANTITY.name,
            title: OrderReturnPropertiesReference.QUANTITY.title,
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
      MauDataTable
    },
    methods: {
      actionHandler: function (action, entityObj) {
        if (action.name === 'view') {
          this.$router.push({
            name: 'ViewOrderReturn',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      },
      rowClassFunction: function (orderReturn) {
      }
    }
  }
</script>
