<template>
    <div class="container">
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <b-table v-if="!isLoading" :items="items" :fields="monthTableFields">
            <template slot="show_details" slot-scope="row">
                <span v-if="row.detailsShowing" :class="'fa fa-toggle-on'" @click.stop="row.toggleDetails"></span>
                <span v-else :class="'fa fa-toggle-off'" @click.stop="row.toggleDetails"></span>
            </template>
            <template slot="row-details" slot-scope="row">
                <b-table :items="row.item.machineMonthData" :fields="dayTableFields">
                </b-table>
            </template>
        </b-table>
    </div>
</template>

<script>
    import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
    import ApiOperations from 'renderer/api/functions/ApiOperations'
    import moment from 'moment'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    moment.locale('es')
    export default {
      name: 'ProductionReport',
      data () {
        return {
          isLoading: true,
          timeout: '',
          interval: '',
          productionByMachine: '',
          defaultDates: [],
          monthTableFields: [],
          dayTableFields: [],
          items: []
        }
      },
      props: {
        rollMode: {
          type: Boolean,
          default: function () {
            return false
          }
        },
        bagMode: {
          type: Boolean,
          default: function () {
            return false
          }
        }
      },
      created () {
        if (this.rollMode || this.bagMode) {
          this.defaultDates = []
          for (let i = 1; i <= 12; i++) {
            let month = i < 10 ? '0' + i : i
            let daysInMonth = moment('2018-' + month, 'YYYY-MM').daysInMonth()
            let daysInMonthArray = []
            for (let j = 0; j < daysInMonth; j++) {
              let hoursInDayArray = []
              for (let k = 0; k < 48; k++) {
                hoursInDayArray.push(0)
              }
              daysInMonthArray.push(hoursInDayArray)
            }
            this.defaultDates.push(daysInMonthArray)
          }
          this.setProduction()
          let vm = this
          this.interval = setInterval(function () {
            vm.setProduction()
          }, 30000)
        }
      },
      methods: {
        setProduction: function () {
          this.isLoading = true
          let urlString = ''
          if (this.rollMode) {
            urlString = 'rollReport'
          }
          if (this.bagMode) {
            urlString = 'bagReport'
          }
          ApiOperations.getStats(urlString).then(result => {
            this.productionByMachine = []
            let machines = []
            result.forEach(productionIntervalByMachineId => {
              let foundMachineId = machines.find(machineObj => {
                return machineObj.id === productionIntervalByMachineId.machine_id
              })
              if (!foundMachineId) {
                machines.push({
                  id: productionIntervalByMachineId.machine_id,
                  name: productionIntervalByMachineId.machine_name
                })
              }
            })
            let machinesData = []
            machines.forEach(machineObj => {
              machinesData.push({
                machineId: machineObj.id,
                machineName: machineObj.name,
                data: cloneDeep(this.defaultDates)
              })
            })
            result.forEach(productionIntervalByMachineId => {
              let machineDataFound = machinesData.find(machinesDataObj => {
                return machinesDataObj.machineId === productionIntervalByMachineId.machine_id
              })
              if (machineDataFound) {
                let dateTime = moment(productionIntervalByMachineId.date_time)
                let i = dateTime.month()
                let j = dateTime.date() - 1
                let m = dateTime.hour()
                let n = dateTime.minutes()
                let k = (m * 2) + (n === 30 ? 1 : 0)
                machineDataFound.data[i][j][k] = productionIntervalByMachineId.efficiency
              }
            })
            this.productionByMachine = machinesData
            let vm = this
            this.timeout = setTimeout(function () {
              vm.isLoading = false
            }, 2000)
          })
        },
        beforeDestroy: function () {
          clearTimeout(this.timeout)
          clearInterval(this.interval)
        }
      },
      components: {
        MauSpinner
      },
      watch: {
        productionByMachine: function (productionByMachine) {
          let monthTableFields = productionByMachine.map(productionByMachineObj => { return { key: 'machine' + productionByMachineObj.machineId, label: productionByMachineObj.machineName } })
          monthTableFields.unshift({key: 'month', label: 'Mes'})
          monthTableFields.push({key: 'show_details', label: ''})
          let dayTableFields = productionByMachine.map(productionByMachineObj => { return { key: 'machine' + productionByMachineObj.machineId, label: productionByMachineObj.machineName } })
          dayTableFields.unshift({key: 'day', label: 'Dia'})
          let items = []
          for (let i = 1; i <= 12; i++) {
            let month = i < 10 ? '0' + i : i
            let daysInMonth = moment('2018-' + month, 'YYYY-MM').daysInMonth()
            let item = {}
            productionByMachine.forEach((productionByMachineObj, index) => {
              item['machine' + productionByMachineObj.machineId] = 0
              item['machineMonthData'] = []
              item['month'] = moment(i, 'M').format('MMMM')
            })
            for (let j = 0; j < daysInMonth; j++) {
              let subItem = {}
              productionByMachine.forEach((productionByMachineObj, index) => {
                subItem['day'] = j + 1
                subItem['machine' + productionByMachineObj.machineId] = 0
              })
              for (let k = 0; k < 48; k++) {
                productionByMachine.forEach((productionByMachineObj, index) => {
                  let efficiency = (productionByMachineObj.data[i - 1][j][k] ? productionByMachineObj.data[i - 1][j][k] : 0)
                  item['machine' + productionByMachineObj.machineId] += efficiency
                  subItem['machine' + productionByMachineObj.machineId] += efficiency
                })
              }
              item['machineMonthData'].push(subItem)
            }
            items.push(item)
          }
          this.items = items
          this.monthTableFields = monthTableFields
          this.dayTableFields = dayTableFields
        }
      }
    }
</script>