<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :actions="actions"
                      @actionClicked="actionHandler"
                      :localStoragePrefix="'branchList'"
      ></mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import BranchPropertiesReference from 'renderer/api/propertiesReference/BranchPropertiesReference'
  import MauDataTable from 'renderer/api/components/dataTables/MauDataTable'
  // import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ListBranch',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.BRANCH.apiName, {paginate: true}),
        actions: [
          {
            name: 'view',
            title: 'Ver',
            icon: 'fa fa-eye'
          }
        ],
        tableFields: [
          {
            title: BranchPropertiesReference.NAME.title,
            name: BranchPropertiesReference.NAME.name,
            filterType: 'text'
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
            name: 'ViewBranch',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
