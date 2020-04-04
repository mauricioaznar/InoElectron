<template>
    <div>
        <mau-spinner
                v-if="isLoading"
                :sizeType="'dataTable'"
        >
        </mau-spinner>
        <div v-else>
            {{expenses.length}}
            <button @click="createExcelFile">Create excel file</button>
        </div>>
    </div>
</template>

<script>
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    import EntityTypes from 'renderer/api/EntityTypes'
    import {remote} from 'electron'
    // import moment from 'moment'
    import xlsx from 'xlsx'
    export default {
      name: 'ExpenseReportTwo',
      data () {
        return {
          isLoading: true,
          expenses: []
        }
      },
      created () {
        Promise.all([
          GenericApiOperations.list(EntityTypes.EXPENSE.apiName, {paginate: false, filterStartDateTime: {date: '2020-01-01'}, filterEndDateTime: {date: '2020-02-01'}})
        ])
          .then(result => {
            this.expenses = result[0]
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      methods: {
        createExcelFile: function () {
          let options = {
            title: 'Save file',
            defaultPath: 'my_file',
            buttonLabel: 'Save',
            filters: [
              {name: 'xlsx', extensions: ['xlsx']},
              {name: 'txt', extensions: ['txt']},
              {name: 'All Files', extensions: ['*']}
            ]
          }
          let workbook = xlsx.utils.book_new()
          let data = this.expenses.map(expense => {
            let total = 0
            expense.expense_items.forEach(expenseItem => {
              total += expenseItem.subtotal
            })
            return {total: total, supplier: expense.supplier.name, date: expense.date}
          })
          let ws = xlsx.utils.json_to_sheet(data)
          xlsx.utils.book_append_sheet(workbook, ws, 'Results')
          let o = remote.dialog.showSaveDialog(options)
          xlsx.writeFile(workbook, o)
        }
      }
    }
</script>
