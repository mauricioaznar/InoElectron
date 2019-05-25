<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :actions="actions"
                      @actionClicked="actionHandler",
                      :localStoragePrefix="'orderSaleList'"
      ></mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import OrderSalePropertiesReference from 'renderer/api/propertiesReference/OrderSalePropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  export default {
    name: 'ListBagOrderSale',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.ORDER_SALE.apiName, {paginate: true}),
        tableFields: [
          {
            name: OrderSalePropertiesReference.ORDER_CODE.name,
            title: OrderSalePropertiesReference.ORDER_CODE.title,
            sortField: OrderSalePropertiesReference.ORDER_CODE.name,
            filterType: 'text'
          },
          {
            name: OrderSalePropertiesReference.DATE.name,
            title: OrderSalePropertiesReference.DATE.title,
            sortField: OrderSalePropertiesReference.DATE.name,
            callback: DisplayFunctions.getDateFromDateTime,
            filterType: 'date'
          },
          {
            name: OrderSalePropertiesReference.RECEIPT_TYPE.name,
            title: OrderSalePropertiesReference.RECEIPT_TYPE.title,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.ORDER_SALE_RECEIPT_TYPE.name,
            entityFieldName: 'name'
          },
          {
            name: OrderSalePropertiesReference.PRODUCTS.name,
            title: 'Productos',
            callback: DisplayFunctions.getProducts,
            filterType: 'entity',
            entityName: OrderSalePropertiesReference.PRODUCTS.name,
            entityFieldName: 'description'
          },
          {
            name: OrderSalePropertiesReference.CLIENT.name,
            title: OrderSalePropertiesReference.CLIENT.title,
            callback: DisplayFunctions.getPersona,
            filterType: 'entity',
            entityName: EntityTypes.CLIENT.name,
            entityFieldName: 'fullname'
          },
          {
            name: OrderSalePropertiesReference.ORDER_SALE_STATUS.name,
            title: OrderSalePropertiesReference.ORDER_SALE_STATUS.title,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.ORDER_SALE_STATUS.name,
            entityFieldName: 'name'
          },
          {
            name: OrderSalePropertiesReference.ORDER_SALE_COLLECTION_STATUS.name,
            title: OrderSalePropertiesReference.ORDER_SALE_COLLECTION_STATUS.title,
            callback: DisplayFunctions.getNameFromObject,
            filterType: 'entity',
            entityName: EntityTypes.ORDER_SALE_COLLECTION_STATUS.name,
            entityFieldName: 'name'
          },
          {
            name: OrderSalePropertiesReference.ORDER_REQUEST.name,
            title: OrderSalePropertiesReference.ORDER_REQUEST.title,
            callback: DisplayFunctions.getPropertyFromObject.name + '|order_code',
            filterType: 'entity',
            entityName: EntityTypes.ORDER_REQUEST.name,
            entityFieldName: 'order_code'
          },
          {
            name: OrderSalePropertiesReference.TOTAL_COST.name,
            title: OrderSalePropertiesReference.TOTAL_COST.title,
            callback: DisplayFunctions.getValue
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
      MauDataTable
    },
    methods: {
      actionHandler: function (action, entityObj) {
        if (action.name === 'view') {
          this.$router.push({
            name: 'ViewOrderSale',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
