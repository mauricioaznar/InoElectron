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
  import BagOrderProductionPropertiesReference from 'renderer/api/propertiesReference/BagOrderProductionPropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'ListBagOrderProduction',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.BAG_ORDER_PRODUCTION),
        canEdit: true,
        tableFields: [
          {
            name: BagOrderProductionPropertiesReference.BAGS.name,
            title: BagOrderProductionPropertiesReference.BAGS.title,
            hidden: true,
            callback: DisplayFunctions.getBagWithUnits
          },
          {
            name: BagOrderProductionPropertiesReference.MACHINE.name,
            title: BagOrderProductionPropertiesReference.MACHINE.title,
            callback: DisplayFunctions.getNameFromObject
          },
          {
            name: BagOrderProductionPropertiesReference.EMPLOYEE.name,
            title: BagOrderProductionPropertiesReference.EMPLOYEE.title,
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
            name: 'ViewBagOrderProduction',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
