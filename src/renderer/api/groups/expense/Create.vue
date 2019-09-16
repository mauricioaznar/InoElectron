<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
      :relationshipIdName="'expense_id'"
    >
      <template slot-scope="params">
        <expense-form :saveFunction="params.save"></expense-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import ExpenseForm from 'renderer/api/components/forms/ExpenseForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateExpense',
    data () {
      return {
        entityType: EntityTypes.EXPENSE
      }
    },
    props: {
      onTheFly: {
        type: Function
      }
    },
    components: {
      ExpenseForm
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
