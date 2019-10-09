<template>
    <div>
        <mau-spinner
                v-if="isLoading"
                :sizeType="'dataTable'"
        >
        </mau-spinner>
        <div>
            two
        </div>
        <div class="form-group">
            <mau-form-input-select-static
                    v-show="!isLoading"
                    :label="'Año'"
                    :name="'mauSelectStaticYear'"
                    :multiselect="false"
                    v-model="yearSelected"
                    :availableObjects="yearObjects"
                    :error="''"
                    :initialObject="yearObjects[1]"
                    :hasClear="false"
                    :displayProperty="'text'"
                    :trackBy="'value'"
            >
            </mau-form-input-select-static>
        </div>
        <table
                :key="yearSelected.value"
                v-if="!isLoading"
                class="table table-hover table-sm"
        >
            <tr class="row-fluid">
                <td>
                    Mes
                </td>
                <td v-for="(categoryElement, index) in expenseCategoryElements">
                    {{categoryElement.name}}
                </td>
                <td>
                    Total
                </td>
            </tr>
            <tr v-for="(genericMonth, monthIndex) in genericYears[yearSelected.value]">
                <td>
                    {{monthObjects[monthIndex].text}}
                </td>
                <td v-for="(categoryElement, index) in expenseCategoryElements">
                    {{calculateMonthTotal(categoryElement.expenseElements[yearSelected.value][monthIndex])}}
                </td>
                <td>
                    {{getElementsMonthTotal(monthIndex)}}
                </td>
            </tr>
        </table>
        <div class="form-group">
            <mau-form-input-select-static
                    v-show="!isLoading"
                    :name="'mauSelectStaticMonth'"
                    :label="'Mes'"
                    :multiselect="false"
                    v-model="monthSelected"
                    :availableObjects="monthObjects"
                    :error="''"
                    :initialObject="monthObjects[0]"
                    :hasClear="false"
                    :displayProperty="'text'"
                    :trackBy="'value'"
            >
            </mau-form-input-select-static>
        </div>
        <table
                v-if="!isLoading"
                class="table table-hover table-sm"
        >
            <tr class="row-fluid">
                <td>
                    #
                </td>
                <td>
                    Dia
                </td>
                <td v-for="(categoryElement, index) in expenseCategoryElements">
                    {{categoryElement.name}}
                </td>
                <td>
                    Total
                </td>
            </tr>
            <tr v-for="(genericDay, dayIndex) in genericYears[yearSelected.value][monthSelected.value]">
                <td>
                    {{dayIndex + 1}}
                </td>
                <td>
                    {{getDayName(dayIndex)}}
                </td>
                <td v-for="(categoryElement, index) in expenseCategoryElements">
                    {{categoryElement.expenseElements[yearSelected.value][monthSelected.value][dayIndex]}}
                </td>
                <td>
                    {{getElementsDayTotal(dayIndex)}}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    import EntityTypes from 'renderer/api/EntityTypes'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import moment from 'moment'
    export default {
      name: 'ExpenseReportTwo',
      data () {
        return {
          isLoading: true,
          suppliers: [],
          expenses: [],
          expenseCategories: [],
          expenseSubcategories: [],
          supplierItems: [],
          expenseCategoryElements: [],
          expenseSubcategoryElements: [],
          genericYears: [],
          yearSelected: {},
          yearObjects: [
            { value: 0, text: '2018' },
            { value: 1, text: '2019' }
          ],
          monthSelected: {},
          monthObjects: [
            { value: 0, text: 'Enero' },
            { value: 1, text: 'Febrero' },
            { value: 2, text: 'Marzo' },
            { value: 3, text: 'Abril' },
            { value: 4, text: 'Mayo' },
            { value: 5, text: 'Junio' },
            { value: 6, text: 'Julio' },
            { value: 7, text: 'Agosto' },
            { value: 8, text: 'Septiembre' },
            { value: 9, text: 'Octubre' },
            { value: 10, text: 'Noviembre' },
            { value: 11, text: 'Diciembre' }
          ]
        }
      },
      created () {
        this.setGenericDateArrays()
        Promise.all([
          GenericApiOperations.list(EntityTypes.SUPPLIER.apiName, {paginate: false}),
          GenericApiOperations.list(EntityTypes.EXPENSE_CATEGORY.apiName, {paginate: false}),
          GenericApiOperations.list(EntityTypes.EXPENSE_SUBCATEGORY.apiName, {paginate: false}),
          GenericApiOperations.list(EntityTypes.EXPENSE.apiName, {paginate: false})
        ])
          .then(result => {
            this.suppliers = result[0]
            this.expenseCategories = result[1]
            this.expenseSubcategories = result[2]
            this.expenses = result[3]
            this.setData()
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      methods: {
        setGenericDateArrays: function () {
          let genericYears = []
          for (let year = 2018; year <= 2019; year++) {
            let months = []
            for (let month = 1; month <= 12; month++) {
              month = month < 10 ? '0' + month : month
              let daysInMonth = moment(year + '-' + month, 'YYYY-MM').daysInMonth()
              let days = Array(daysInMonth)
              for (let day = 1; day <= days.length; day++) {
                days[day - 1] = 0
              }
              months.push(days)
            }
            genericYears.push(months)
          }
          this.genericYears = genericYears
        },
        setData: function () {
          for (let i = 0; i < this.expenseCategories.length; i++) {
            let categoryObj = this.expenseCategories[i]
            this.expenseCategoryElements.push({
              name: categoryObj.name,
              id: categoryObj.id,
              expenseElements: cloneDeep(this.genericYears)
            })
          }
          for (let i = 0; i < this.expenses.length; i++) {
            let expenseObj = this.expenses[i]
            let expenseObjExpenseItems = expenseObj.expense_items
            if (expenseObj.expense_type_id === 1 || expenseObj.expense_type_id === 2) {
              let datePaid = moment(expenseObj.date, 'YYYY-MM-DD')
              let yearIndex = Number(datePaid.year() - 2018)
              let monthIndex = Number(datePaid.month())
              let dayIndex = Number(datePaid.date() - 1)
              for (let j = 0; j < expenseObjExpenseItems.length; j++) {
                let expenseCategoryElement = this.expenseCategoryElements.find(expenseCategoryElementObj => { return expenseCategoryElementObj.id === expenseObj.expense_category_id })
                let subtotal = expenseObj.subtotal
                expenseCategoryElement.expenseElements[yearIndex][monthIndex][dayIndex] =
                  (Number(expenseCategoryElement.expenseElements[yearIndex][monthIndex][dayIndex]) + Number(subtotal)).toFixed(2)
              }
            }
          }
        },

        calculateMonthTotal: function (monthProductionItems) {
          let totalSum = 0
          for (let dayIndex = 0; dayIndex < monthProductionItems.length; dayIndex++) {
            let dayTotal = monthProductionItems[dayIndex]
            totalSum += Number(dayTotal)
          }
          return totalSum.toFixed(2)
        },
        getElementsMonthTotal: function (monthIndex) {
          let totalSum = 0
          for (let i = 0; i < this.expenseCategoryElements.length; i++) {
            let categoryElementSelected = this.expenseCategoryElements[i]
            let monthExpenseElements = categoryElementSelected.expenseElements[this.yearSelected.value][monthIndex]
            totalSum += Number(this.calculateMonthTotal(monthExpenseElements))
          }
          return totalSum.toFixed(2)
        },
        getElementsDayTotal: function (dayIndex) {
          let totalSum = 0
          for (let i = 0; i < this.expenseCategoryElements.length; i++) {
            let categoryElementSelected = this.expenseCategoryElements[i]
            let dayTotal = categoryElementSelected.expenseElements[this.yearSelected.value][this.monthSelected.value][dayIndex]
            totalSum += Number(dayTotal)
          }
          return totalSum.toFixed(2)
        },
        getDayName: function (dayIndex) {
          return moment((this.yearSelected.value + 2018) + '-' + (this.monthSelected.value + 1) + '-' + (dayIndex + 1), 'YYYY-M-D').format('ddd')
        }
      }
    }
</script>
