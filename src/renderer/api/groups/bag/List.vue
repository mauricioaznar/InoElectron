<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :actions="actions"
                      @actionClicked="actionHandler"
      >
      </mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import PropertiesReference from 'renderer/api/propertiesReference/BagPropertiesReference'
  import ApiUrls from 'renderer/api/functions/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'ListBag',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.BAG),
        tableFields: [
          {
            name: PropertiesReference.NAME.name,
            title: PropertiesReference.NAME.title,
            dataClass: 'text-center'
          },
          {
            name: PropertiesReference.DESCRIPTION.name,
            title: PropertiesReference.DESCRIPTION.title,
            dataClass: 'text-center'
          },
          {
            name: PropertiesReference.BAG_TYPE.name,
            title: PropertiesReference.BAG_TYPE.title,
            callback: DisplayFunctions.getNameFromObject
          },
          {
            name: PropertiesReference.BAG_PACKING.name,
            title: PropertiesReference.BAG_PACKING.title,
            callback: DisplayFunctions.getNameFromObject
          },
          {
            name: PropertiesReference.WIDTH.name,
            title: PropertiesReference.WIDTH.title
          },
          {
            name: PropertiesReference.LENGTH.name,
            title: PropertiesReference.LENGTH.title
          },
          {
            name: PropertiesReference.CURRENT_GROUP_WEIGHT.name,
            title: PropertiesReference.CURRENT_GROUP_WEIGHT.title
          },
          {
            name: PropertiesReference.CURRENT_KILO_PRICE.name,
            title: PropertiesReference.CURRENT_KILO_PRICE.title
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
            name: 'ViewBag',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
