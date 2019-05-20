<template>
    <div>
        <mau-spinner
            v-if="isLoading"
            :sizeType="'dataTable'"
        >
        </mau-spinner>
        <mau-form-input-select-static
                v-show="!isLoading"
                :name="'mauSelectStaticReportType'"
                :multiselect="false"
                v-model="reportTypeSelected"
                :availableObjects="reportTypes"
                @input="function x(value) { setDataDependingOnProductionType() }"
                :error="''"
                :initialObject="reportTypes[0]"
                :hasClear="false"
                :displayProperty="'text'"
                :trackBy="'value'"
        >
        </mau-form-input-select-static>
        <mau-form-input-select-static
                v-show="!isLoading"
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
        <mau-form-input-select-static
            v-if="categorySelected.value && categorySelected.value.length"
            :key="categorySelected.value.length"
            v-show="!isLoading"
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
        <mau-form-input-select-static
            v-show="!isLoading"
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
        <table
            :key="yearSelected.value"
            v-if="!isLoading"
            class="table table-hover"
        >
            <tr class="row-fluid">
                <td v-for="(categoryItem, index) in categoryItemsSelected">
                    {{categoryItem.name}}
                </td>
                <td>
                    Total
                </td>
            </tr>
            <tr v-for="(genericMonth, monthIndex) in genericYears[yearSelected.value]">
                <td v-for="(categoryItem, index) in categoryItemsSelected">
                    {{calculateMonthTotalProduction(categoryItem.productionItems[yearSelected.value][monthIndex])}}
                </td>
                <td>
                    {{getMachinesMonthTotalProduction(monthIndex)}}
                </td>
            </tr>
        </table>
        <mau-form-input-select-static
            v-show="!isLoading"
            :name="'mauSelectStaticMonth'"
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
        <table
            v-if="!isLoading"
            class="table table-hover"
        >
            <tr class="row-fluid">
                <td v-for="(categoryItem, index) in categoryItemsSelected">
                    {{categoryItem.name}}
                </td>
                <td>
                    Total
                </td>
            </tr>
            <tr v-for="(genericDay, dayIndex) in genericYears[yearSelected.value][monthSelected.value]">
                <td v-for="(categoryItem, index) in categoryItemsSelected">
                    {{calculateDayTotalProduction(categoryItem.productionItems[yearSelected.value][monthSelected.value][dayIndex])}}
                </td>
                <td>
                    {{getMachinesDayTotalProduction(dayIndex)}}
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
          machineItems: [],
          materialItems: [],
          categorySelected: {},
          categoryItemsSelected: [],
          reportTypeSelected: {},
          reportTypes: [{ value: 'roll', text: 'Extrusion' }, { value: 'bag', text: 'Bolseo' }],
          yearSelected: {},
          monthSelected: {},
          monthObjects: [
            { value: 0, text: '01' },
            { value: 1, text: '02' },
            { value: 2, text: '03' },
            { value: 3, text: '04' },
            { value: 4, text: '05' },
            { value: 5, text: '06' },
            { value: 6, text: '07' },
            { value: 7, text: '08' },
            { value: 8, text: '09' },
            { value: 9, text: '10' },
            { value: 10, text: '11' },
            { value: 11, text: '12' }
          ],
          yearObjects: [
            { value: 0, text: '2018' },
            { value: 1, text: '2019' }
          ]
        }
      },
      props: {
      },
      computed: {
        isBagReportType: function () {
          return this.reportTypeSelected.value === 'bag'
        },
        isRollReportType: function () {
          return this.reportTypeSelected.value === 'roll'
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
          this.productionRegistries = result[2]
          this.setDataDependingOnProductionType()
        }).finally(() => {
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
          this.machineItems = machineItems
          this.materialItems = materialItems
        },
        calculateMonthTotalProduction: function (monthProductionItems) {
          let totalSum = 0
          for (let dayIndex = 0; dayIndex < monthProductionItems.length; dayIndex++) {
            let dayProductionItems = monthProductionItems[dayIndex]
            for (let hourIndex = 0; hourIndex < dayProductionItems.length; hourIndex++) {
              totalSum += Number(dayProductionItems[hourIndex])
            }
          }
          return totalSum.toFixed(2)
        },
        calculateDayTotalProduction: function (dayProductionItems) {
          let totalSum = 0
          for (let hourIndex = 0; hourIndex < dayProductionItems.length; hourIndex++) {
            totalSum += Number(dayProductionItems[hourIndex])
          }
          return totalSum.toFixed(2)
        },
        getMachinesMonthTotalProduction: function (monthIndex) {
          let totalSum = 0
          for (let i = 0; i < this.categoryItemsSelected.length; i++) {
            let categoryItemSelected = this.categoryItemsSelected[i]
            let monthProductionItems = categoryItemSelected.productionItems[this.yearSelected.value][monthIndex]
            totalSum += Number(this.calculateMonthTotalProduction(monthProductionItems))
          }
          return totalSum.toFixed(2)
        },
        getMachinesDayTotalProduction: function (dayIndex) {
          let totalSum = 0
          for (let i = 0; i < this.categoryItemsSelected.length; i++) {
            let categoryItemSelected = this.categoryItemsSelected[i]
            let dayProductionItems = categoryItemSelected.productionItems[this.yearSelected.value][this.monthSelected.value][dayIndex]
            totalSum += Number(this.calculateDayTotalProduction(dayProductionItems))
          }
          return totalSum.toFixed(2)
        }
      }
    }
</script>
