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
  import OrderSalePropertiesReference from 'renderer/api/propertiesReference/OrderSalePropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'ListBagOrderSale',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.ORDER_SALE),
        tableFields: [
          {
            name: OrderSalePropertiesReference.ORDER_CODE.name,
            title: OrderSalePropertiesReference.ORDER_CODE.title,
            sortField: OrderSalePropertiesReference.ORDER_CODE.name,
            filter: true
          },
          {
            name: OrderSalePropertiesReference.DATE.name,
            title: OrderSalePropertiesReference.DATE.title,
            sortField: OrderSalePropertiesReference.DATE.name,
            callback: DisplayFunctions.getDateFromDateTime,
            filter: true,
            default: true
          },
          {
            name: OrderSalePropertiesReference.RECEIPT_TYPE.name,
            title: OrderSalePropertiesReference.RECEIPT_TYPE.title,
            callback: DisplayFunctions.getNameFromObject,
            entity: EntityTypes.RECEIPT_TYPE.name,
            entityFieldName: 'name'
          },
          {
            name: OrderSalePropertiesReference.PRODUCTS.name,
            title: 'Productos entregados',
            hidden: true,
            callback: DisplayFunctions.getOrderSaleProducts.name
          },
          {
            name: OrderSalePropertiesReference.CLIENT.name,
            title: OrderSalePropertiesReference.CLIENT.title,
            callback: DisplayFunctions.getPersona,
            entity: EntityTypes.CLIENT.name,
            entityFieldName: 'name'
          },
          {
            name: OrderSalePropertiesReference.ORDER_SALE_STATUS.name,
            title: OrderSalePropertiesReference.ORDER_SALE_STATUS.title,
            callback: DisplayFunctions.getNameFromObject,
            entity: EntityTypes.ORDER_SALE_STATUS.name,
            entityFieldName: 'name'
          },
          {
            name: OrderSalePropertiesReference.ORDER_REQUEST.name,
            title: OrderSalePropertiesReference.ORDER_REQUEST.title,
            callback: DisplayFunctions.getPropertyFromObject.name + '|' + 'order_code',
            entity: EntityTypes.ORDER_REQUEST.name,
            entityFieldName: 'order_code'
          },
          {
            name: OrderSalePropertiesReference.TOTAL_COST.name,
            title: OrderSalePropertiesReference.TOTAL_COST.title,
            callback: DisplayFunctions.getValue,
            hidden: true
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
            name: 'ViewOrderSale',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
