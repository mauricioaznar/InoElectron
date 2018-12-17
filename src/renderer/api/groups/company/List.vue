<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      @actionClicked="actionHandler"
                      :actions="actions"
      >
      </mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import CompanyPropertiesReference from 'renderer/api/propertiesReference/CompanyPropertiesReference'
  import ApiUrls from 'renderer/api/functions/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'ListCompany',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.COMPANY),
        tableFields: [
          {
            title: CompanyPropertiesReference.NAME.title,
            name: CompanyPropertiesReference.NAME.name
          },
          {
            title: CompanyPropertiesReference.ABBREVIATION.title,
            name: CompanyPropertiesReference.ABBREVIATION.name
          },
          {
            title: CompanyPropertiesReference.CITY.title,
            name: CompanyPropertiesReference.CITY.name
          },
          {
            title: CompanyPropertiesReference.ZIP_CODE.title,
            name: CompanyPropertiesReference.ZIP_CODE.name
          },
          {
            title: CompanyPropertiesReference.CLIENTS.title,
            name: CompanyPropertiesReference.CLIENTS.name,
            callback: DisplayFunctions.getPersonaArray,
            hidden: true
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
            name: 'ViewCompany',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
