<template>
    <div>
        <div v-for="expenseItem in expenseItems">
            {{expenseItem}}
        </div>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          expenseItems: []
        }
      },
      created () {
        this.expenseItems = this.initialExpenseItems
      },
      props: {
        initialExpenseItems: {
          type: Array,
          required: true
        }
      }
    }
</script>

<style>
</style>
