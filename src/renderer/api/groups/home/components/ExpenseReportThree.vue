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
                            <b>{{currencyFormat(expenseCategory.filteredTotal)}}</b>
                        </div>
                    </div>
                    <div class="pl-3 row mt-1"
                         v-for="expenseSubcategory in expenseSubcategories.filter(loopedExpenseSubcategory => { return loopedExpenseSubcategory.expense_category_id === expenseCategory.id })"
                        >
                        <div class="col-sm-8">
                            {{expenseSubcategory.name}}
                        </div>
                        <div class="col-sm-4 text-right">
                            {{currencyFormat(expenseSubcategory.filteredTotal)}}
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
                <div class="mt-1" v-if="!isLoading" v-for="expense in filteredExpenses">
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
    import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import Vue from 'vue'
    const dateFormat = 'YYYY-MM-DD'
    export default {
      name: 'ExpenseReportTwo',
      data () {
        return {
          isLoading: true,
          allExpenses: [],
          filteredExpenses: [],
          expenseCategories: [],
          expenseSubcategories: [],
          selectedExpenseSubcategory: '',
          initialStartDate: moment().subtract(7 + moment().isoWeekday() - 1, 'days').format(dateFormat),
          startDate: moment().subtract(7 + moment().isoWeekday() - 1, 'days').format(dateFormat),
          initialEndDate: moment().subtract(moment().isoWeekday(), 'days').format(dateFormat),
          endDate: moment().subtract(moment().isoWeekday(), 'days').format(dateFormat)
        }
      },
      created () {
        this.getExpenses()
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
          this.filteredExpenses.forEach(expense => {
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
        filterExpenses: async function () {
          if (this.startDate === '' || this.endDate === '') {
            return
          }
          let startDateMoment = moment(this.startDate, 'YYYY-MM-DD')
          let endDateMoment = moment(this.endDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
          this.expenseCategories = this.expenseCategories.map(expenseCategory => { return {...expenseCategory, filteredTotal: 0} })
          this.expenseSubcategories = this.expenseSubcategories.map(expenseSubcategory => { return {...expenseSubcategory, filteredTotal: 0} })
          let allExpenses = cloneDeep(this.allExpenses)
          let filteredExpenses = []
          allExpenses.forEach(expense => {
            let datePaidMoment = moment(expense.date_paid, dateFormat)
            if (datePaidMoment.isBetween(startDateMoment, endDateMoment, '[]')) {
              filteredExpenses.push(expense)
              expense.expense_items.forEach(expenseItem => {
                let loopedExpenseItemExpenseSubcategoryId = expenseItem.expense_subcategory_id
                let loopedExpenseItemExpenseSCategoryId = expenseItem.expense_subcategory.expense_category_id
                let foundExpenseCategory = this.expenseCategories.find(expenseCategory => { return expenseCategory.id === loopedExpenseItemExpenseSCategoryId })
                let foundExpenseSubcategory = this.expenseSubcategories.find(expenseSubcategory => { return expenseSubcategory.id === loopedExpenseItemExpenseSubcategoryId })
                foundExpenseCategory.filteredTotal += expenseItem.subtotal
                foundExpenseSubcategory.filteredTotal += expenseItem.subtotal
              })
            }
          })
          filteredExpenses.sort(function (a, b) {
            let aMomentDate = moment(a.date_paid, 'YYYY-MM-DD')
            let bMomentDate = moment(b.date_paid, 'YYYY-MM-DD')
            return (aMomentDate.isAfter(bMomentDate) ? 1
              : aMomentDate.isBefore(bMomentDate) ? -1 : 0)
          })
          this.filteredExpenses = filteredExpenses
        },
        getExpenses: async function () {
          await this.getDependentEntities()
          await this.getAllExpensesSerial()
          await this.filterExpenses()
        },
        getDependentEntities: async function () {
          Promise.all([
            GenericApiOperations.list(EntityTypes.EXPENSE_CATEGORY.apiName),
            GenericApiOperations.list(EntityTypes.EXPENSE_SUBCATEGORY.apiName)
          ])
            .then(result => {
              this.expenseCategories = result[0].map(expenseCategory => {
                return {...expenseCategory, filteredTotal: 0}
              })
              this.expenseSubcategories = result[1].map(expenseSubcategory => {
                return {...expenseSubcategory, filteredTotal: 0}
              })
            })
            .finally(() => {
              this.isLoading = false
            })
        },
        getAllExpensesSerial: async function () {
          this.isLoading = true
          let currentPage = 1
          let perPage = 900
          let nextPageUrl = GenericApiUrls.createListUrl(EntityTypes.EXPENSE.apiName, {paginate: true, page: currentPage, perPage: perPage})
          let totalData = []
          while (nextPageUrl !== null) {
            await Vue.http.get(nextPageUrl).then(result => {
              totalData = totalData.concat(result.data.data)
              return result.body.links.pagination
            }).then(result => {
              if (currentPage === result.last_page) {
                nextPageUrl = null
              } else {
                currentPage++
                nextPageUrl = GenericApiUrls.createListUrl(EntityTypes.EXPENSE.apiName, {paginate: true, page: currentPage, perPage: perPage})
              }
            })
          }
          this.allExpenses = totalData
          this.isLoading = false
        },
        currencyFormat: function (num) {
          return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
      },
      watch: {
        startDate: function () {
          this.filterExpenses()
        },
        endDate: function () {
          this.filterExpenses()
        }
      }
    }
</script>
