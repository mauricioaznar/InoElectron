<template>
  <div>
    <mau-crud-list :entityName="'Expense'">
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
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  import TransactionPropertiesReference from 'renderer/api/propertiesReference/TransactionPropertiesReference'
  import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  export default {
    name: 'ListExpense',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.EXPENSE),
        canEdit: true,
        tableFields: [
          {
            name: TransactionPropertiesReference.COST.name,
            title: TransactionPropertiesReference.COST.title,
            sortField: TransactionPropertiesReference.COST.name,
            filter: true
          },
          {
            name: TransactionPropertiesReference.DATE.name,
            title: TransactionPropertiesReference.DATE.title,
            sortField: TransactionPropertiesReference.DATE.name,
            callback: TransactionPropertiesReference.DATE.display,
            filter: true,
            default: true
          },
          {
            name: TransactionPropertiesReference.SUPPLIER.name,
            title: TransactionPropertiesReference.SUPPLIER.title,
            callback: DisplayFunctions.getNameFromObject
          },
          {
            name: TransactionPropertiesReference.EXPENSE_TYPE.name,
            title: TransactionPropertiesReference.EXPENSE_TYPE.title,
            callback: DisplayFunctions.getNameFromObject
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
            name: 'ViewExpense',
            params: { id: entityObj[GlobalEntityIdentifier] }
          })
        }
      }
    }
  }
</script>
