<template>
  <div class="container">
    <mau-crud-create
      :entityApiName="entityApiName"
      :callback="callback"
      :relationshipIdName="hostRelationshipIdName"
      :relatedEntitiesRoutes="relatedEntitiesRoutes"
    >
      <template slot-scope="params">
        <transaction-form
                :saveFunction="params.save"
                :expenseMode="true"
        >
        </transaction-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import TransactionForm from '../../components/generic/transaction/TransactionForm.vue'
  import TransactionPropertiesReference from 'renderer/api/propertiesReference/TransactionPropertiesReference'
//  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'CreateExpense',
    data () {
      return {
        hostRelationshipIdName: TransactionPropertiesReference.ID.relationship_id_name,
        entityApiName: EntityTypes.EXPENSE.apiName,
        relatedEntitiesRoutes: {},
        entityType: EntityTypes.EXPENSE
      }
    },
    components: {
      TransactionForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.EXPENSE, ChildTypes.LIST)})
      }
    }
  }
</script>
