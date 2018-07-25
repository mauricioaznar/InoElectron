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
  import SimpleOrderPropertiesReference from 'renderer/api/propertiesReference/BagOrderPropertiesReference'
  import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  export default {
    name: 'ListBagOrderProduction',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.BAG_ORDER_PRODUCTION),
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
            name: 'ViewBagOrderProduction',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
