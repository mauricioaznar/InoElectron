<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
      :relationshipIdName="'expense_id'"
    >
      <template slot-scope="params">
        <invoice-expense-form :saveFunction="params.save"></invoice-expense-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  import InvoiceExpenseForm from './components/InvoiceExpenseForm'
  export default {
    name: 'CreateInvoiceExpense',
    data () {
      return {
        entityType: EntityTypes.INVOICE_EXPENSE
      }
    },
    props: {
      onTheFly: {
        type: Function
      }
    },
    components: {
      InvoiceExpenseForm
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    methods: {
      callback: function () {
        if (this.onTheFly) {
          this.onTheFly()
        } else {
          this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
        }
      }
    }
  }
</script>
