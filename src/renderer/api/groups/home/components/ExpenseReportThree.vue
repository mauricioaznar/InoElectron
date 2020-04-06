<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-5">
                <mau-form-input-date
                        :name="'startDate'"
                        :label="'Fecha de inicio'"
                        v-model="startDate"
                        :error="errors.has('starteDate') ? errors.first('startDate') : ''"
                        v-validate="'required'"
                        @change="getExpenses"
                >
                </mau-form-input-date>
            </div>
            <div class="col-sm-12 col-md-5">
                <mau-form-input-date
                        :name="'endDate'"
                        :label="'Fecha de fin'"
                        v-model="endDate"
                        :error="errors.has('endDate') ? errors.first('endDate') : ''"
                        v-validate="'required'"
                        @change="getExpenses"
                >
                </mau-form-input-date>
            </div>
            <div class="col-md-2">
                <button v-if="!isLoading" class="btn btn-excel" @click="createExcelFile">Excel</button>
            </div>
        </div>
        <mau-spinner
                v-if="isLoading"
                :sizeType="'dataTable'"
        >
        </mau-spinner>
        <div class="row mt-3" v-if="!isLoading">
            <table class="table">
               <thead>
               <tr>
               </tr>
               </thead>
                <tbody>
                    <tr v-for="expense in expenses">
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    import EntityTypes from 'renderer/api/EntityTypes'
    import {remote} from 'electron'
    import moment from 'moment'
    import xlsx from 'xlsx'
    export default {
      name: 'ExpenseReportTwo',
      data () {
        return {
          isLoading: true,
          expenses: [],
          expenseCategories: [],
          expenseSubcategories: [],
          startDate: '',
          endDate: ''
        }
      },
      created () {
        Promise.all([
          GenericApiOperations.list(EntityTypes.EXPENSE_CATEGORY.apiName),
          GenericApiOperations.list(EntityTypes.EXPENSE_SUBCATEGORY.apiName)
        ])
          .then(result => {
            this.expenseCategories = result[0].map(expenseCategory => {
              return {name: expenseCategory.name, id: expenseCategory.id, total: 0}
            })
            this.expenseSubcategories = result[1].map(expenseSubcategory => {
              return {name: expenseSubcategory.name, id: expenseSubcategory.id, total: 0, expense_category_id: expenseSubcategory.expense_category_id}
            })
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
          let data = this.expenses
          let ws = xlsx.utils.json_to_sheet(data)
          xlsx.utils.book_append_sheet(workbook, ws, 'Results')
          let o = remote.dialog.showSaveDialog(options)
          xlsx.writeFile(workbook, o)
        },
        getExpenses: function () {
          if (this.startDate === '' || this.endDate === '') {
            return
          }
          this.isLoading = true
          let startMomentDate = moment(this.startDate, 'YYYY-MM-DD')
          let startDate = startMomentDate.format('YYYY-MM-DD')
          let endDate = moment(this.endDate, 'YYYY-MM-DD').add(1, 'd').format('YYYY-MM-DD')
          Promise.all([
            GenericApiOperations.list(EntityTypes.EXPENSE.apiName,
              {paginate: false,
                filterStartDateTime: {date_paid: startDate},
                filterEndDateTime: {date_paid: endDate}
              })
          ])
            .then(result => {
              let expenses = result[0]
              // this.expenses = expenses.forEach(expense => {
              //   expense.expense_items.forEach(expenseItem => {
              //     let loopedExpenseItemExpenseSubcategoryId = expenseItem.expense_subcategory_id
              //     let loopedExpenseItemExpenseSCategoryId = expenseItem.expense_category_id
              //     let foundExpenseCategory = this.expenseCategories.find(expenseCategory => { return expenseCategory.id === loopedExpenseItemExpenseSCategoryId })
              //     let foundExpenseSubcategory = this.expenseSubcategories.find(expenseSubcategory => { return expenseSubcategory.id === loopedExpenseItemExpenseSubcategoryId })
              //     foundExpenseCategory.total += expenseItem.subtotal
              //     foundExpenseSubcategory.total += expenseItem.subtotal
              //   })
              // })
              this.expenses = expenses
            })
            .finally(() => {
              this.isLoading = false
            })
        }
      },
      watch: {
        yearSelected: function () {
          this.getExpenses()
        },
        monthSelected: function () {
          this.getExpenses()
        }
      }
    }
</script>
