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
  import ApiUrls from 'renderer/api/functions/ApiUrls'
  import OrderProductionPropertiesReference from 'renderer/api/propertiesReference/OrderProductionPropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'ListRollOrderProduction',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.ROLL_ORDER_PRODUCTION),
        filterExact: {[OrderProductionPropertiesReference.ORDER_PRODUCTION_TYPE.relationship_id_name]: 2},
        canEdit: true,
        tableFields: [
          {
            name: OrderProductionPropertiesReference.PRODUCTS.name,
            title: OrderProductionPropertiesReference.PRODUCTS.title,
            hidden: true,
            callback: DisplayFunctions.getProducts.name + '|' + 2
          },
          {
            name: OrderProductionPropertiesReference.START_DATE_TIME.name,
            title: OrderProductionPropertiesReference.START_DATE_TIME.title,
            sortField: OrderProductionPropertiesReference.START_DATE_TIME.name,
            filter: true
          },
          {
            name: OrderProductionPropertiesReference.END_DATE_TIME.name,
            title: OrderProductionPropertiesReference.END_DATE_TIME.title,
            sortField: OrderProductionPropertiesReference.END_DATE_TIME.name,
            filter: true
          },
          {
            name: OrderProductionPropertiesReference.EMPLOYEE.name,
            title: OrderProductionPropertiesReference.EMPLOYEE.title,
            callback: DisplayFunctions.getPersona
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
            name: 'ViewRollOrderProduction',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
