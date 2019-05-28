<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      @actionClicked="actionHandler"
                      :actions="actions"
                      :localStoragePrefix="'clientList'"
      >
      </mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import ClientPropertiesReference from 'renderer/api/propertiesReference/ClientPropertiesReference'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  export default {
    name: 'ListClient',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.CLIENT.apiName, {paginate: true}),
        tableFields: [
          {
            title: ClientPropertiesReference.NAME.title,
            name: ClientPropertiesReference.NAME.name,
            filterType: 'text'
          },
          {
            title: ClientPropertiesReference.ABBREVIATION.title,
            name: ClientPropertiesReference.ABBREVIATION.name,
            filterType: 'text'
          },
          {
            title: ClientPropertiesReference.CITY.title,
            name: ClientPropertiesReference.CITY.name,
            filterType: 'text'
          },
          {
            title: ClientPropertiesReference.ZIP_CODE.title,
            name: ClientPropertiesReference.ZIP_CODE.name,
            filterType: 'text'
          },
          {
            title: ClientPropertiesReference.CONTACTS.title,
            name: ClientPropertiesReference.CONTACTS.name,
            callback: DisplayFunctions.getPersonaArray,
            filterType: 'entity',
            entityName: ClientPropertiesReference.CONTACTS.name,
            entityFieldName: 'fullname'
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
            name: 'ViewClient',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
