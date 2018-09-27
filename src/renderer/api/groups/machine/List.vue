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
  import MachinePropertiesReference from 'renderer/api/propertiesReference/MachinePropertiesReference'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ListMachine',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.MACHINE),
        actions: [
          {
            name: 'view',
            title: 'Ver',
            icon: 'fa fa-eye'
          }
        ],
        tableFields: [
          {
            title: MachinePropertiesReference.NAME.title,
            name: MachinePropertiesReference.NAME.name
          },
          {
            title: MachinePropertiesReference.MACHINE_TYPE.title,
            name: MachinePropertiesReference.MACHINE_TYPE.name,
            callback: DisplayFunctions.getNameFromObject,
            entity: EntityTypes.MACHINE_TYPE.name,
            entityFieldName: 'name'
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
            name: 'ViewMachine',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
