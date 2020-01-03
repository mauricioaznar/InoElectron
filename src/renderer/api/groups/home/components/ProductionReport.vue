<template>
    <div>
        <mau-spinner
            v-if="isLoading"
            :sizeType="'dataTable'"
        >
        </mau-spinner>
        <div class="form-group">
            <mau-form-input-select-static
                    v-show="!isLoading"
                    :label="'Categoria'"
                    :name="'mauSelectStaticCategory'"
                    :multiselect="false"
                    v-model="categorySelected"
                    :availableObjects="categories"
                    :error="''"
                    :initialObject="categories[0]"
                    :hasClear="false"
                    :displayProperty="'text'"
                    :trackBy="'value'"
            >
            </mau-form-input-select-static>
        </div>
        <div class="form-group">
            <mau-form-input-select-static
                    v-if="categorySelected.value && categorySelected.value.length"
                    :key="categorySelected.value.length"
                    v-show="!isLoading"
                    :label="'Elementos de la categoria'"
                    :name="'mauSelectStaticCategoryItems'"
                    :multiselect="true"
                    v-model="categoryItemsSelected"
                    :availableObjects="categorySelected.value"
                    :initialObjects="categorySelected.value"
                    :error="''"
                    :hasClear="false"
                    :displayProperty="'name'"
                    :trackBy="'id'"
            >
            </mau-form-input-select-static>
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
                    :initialObject="yearObjects[0]"
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
                <td v-for="(categoryItem, index) in categoryItemsSelected">
                    {{categoryItem.name}}
                </td>
                <td>
                    Desperdicio
                </td>
                <td>
                    Total
                </td>
            </tr>
            <tr v-for="(genericMonth, monthIndex) in genericYears[yearSelected.value]">
                <td>
                    {{monthObjects[monthIndex].text}}
                </td>
                <td v-for="(categoryItem, index) in categoryItemsSelected">
                    {{calculateMonthTotal(categoryItem.productionItems[yearSelected.value][monthIndex])}}
                </td>
                <td>
                    {{calculateMonthTotal(wasteItems[yearSelected.value][monthIndex])}}
                </td>
                <td>
                    {{getItemsMonthTotal(monthIndex)}}
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
                <td v-for="(categoryItem, index) in categoryItemsSelected">
                    {{categoryItem.name}}
                </td>
                <td>
                    Desperdicio
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
                <td v-for="(categoryItem, index) in categoryItemsSelected">
                    {{calculateDayTotal(categoryItem.productionItems[yearSelected.value][monthSelected.value][dayIndex])}}
                </td>
                <td>
                    {{calculateDayTotal(wasteItems[yearSelected.value][monthSelected.value][dayIndex])}}
                </td>
                <td>
                    {{getItemsDayTotal(dayIndex)}}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import SpecificApiOperations from 'renderer/api/functions/SpecificApiOperations'
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    import EntityTypes from 'renderer/api/EntityTypes'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import moment from 'moment'
    export default {
      data () {
        return {
          isLoading: true,
          genericYears: [],
          materials: [],
          machines: [],
          productionRegistries: [],
          wasteRegistries: [],
          machineItems: [],
          materialItems: [],
          wasteItems: [],
          categorySelected: {},
          categoryItemsSelected: [],
          yearSelected: {},
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
          ],
          yearObjects: [
            { value: 0, text: '2018' },
            { value: 1, text: '2019' },
            { value: 2, text: '2020' }
          ]
        }
      },
      props: {
        reportType: {
          type: String,
          required: true,
          validator: function (value) {
            return ['bag', 'roll'].indexOf(value) !== -1
          }
        }
      },
      computed: {
        isBagReportType: function () {
          return this.reportType === 'bag'
        },
        isRollReportType: function () {
          return this.reportType === 'roll'
        },
        categories: function () {
          return [{ value: this.materialItems, text: 'Material' }, { value: this.machineItems, text: 'Maquina' }]
        }
      },
      created () {
        this.setGenericDateArrays()
        Promise.all([
          GenericApiOperations.list(EntityTypes.MATERIAL.apiName, { paginate: false }),
          GenericApiOperations.list(EntityTypes.MACHINE.apiName, { paginate: false }),
          SpecificApiOperations.getStats('productionReport')
        ]).then(result => {
          this.materials = result[0]
          this.machines = result[1]
          this.productionRegistries = result[2][0]
          this.wasteRegistries = result[2][1]
          this.setDataDependingOnProductionType()
        }).finally(() => {
          this.isLoading = false
        })
      },
      methods: {
        setGenericDateArrays: function () {
          let genericYears = []
          for (let year = 2018; year <= 2020; year++) {
            let months = []
            for (let month = 1; month <= 12; month++) {
              month = month < 10 ? '0' + month : month
              let daysInMonth = moment(year + '-' + month, 'YYYY-MM').daysInMonth()
              let days = Array(daysInMonth)
              for (let day = 1; day <= days.length; day++) {
                days[day - 1] = Array(24).fill(0)
              }
              months.push(days)
            }
            genericYears.push(months)
          }
          this.genericYears = genericYears
        },
        setDataDependingOnProductionType: function () {
          let materialItems = []
          let machineItems = []
          let wasteItems = []
          for (let i = 0; i < this.materials.length; i++) {
            let material = this.materials[i]
            materialItems.push({
              id: material.id,
              name: material.name,
              productionItems: cloneDeep(this.genericYears)
            })
          }
          for (let i = 0; i < this.machines.length; i++) {
            let machine = this.machines[i]
            if ((this.isBagReportType && machine.machine_type_id !== 1) || (this.isRollReportType && machine.machine_type_id !== 2)) {
              continue
            }
            machineItems.push({
              id: machine.id,
              name: machine.name,
              productionItems: cloneDeep(this.genericYears)
            })
          }
          for (let i = 0; i < this.productionRegistries.length; i++) {
            let productionRegistry = this.productionRegistries[i]
            if ((this.isBagReportType && productionRegistry.order_production_type_id !== 1) || (this.isBagReportType && productionRegistry.product_type_id !== 1)) {
              continue
            }
            if ((this.isRollReportType && productionRegistry.order_production_type_id !== 2) || (this.isRollReportType && productionRegistry.product_type_id !== 2)) {
              continue
            }
            let startDateTime = moment(productionRegistry.start_date_time, 'YYYY-MM-DD HH:mm:ss')
            let endDateTime = moment(productionRegistry.end_date_time, 'YYYY-MM-DD HH:mm:ss')
            let hours = endDateTime.diff(startDateTime, 'hours')
            let kilosPerHour = (productionRegistry.kilos / hours).toFixed(2)
            let iterableDateTime = moment(productionRegistry.start_date_time, 'YYYY-MM-DD HH:mm:ss')
            let machineItem = machineItems.find(machineItemObj => { return machineItemObj.id === productionRegistry.machine_id })
            let materialItem = materialItems.find(materialItemObj => { return materialItemObj.id === productionRegistry.material_id })
            while (iterableDateTime.isBetween(startDateTime, endDateTime, 'hours', '[)')) {
              let yearIndex = Number(iterableDateTime.year() - 2018)
              let monthIndex = Number(iterableDateTime.month())
              let dayIndex = Number(iterableDateTime.date() - 1)
              let hoursIndex = Number(iterableDateTime.hours())
              machineItem.productionItems[yearIndex][monthIndex][dayIndex][hoursIndex] = (parseFloat(kilosPerHour) + parseFloat(machineItem.productionItems[yearIndex][monthIndex][dayIndex][hoursIndex])).toFixed(2)
              materialItem.productionItems[yearIndex][monthIndex][dayIndex][hoursIndex] = (parseFloat(kilosPerHour) + parseFloat(materialItem.productionItems[yearIndex][monthIndex][dayIndex][hoursIndex])).toFixed(2)
              iterableDateTime.add(1, 'hours')
            }
          }
          wasteItems = cloneDeep(this.genericYears)
          for (let i = 0; i < this.wasteRegistries.length; i++) {
            let wasteRegistry = this.wasteRegistries[i]
            if (this.isBagReportType && wasteRegistry.order_production_type_id !== 1) {
              continue
            }
            if (this.isRollReportType && wasteRegistry.order_production_type_id !== 2) {
              continue
            }
            let startDateTime = moment(wasteRegistry.start_date_time, 'YYYY-MM-DD HH:mm:ss')
            let endDateTime = moment(wasteRegistry.end_date_time, 'YYYY-MM-DD HH:mm:ss')
            let hours = endDateTime.diff(startDateTime, 'hours')
            let wastePerHour = (wasteRegistry.waste / hours).toFixed(2)
            let iterableDateTime = moment(wasteRegistry.start_date_time, 'YYYY-MM-DD HH:mm:ss')
            while (iterableDateTime.isBetween(startDateTime, endDateTime, 'hours', '[)')) {
              let yearIndex = Number(iterableDateTime.year() - 2018)
              let monthIndex = Number(iterableDateTime.month())
              let dayIndex = Number(iterableDateTime.date() - 1)
              let hoursIndex = Number(iterableDateTime.hours())
              wasteItems[yearIndex][monthIndex][dayIndex][hoursIndex] = (parseFloat(wastePerHour) + parseFloat(wasteItems[yearIndex][monthIndex][dayIndex][hoursIndex])).toFixed(2)
              iterableDateTime.add(1, 'hours')
            }
          }
          this.wasteItems = wasteItems
          this.machineItems = machineItems
          this.materialItems = materialItems
        },
        calculateMonthTotal: function (monthProductionItems) {
          let totalSum = 0
          for (let dayIndex = 0; dayIndex < monthProductionItems.length; dayIndex++) {
            let dayProductionItems = monthProductionItems[dayIndex]
            for (let hourIndex = 0; hourIndex < dayProductionItems.length; hourIndex++) {
              totalSum += Number(dayProductionItems[hourIndex])
            }
          }
          return totalSum.toFixed(2)
        },
        calculateDayTotal: function (dayProductionItems) {
          let totalSum = 0
          for (let hourIndex = 0; hourIndex < dayProductionItems.length; hourIndex++) {
            totalSum += Number(dayProductionItems[hourIndex])
          }
          return totalSum.toFixed(2)
        },
        getItemsMonthTotal: function (monthIndex) {
          let totalSum = 0
          for (let i = 0; i < this.categoryItemsSelected.length; i++) {
            let categoryItemSelected = this.categoryItemsSelected[i]
            let monthProductionItems = categoryItemSelected.productionItems[this.yearSelected.value][monthIndex]
            totalSum += Number(this.calculateMonthTotal(monthProductionItems))
          }
          return totalSum.toFixed(2)
        },
        getItemsDayTotal: function (dayIndex) {
          let totalSum = 0
          for (let i = 0; i < this.categoryItemsSelected.length; i++) {
            let categoryItemSelected = this.categoryItemsSelected[i]
            let dayProductionItems = categoryItemSelected.productionItems[this.yearSelected.value][this.monthSelected.value][dayIndex]
            totalSum += Number(this.calculateDayTotal(dayProductionItems))
          }
          return totalSum.toFixed(2)
        },
        getDayName: function (dayIndex) {
          return moment((this.yearSelected.value + 2018) + '-' + (this.monthSelected.value + 1) + '-' + (dayIndex + 1), 'YYYY-M-D').format('ddd')
        }
      }
    }
</script>
