<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-5">
                <mau-form-input-date
                        :name="'startDate'"
                        :label="'Fecha de inicio'"
                        v-model="startDate"
                        :error="errors.has('starteDate') ? errors.first('startDate') : ''"
                        :initialValue="initialStartDate"
                        v-validate="'required'"
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
                        :initialValue="initialEndDate"
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
            <div class="col-sm-6">
                <div class="row mt-5">
                    <div class="col-sm-6 text-center text-uppercase"><b>Nombre</b></div>
                    <div class="col-sm-6 text-center text-uppercase"><b>Total</b></div>
                </div>
                <div class="mt-3" v-if="!isLoading" v-for="expenseCategory in expenseCategories">
                    <div class="row">
                        <div class="col-sm-8">
                            <b>{{expenseCategory.name}}</b>
                        </div>
                        <div class="col-sm-4 text-right">
                            <b>{{currencyFormat(expenseCategory.total)}}</b>
                        </div>
                    </div>
                    <div class="pl-3 row mt-1"
                         v-for="expenseSubcategory in expenseSubcategories.filter(loopedExpenseSubcategory => { return loopedExpenseSubcategory.expense_category_id === expenseCategory.id })"
                        >
                        <div class="col-sm-8">
                            {{expenseSubcategory.name}}
                        </div>
                        <div class="col-sm-4 text-right">
                            {{currencyFormat(expenseSubcategory.total)}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <div class="row">
                    <div class="col-sm-2 text-center text-uppercase"><b>Fecha</b></div>
                    <div class="col-sm-3 text-center text-uppercase"><b>Proveedor</b></div>
                    <div class="col-sm-3 text-center text-uppercase"><b>Concepto</b></div>
                    <div class="col-sm-2 text-center text-uppercase"><b>Rubro</b></div>
                    <div class="col-sm-2 text-center text-uppercase"><b>Total</b></div>
                </div>
                <div class="mt-1" v-if="!isLoading" v-for="expense in expenses">
                    <div v-for="expenseItem in expense.expense_items">
                        <hr>
                        <div class="row">
                            <div class="col-sm-2 text-center">{{expense.date_paid}}</div>
                            <div class="col-sm-3">{{expense.supplier.name}}</div>
                            <div class="col-sm-3">{{expenseItem.description}}</div>
                            <div class="col-sm-2">{{expenseItem.expense_subcategory.name}}</div>
                            <div class="col-sm-2 text-right">{{currencyFormat(expenseItem.subtotal)}}</div>
                        </div>
                    </div>
                </div>
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
          selectedExpenseSubcategory: '',
          startDate: '',
          initialStartDate: moment('2020-03-26', 'YYYY-MM-DD').format('YYYY-MM-DD'),
          endDate: '',
          initialEndDate: moment('2020-04-01', 'YYYY-MM-DD').format('YYYY-MM-DD')
        }
      },
      created () {
        this.isLoading = true
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
          let expenses = []
          this.expenses.forEach(expense => {
            expense.expense_items.forEach(expenseItem => {
              expenses.push({
                'Fecha': expense.date_paid,
                'Proveedor': expense.supplier.name,
                'Descripcion': expenseItem.description,
                'Rubro': expenseItem.expense_subcategory.name,
                'Total': expenseItem.subtotal
              })
            })
          })
          let expensesWS = xlsx.utils.json_to_sheet(expenses)
          let expenseCategoriesWS = xlsx.utils.json_to_sheet(this.expenseCategories)
          let expenseSubcategoriesWS = xlsx.utils.json_to_sheet(this.expenseSubcategories)
          xlsx.utils.book_append_sheet(workbook, expensesWS, 'Gastos')
          xlsx.utils.book_append_sheet(workbook, expenseCategoriesWS, 'Categorias')
          xlsx.utils.book_append_sheet(workbook, expenseSubcategoriesWS, 'Rubros')
          let o = remote.dialog.showSaveDialog(options)
          xlsx.writeFile(workbook, o)
        },
        getExpenses: function () {
          if (this.startDate === '' || this.endDate === '') {
            return
          }
          this.expenseCategories = this.expenseCategories.map(expenseCategory => { return {...expenseCategory, total: 0} })
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
              expenses.forEach(expense => {
                expense.expense_items.forEach(expenseItem => {
                  let loopedExpenseItemExpenseSubcategoryId = expenseItem.expense_subcategory_id
                  let loopedExpenseItemExpenseSCategoryId = expenseItem.expense_category_id
                  let foundExpenseCategory = this.expenseCategories.find(expenseCategory => { return expenseCategory.id === loopedExpenseItemExpenseSCategoryId })
                  let foundExpenseSubcategory = this.expenseSubcategories.find(expenseSubcategory => { return expenseSubcategory.id === loopedExpenseItemExpenseSubcategoryId })
                  foundExpenseCategory.total += expenseItem.subtotal
                  foundExpenseSubcategory.total += expenseItem.subtotal
                })
              })
              expenses.sort(function (a, b) {
                let aMomentDate = moment(a.date_paid, 'YYYY-MM-DD')
                let bMomentDate = moment(b.date_paid, 'YYYY-MM-DD')
                return (aMomentDate.isAfter(bMomentDate) ? 1
                  : aMomentDate.isBefore(bMomentDate) ? -1 : 0)
              })
              this.expenses = expenses
            })
        },
        currencyFormat: function (num) {
          return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
      },
      watch: {
        startDate: function () {
          this.getExpenses()
        },
        endDate: function () {
          this.getExpenses()
        }
      }
    }
</script>
