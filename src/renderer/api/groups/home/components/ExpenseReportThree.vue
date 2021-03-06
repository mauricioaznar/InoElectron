<template>
    <div>
        <mau-spinner
            v-if="isLoading"
            :sizeType="'dataTable'"
        >
        </mau-spinner>
        <div class="d-flex justify-content-between"
             v-if="!isLoading"
        >
            <h2>Reporte general</h2>
            <div class="d-flex">
                <a href="#" class="fa fa-file-excel-o p-2" @click.prevent="createExcelFile()"></a>
                <a href="#" class="fa fa-clipboard p-2" @click.prevent="copyToClipboard()"></a>
            </div>
        </div>
        <div class="row"
             v-if="!isLoading"
        >
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
                <button class="btn btn-excel" @click="createExcelFile">Excel</button>
            </div>
        </div>
        <div class="row"
             v-if="!isLoading"
        >
            <div class="col-sm-6">
                <div class="row mt-5">
                    <p>Total de dinero en ventas: {{currencyFormat(filteredTotalMoneyGained)}}</p>
                </div>
                <div class="row mt-5">
                    <p>Total de kilos producidos en bolseo: {{currencyFormat(filteredTotalKilosBagProduced)}}</p>
                </div>
                <div class="row mt-5">
                    <p>Total de kilos en ventas: {{currencyFormat(filteredTotalKilosSold)}}</p>
                </div>
                <div class="row mt-5">
                    <p>Total de kilos producidos en extrusion: {{currencyFormat(filteredTotalKilosRollProduced)}}</p>
                </div>
            </div>
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
        </div>
    </div>
</template>

<script>
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    import EntityTypes from 'renderer/api/EntityTypes'
    import {remote, clipboard} from 'electron'
    import moment from 'moment'
    import xlsx from 'xlsx'
    import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import Vue from 'vue'
    const dateFormat = 'YYYY-MM-DD'
    const startWeekDate = '2019-09-02'
    export default {
      name: 'ExpenseReportTwo',
      data () {
        return {
          isLoading: true,
          allExpenses: [],
          bagOrderProductions: [],
          rollOrderProductions: [],
          materials: [],
          sales: [],
          filteredExpenses: [],
          filteredBagOrderProductions: [],
          filteredRollOrderProductions: [],
          filteredSales: [],
          filteredTotalKilosBagProduced: 0,
          filteredTotalKilosRollProduced: 0,
          filteredTotalKilosSold: 0,
          filteredTotalMoneyGained: 0,
          filteredDays: [],
          expenseCategories: [],
          expenseSubcategories: [],
          weeks: [],
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
        copyToClipboard: function () {
          let filteredSales = this.sales.filter(sale => {
            let momentDateCollected = moment(sale.date_collected, dateFormat)
            let momentToday = moment().subtract(1, 'days')
            if (!momentDateCollected.isValid()) {
              return false
            }
            return momentToday.isBefore(momentDateCollected)
          })
          let clipboardText = 'COBRANZA:\n'
          filteredSales.sort((filteredSaleA, filteredSaleB) => {
            let momentDateCollectedA = moment(filteredSaleA.date_collected, dateFormat)
            let momentDateCollectedB = moment(filteredSaleB.date_collected, dateFormat)
            return momentDateCollectedA.isAfter(momentDateCollectedB, 'day')
          })
          filteredSales.forEach(filteredSale => {
            let momentDateCollected = moment(filteredSale.date_collected, dateFormat)
            let filteredSaleSummary = filteredSale.total_cost + ' ' + filteredSale.client.name + ' ' + momentDateCollected.format('D MMM')
            clipboardText = clipboardText + filteredSaleSummary + '\n'
          })
          clipboardText = clipboardText + '\n\n'
          let momentStartOfWeek = moment().startOf('isoWeek')
          let filteredDays = []
          let loopedDate = moment().startOf('isoWeek')
          while (!loopedDate.isSame(moment(), 'day')) {
            filteredDays.push({
              momentDate: loopedDate.clone(),
              date: loopedDate.format('D MMM'),
              bagTotalKilos: 0,
              rollTotalKilos: 0
            })
            loopedDate.add(1, 'days')
          }
          this.bagOrderProductions.forEach(bagOrderProduction => {
            let bagOrderProductionMomentDate = moment(bagOrderProduction.start_date_time, dateFormat)
            if (bagOrderProductionMomentDate.isBetween(momentStartOfWeek, moment(), undefined, '[]')) {
              let dayFound = filteredDays.find(dayObj => { return dayObj.momentDate.isSame(bagOrderProductionMomentDate, 'days') })
              if (dayFound) {
                bagOrderProduction.products.forEach(product => {
                  if (product.product_type_id === 1) {
                    dayFound.bagTotalKilos = dayFound.bagTotalKilos + product.pivot.kilos
                  }
                })
              }
            }
          })
          this.rollOrderProductions.forEach(rollOrderProduction => {
            let rollOrderProductionMomentDate = moment(rollOrderProduction.start_date_time, dateFormat)
            if (rollOrderProductionMomentDate.isBetween(momentStartOfWeek, moment(), undefined, '[]')) {
              let dayFound = filteredDays.find(dayObj => { return dayObj.momentDate.isSame(rollOrderProductionMomentDate, 'days') })
              if (dayFound) {
                rollOrderProduction.products.forEach(product => {
                  dayFound.rollTotalKilos = dayFound.rollTotalKilos + product.pivot.kilos
                })
              }
            }
          })
          clipboardText = clipboardText + 'RESUMEN SEMANAL:\n'
          filteredDays.forEach(filteredDay => {
            clipboardText = clipboardText + filteredDay.date + '\n' + 'Bolseo ' + filteredDay.bagTotalKilos + '\n' + 'Extrusion ' + filteredDay.rollTotalKilos + '\n\n'
          })
          clipboard.writeText(clipboardText)
        },
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
          let sales = []
          this.filteredSales.forEach(sale => {
            sale.products.forEach(product => {
              sales.push({
                'Codigo': sale.order_code,
                'Fecha': sale.date,
                'Tipo': sale.order_sale_receipt_type.name,
                'Cliente': sale.client.name,
                'Status': sale.order_sale_status.name,
                'Producto': product.description,
                'Kilos': product.pivot.kilos,
                'Precio': product.pivot.kilo_price,
                'Total': (product.pivot.kilos * product.pivot.kilo_price) * (sale.order_sale_receipt_type_id === 2 ? 1.16 : 1)
              })
            })
          })
          let expenses = []
          this.filteredExpenses.forEach(expense => {
            expense.expense_items.forEach(expenseItem => {
              expenses.push({
                'Fecha': expense.date_paid,
                'Proveedor': expense.supplier.name,
                'Descripcion': expenseItem.description,
                'Categoria': this.expenseCategories.find(expenseCategory => { return expenseCategory.id === expenseItem.expense_subcategory.expense_category_id }).name,
                'Rubro': expenseItem.expense_subcategory.name,
                'Total': expenseItem.subtotal
              })
            })
          })
          let filteredMapedExpenseCategoriesForElequilibriumPoint = this.expenseCategories
            .filter(expenseCategory => { return expenseCategory.id !== 7 })
            .map(expenseCategory => { return {'Rubro': expenseCategory.name, 'Valor': expenseCategory.filteredTotal} })
          let equilibriumPoint = [
            {'Rubro': 'Total de kilos en bolseo', 'Valor': this.filteredTotalKilosBagProduced},
            {'Rubro': 'Total de kilos en extrusion', 'Valor': this.filteredTotalKilosRollProduced},
            {'Rubro': '', 'Valor': ''},
            ...filteredMapedExpenseCategoriesForElequilibriumPoint,
            {'Rubro': '', 'Valor': ''},
            {'Rubro': 'Total de kilos en ventas', 'Valor': this.filteredTotalKilosSold},
            {'Rubro': 'Dinero en ventas', 'Valor': this.filteredTotalMoneyGained},
            {'Rubro': '', 'Valor': ''}
          ]
          let equilibriumWS = xlsx.utils.json_to_sheet(equilibriumPoint)
          let expensesWS = xlsx.utils.json_to_sheet(expenses)
          let salesWS = xlsx.utils.json_to_sheet(sales)
          let materialsWS = xlsx.utils.json_to_sheet(this.materials)
          let expenseCategoriesWS = xlsx.utils.json_to_sheet(this.expenseCategories)
          let expenseSubcategoriesWS = xlsx.utils.json_to_sheet(this.expenseSubcategories)
          let weeksWS = xlsx.utils.json_to_sheet(this.weeks)
          xlsx.utils.book_append_sheet(workbook, equilibriumWS, 'Punto de equilibrio')
          xlsx.utils.book_append_sheet(workbook, expensesWS, 'Gastos')
          xlsx.utils.book_append_sheet(workbook, expenseCategoriesWS, 'Categorias')
          xlsx.utils.book_append_sheet(workbook, expenseSubcategoriesWS, 'Rubros')
          xlsx.utils.book_append_sheet(workbook, materialsWS, 'Tipos de producto')
          xlsx.utils.book_append_sheet(workbook, salesWS, 'Ventas')
          xlsx.utils.book_append_sheet(workbook, weeksWS, 'Semanas')
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
            // Check the correct functioning of is between
            if (datePaidMoment.isSame(startDateMoment) || datePaidMoment.isSame(endDateMoment) || datePaidMoment.isBetween(startDateMoment, endDateMoment, '[]')) {
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
          this.filteredTotalKilosBagProduced = 0
          let bagOrderProductions = cloneDeep(this.bagOrderProductions)
          bagOrderProductions.forEach(bagOrderProduction => {
            let startDateTimeMoment = moment(bagOrderProduction.start_date_time, dateFormat)
            if (startDateTimeMoment.isSame(startDateMoment) || startDateTimeMoment.isSame(endDateMoment) || startDateTimeMoment.isBetween(startDateMoment, endDateMoment)) {
              bagOrderProduction.products.forEach(product => {
                if (product.product_type_id === 1) {
                  this.filteredTotalKilosBagProduced = this.filteredTotalKilosBagProduced + product.pivot.kilos
                }
              })
            }
          })
          this.filteredTotalKilosRollProduced = 0
          let rollOrderProductions = cloneDeep(this.rollOrderProductions)
          rollOrderProductions.forEach(rollOrderProduction => {
            let startDateTimeMoment = moment(rollOrderProduction.start_date_time, dateFormat)
            if (startDateTimeMoment.isSame(startDateMoment) || startDateTimeMoment.isSame(endDateMoment) || startDateTimeMoment.isBetween(startDateMoment, endDateMoment)) {
              rollOrderProduction.products.forEach(product => {
                this.filteredTotalKilosRollProduced = this.filteredTotalKilosRollProduced + product.pivot.kilos
              })
            }
          })
          this.filteredTotalKilosSold = 0
          this.filteredTotalMoneyGained = 0
          this.filteredSales = []
          this.materials = this.materials.map(material => {
            return {...material, filteredTotalWithTax: 0, filteredTotalWithoutTax: 0, filteredTax: 0, filteredKilos: 0}
          })
          let sales = cloneDeep(this.sales)
          sales.forEach(sale => {
            let startDateTimeMoment = moment(sale.date, dateFormat)
            if (startDateTimeMoment.isSame(startDateMoment) || startDateTimeMoment.isSame(endDateMoment) || startDateTimeMoment.isBetween(startDateMoment, endDateMoment)) {
              this.filteredSales.push(sale)
              this.filteredTotalMoneyGained = this.filteredTotalMoneyGained + sale.total_cost
              sale.products.forEach(product => {
                let materialFound = this.materials.find(material => {
                  return material.id === product.material_id
                })
                materialFound.filteredKilos = materialFound.filteredKilos + product.pivot.kilos
                if (sale.order_sale_receipt_type_id === 1) {
                  materialFound.filteredTotalWithoutTax = materialFound.filteredTotalWithoutTax + (product.pivot.kilos * product.pivot.kilo_price)
                }
                if (sale.order_sale_receipt_type_id === 2) {
                  materialFound.filteredTotalWithTax = materialFound.filteredTotalWithTax + (product.pivot.kilos * product.pivot.kilo_price * 1.16)
                  materialFound.filteredTax = materialFound.filteredTax + (product.pivot.kilos * product.pivot.kilo_price * 0.16)
                }
                this.filteredTotalKilosSold = this.filteredTotalKilosSold + product.pivot.kilos
              })
            }
          })
        },
        getExpenses: async function () {
          this.isLoading = true
          await this.createWeeks()
          await this.getDependentEntities()
          await this.getAllExpensesSerial()
          await this.getBagOrderProductions()
          await this.getRollOrderProductions()
          await this.getSales()
          await this.filterExpenses()
          await this.filterEntitiesByWeek()
          this.isLoading = false
        },
        getDependentEntities: async function () {
          Promise.all([
            GenericApiOperations.list(EntityTypes.EXPENSE_CATEGORY.apiName),
            GenericApiOperations.list(EntityTypes.EXPENSE_SUBCATEGORY.apiName),
            GenericApiOperations.list(EntityTypes.MATERIAL.apiName)
          ])
            .then(result => {
              this.expenseCategories = result[0]
              this.expenseSubcategories = result[1]
              this.materials = result[2]
            })
        },
        createWeeks: function () {
          this.weeks = []
          const currentWeek = moment(startWeekDate, dateFormat)
          const todayInSevensWeeks = moment().add(7, 'days')
          while (currentWeek.isBefore(todayInSevensWeeks)) {
            let endOfWeek = currentWeek.clone().add(6, 'days')
            this.weeks.push({label: (currentWeek.format(dateFormat) + ' - ' + endOfWeek.format(dateFormat)),
              sales: 0,
              sales_kilos: 0,
              sales_gains: 0,
              bag_production_kilos: 0,
              bag_production_groups: 0,
              roll_production_kilos: 0,
              expenses: 0,
              expenses_lost: 0
            })
            currentWeek.add(7, 'days')
          }
        },
        getAllExpensesSerial: async function () {
          let currentPage = 1
          let perPage = 900
          let nextPageUrl = GenericApiUrls.createListUrl(EntityTypes.EXPENSE.apiName, {paginate: true,
            page: currentPage,
            perPage: perPage,
            filterStartDateTime: {date_paid: '2019-09-01'},
            filterExacts: {expense_status_id: 2}
          })
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
                nextPageUrl = GenericApiUrls.createListUrl(EntityTypes.EXPENSE.apiName, {paginate: true,
                  page: currentPage,
                  perPage: perPage,
                  filterStartDateTime: {date_paid: '2019-09-01'},
                  filterExacts: {expense_status_id: 2}
                })
              }
            })
          }
          this.allExpenses = totalData
        },
        getBagOrderProductions: async function () {
          let currentPage = 1
          let perPage = 900
          let nextPageUrl = GenericApiUrls.createListUrl(EntityTypes.ORDER_PRODUCTION.apiName, {paginate: true,
            page: currentPage,
            perPage: perPage,
            filterStartDateTime: {start_date_time: '2019-09-01'},
            filterExacts: {order_production_type_id: 1}
          })
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
                nextPageUrl = GenericApiUrls.createListUrl(EntityTypes.ORDER_PRODUCTION.apiName, {paginate: true,
                  page: currentPage,
                  perPage: perPage,
                  filterStartDateTime: {start_date_time: '2019-09-01'},
                  filterExacts: {order_production_type_id: 1}
                })
              }
            })
          }
          this.bagOrderProductions = totalData
        },
        getRollOrderProductions: async function () {
          let currentPage = 1
          let perPage = 900
          let nextPageUrl = GenericApiUrls.createListUrl(EntityTypes.ORDER_PRODUCTION.apiName, {paginate: true,
            page: currentPage,
            perPage: perPage,
            filterStartDateTime: {start_date_time: '2019-09-01'},
            filterExacts: {order_production_type_id: 2}
          })
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
                nextPageUrl = GenericApiUrls.createListUrl(EntityTypes.ORDER_PRODUCTION.apiName, {paginate: true,
                  page: currentPage,
                  perPage: perPage,
                  filterStartDateTime: {start_date_time: '2019-09-01'},
                  filterExacts: {order_production_type_id: 2}
                })
              }
            })
          }
          this.rollOrderProductions = totalData
        },
        getSales: async function () {
          let currentPage = 1
          let perPage = 900
          let nextPageUrl = GenericApiUrls.createListUrl(EntityTypes.ORDER_SALE.apiName, {paginate: true,
            page: currentPage,
            perPage: perPage,
            filterStartDateTime: {date: '2019-09-01'}
          })
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
                nextPageUrl = GenericApiUrls.createListUrl(EntityTypes.ORDER_SALE.apiName, {paginate: true,
                  page: currentPage,
                  perPage: perPage,
                  filterStartDateTime: {date: '2019-09-01'}
                })
              }
            })
          }
          this.sales = totalData
        },
        filterEntitiesByWeek: async function () {
          this.sales.forEach(sale => {
            let saleDateMoment = moment(sale.date, dateFormat)
            let startWeekDateMoment = moment(startWeekDate, dateFormat)
            if (saleDateMoment.isAfter(startWeekDateMoment)) {
              let daysSince = saleDateMoment.diff(startWeekDateMoment, 'days')
              let weekArrayIndex = Math.floor((daysSince / 7))
              this.weeks[weekArrayIndex].sales = this.weeks[weekArrayIndex].sales + 1
              sale.products.forEach(product => {
                this.weeks[weekArrayIndex].sales_gains = this.weeks[weekArrayIndex].sales_gains + (product.pivot.kilos * product.pivot.kilo_price)
                this.weeks[weekArrayIndex].sales_kilos = this.weeks[weekArrayIndex].sales_kilos + product.pivot.kilos
              })
            }
          })
          this.bagOrderProductions.forEach(bagOrderProduction => {
            let saleDateMoment = moment(bagOrderProduction.start_date_time, dateFormat)
            let startWeekDateMoment = moment(startWeekDate, dateFormat)
            if (saleDateMoment.isAfter(startWeekDateMoment)) {
              let daysSince = saleDateMoment.diff(startWeekDateMoment, 'days')
              let weekArrayIndex = Math.floor((daysSince / 7))
              bagOrderProduction.products.forEach(product => {
                if (product.product_type_id === 1) {
                  this.weeks[weekArrayIndex].bag_production_kilos = this.weeks[weekArrayIndex].bag_production_kilos + product.pivot.kilos
                  this.weeks[weekArrayIndex].bag_production_groups = this.weeks[weekArrayIndex].bag_production_groups + product.pivot.groups
                }
              })
            }
          })
          this.rollOrderProductions.forEach(rollOrderProduction => {
            let saleDateMoment = moment(rollOrderProduction.start_date_time, dateFormat)
            let startWeekDateMoment = moment(startWeekDate, dateFormat)
            if (saleDateMoment.isAfter(startWeekDateMoment)) {
              let daysSince = saleDateMoment.diff(startWeekDateMoment, 'days')
              let weekArrayIndex = Math.floor((daysSince / 7))
              rollOrderProduction.products.forEach(product => {
                if (product.product_type_id === 2) {
                  this.weeks[weekArrayIndex].roll_production_kilos = this.weeks[weekArrayIndex].roll_production_kilos + product.pivot.kilos
                }
              })
            }
          })
          this.allExpenses.forEach(expense => {
            let saleDateMoment = moment(expense.date_paid, dateFormat)
            let startWeekDateMoment = moment(startWeekDate, dateFormat)
            if (saleDateMoment.isAfter(startWeekDateMoment)) {
              let daysSince = saleDateMoment.diff(startWeekDateMoment, 'days')
              let weekArrayIndex = Math.floor((daysSince / 7))
              expense.expense_items.forEach(expenseItem => {
                console.log(this.weeks.length)
                if (expenseItem.expense_subcategory_id !== 12) {
                  if (this.weeks[weekArrayIndex] === undefined) {
                    console.log('Array index error, an expense may be out of date range created for the weeks array')
                  }
                  this.weeks[weekArrayIndex].expenses_lost = this.weeks[weekArrayIndex].expenses_lost + expenseItem.subtotal
                }
              })
            }
          })
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
