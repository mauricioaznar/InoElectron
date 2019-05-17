<template>
    <div>
        <mau-spinner
            v-if="isLoading"
            :size-type="'dataTable'"
        >
        </mau-spinner>
        <div
            v-if="!isLoading"
            class="table table-hover"
            v-for="(genericYear, yearIndex) in genericYears"
        >
            <div class="row-fluid">
                <span v-for="(machineItem, index) in machineItems">
                    {{machineItem.name}}
                </span>
            </div>
            <div v-for="(genericMonth, monthIndex) in genericYears[yearIndex]">
                <span v-for="(machineItem, index) in machineItems">
                    {{calculateMonthTotalProduction(machineItem.productionItems[yearIndex][monthIndex])}}
                </span>
                <!--<tr class="table table-dark" v-for="(genericDays, dayIndex) in genericYears[0][monthIndex]">-->
                    <!--<td v-for="(machineItem, index) in machineItems">-->
                        <!--{{calculateDayTotalProduction(machineItem.productionItems[0][monthIndex][dayIndex])}}-->
                    <!--</td>-->
                <!--</tr>-->
            </div>
        </div>
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
          machineItems: [],
          materialItems: []
        }
      },
      props: {
        reportType: {
          type: String,
          required: true,
          validator: function (value) {
            return ['roll', 'bag'].indexOf(value) !== -1
          }
        }
      },
      computed: {
        isBagReportType: function () {
          return this.reportType === 'bag'
        },
        isRollReportType: function () {
          return this.reportType === 'roll'
        }
      },
      created () {
        this.setGenericDateArrays()
        let machineTypeId
        if (this.isBagReportType) {
          machineTypeId = 1
        }
        if (this.isRollReportType) {
          machineTypeId = 2
        }
        Promise.all([
          GenericApiOperations.list(EntityTypes.MATERIAL.apiName, { paginate: false }),
          GenericApiOperations.list(EntityTypes.MACHINE.apiName, { paginate: false, filterExacts: {machine_type_id: machineTypeId} }),
          SpecificApiOperations.getStats('productionReport')
        ]).then(result => {
          let materials = result[0]
          let machines = result[1]
          let productionRegistries = result[2]
          let materialItems = []
          let machineItems = []
          for (let i = 0; i < materials.length; i++) {
            let material = materials[i]
            materialItems.push({
              id: material.id,
              name: material.name,
              productionItems: cloneDeep(this.genericYears)
            })
          }
          for (let i = 0; i < machines.length; i++) {
            let machine = machines[i]
            machineItems.push({
              id: machine.id,
              name: machine.name,
              productionItems: cloneDeep(this.genericYears)
            })
          }
          for (let i = 0; i < productionRegistries.length; i++) {
            let productionRegistry = productionRegistries[i]
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
        }
      }
    }
</script>
