<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      @actionClicked="actionHandler"
                      :actions="actions"
                      :localStoragePrefix="'companyList'"
      >
      </mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import CompanyPropertiesReference from 'renderer/api/propertiesReference/CompanyPropertiesReference'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  export default {
    name: 'ListCompany',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.COMPANY.apiName, {paginate: true}),
        tableFields: [
          {
            title: CompanyPropertiesReference.NAME.title,
            name: CompanyPropertiesReference.NAME.name,
            filterType: 'text'
          },
          {
            title: CompanyPropertiesReference.ABBREVIATION.title,
            name: CompanyPropertiesReference.ABBREVIATION.name,
            filterType: 'text'
          },
          {
            title: CompanyPropertiesReference.CITY.title,
            name: CompanyPropertiesReference.CITY.name,
            filterType: 'text'
          },
          {
            title: CompanyPropertiesReference.ZIP_CODE.title,
            name: CompanyPropertiesReference.ZIP_CODE.name,
            filterType: 'text'
          },
          {
            title: CompanyPropertiesReference.CLIENTS.title,
            name: CompanyPropertiesReference.CLIENTS.name,
            callback: DisplayFunctions.getPersonaArray,
            filterType: 'entity',
            entityName: CompanyPropertiesReference.CLIENTS.name,
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
            name: 'ViewCompany',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
