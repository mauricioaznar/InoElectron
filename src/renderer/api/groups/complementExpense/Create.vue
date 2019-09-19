<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
      :relationshipIdName="'expense_id'"
    >
      <template slot-scope="params">
        <complement-expense-form :saveFunction="params.save"></complement-expense-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  import ComplementExpenseForm from './components/ComplementExpenseForm'
  export default {
    name: 'CreateComplementExpense',
    data () {
      return {
        entityType: EntityTypes.COMPLEMENT_EXPENSE
      }
    },
    props: {
      onTheFly: {
        type: Function
      }
    },
    components: {
      ComplementExpenseForm
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
