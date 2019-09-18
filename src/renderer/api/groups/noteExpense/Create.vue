<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
      :relationshipIdName="'expense_id'"
    >
      <template slot-scope="params">
        <note-expense-form :saveFunction="params.save"></note-expense-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  import NoteExpenseForm from './components/NoteExpenseForm'
  export default {
    name: 'CreateExpense',
    data () {
      return {
        entityType: EntityTypes.NOTE_EXPENSE
      }
    },
    props: {
      onTheFly: {
        type: Function
      }
    },
    components: {
      NoteExpenseForm
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
