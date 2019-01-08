<template>
    <div>
        Product Report v2
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <b-table v-if="!isLoading" :items="yearItems" :fields="yearTableFields">
            <template slot="show_details" slot-scope="row">
                <span v-if="row.detailsShowing" :class="'fa fa-toggle-on'" @click.stop="row.toggleDetails"></span>
                <span v-else :class="'fa fa-toggle-off'" @click.stop="row.toggleDetails"></span>
            </template>
            <template slot="row-details" slot-scope="row">
                <b-table :items="row.item.monthItems" :fields="monthTableFields">
                    <template slot="show_details" slot-scope="row">
                        <span v-if="row.detailsShowing" :class="'fa fa-toggle-on'" @click.stop="row.toggleDetails"></span>
                        <span v-else :class="'fa fa-toggle-off'" @click.stop="row.toggleDetails"></span>
                    </template>
                    <template slot="row-details" slot-scope="row">
                        <b-table :items="row.item.dayItems" :fields="dayTableFields">
                        </b-table>
                    </template>
                </b-table>
            </template>
        </b-table>
    </div>
</template>

<script>
    import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
    import ApiOperations from 'renderer/api/functions/ApiOperations'
    import moment from 'moment'
    import EntityTypes from 'renderer/api/EntityTypes'
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
          yearTableFields: [],
          monthTableFields: [],
          dayTableFields: [],
          yearItems: []
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
        this.setInitialMachineData()
        // let vm = this
        // this.interval = setInterval(function () {
        // vm.setInitialMachineData()
        // }, 30000)
      },
      methods: {
        setInitialMachineData: function () {
          this.isLoading = true
          Promise.all([
            ApiOperations.getWithFilterExactWithoutPagination(EntityTypes.MACHINE, {machine_type_id: 1}),
            ApiOperations.getStats('bagReport')
          ]).then(result => {
            let machines = result[0]
            let machinesData = result[1]
            this.yearTableFields = [{key: 'year', label: 'año'}, {key: 'show_details', label: ''}]
            this.monthTableFields = [{key: 'month', label: 'mes'}]
              .concat(machines.map(machineObj => { return {key: 'machine' + machineObj.id, label: machineObj.name} }))
              .concat({key: 'total', label: 'total'})
              .concat({key: 'show_details', label: ''})
            this.dayTableFields = [{key: 'day', label: 'dia'}, {key: 'weekday', label: 'dia de la semana'}]
              .concat(machines.map(machineObj => { return {key: 'machine' + machineObj.id, label: machineObj.name} }))
              .concat({key: 'total', label: 'total'})
            this.yearItems = []
            for (let year = 2018; year <= 2019; year++) {
              let yearItem = {}
              yearItem['year'] = year
              let monthItems = []
              for (let month = 1; month <= 12; month++) {
                let monthItem = {}
                let daysInMonth = moment(year + '-' + month, 'YYYY-MM').daysInMonth()
                monthItem['month'] = moment(year + '-' + month, 'YYYY-MM').format('MMMM')
                let dayItems = []
                for (let day = 1; day <= daysInMonth; day++) {
                  let dayItem = {}
                  dayItem['weekday'] = moment(year + '-' + month + '-' + day, 'YYYY-MM-DD').format('dd')
                  dayItem['day'] = day
                  dayItems.push(Object.assign(dayItem, this.getTableRowDefaultMachineData(machines), {total: 0}))
                }
                monthItem['dayItems'] = dayItems
                monthItems.push(Object.assign(monthItem, this.getTableRowDefaultMachineData(machines), {total: 0}))
              }
              yearItem['monthItems'] = monthItems
              this.yearItems.push(yearItem)
            }
            this.setMachinesData(machinesData)
            let vm = this
            this.timeout = setTimeout(function () {
              vm.isLoading = false
            }, 2000)
          })
        },
        setMachinesData: function (machinesData) {
          machinesData.forEach(machineDataObj => {
            let machineDataMomentDate = moment(machineDataObj.date_time, 'YYYY-MM-DD HH:mm:ss')
            let machineDataEfficiency = machineDataObj.efficiency
            let machineId = machineDataObj.machine_id
            let machineDataYear = machineDataMomentDate.year()
            let machineDataMonth = machineDataMomentDate.month() + 1 // zero indexed
            let machineDataDay = machineDataMomentDate.date()
            if (machineDataYear >= 2018 && machineDataYear <= 2019) {
              let monthItem = this.yearItems[machineDataYear - 2018].monthItems[machineDataMonth - 1]
              monthItem.total = Math.round((machineDataEfficiency + monthItem.total) * 100) / 100
              monthItem['machine' + machineId] = Math.round((machineDataEfficiency + monthItem['machine' + machineId]) * 100) / 100
              let dayItem = monthItem.dayItems[machineDataDay - 1]
              dayItem.total = Math.round((machineDataEfficiency + dayItem.total) * 100) / 100
              dayItem['machine' + machineId] = Math.round((machineDataEfficiency + dayItem['machine' + machineId]) * 100) / 100
            }
          })
        },
        getTableRowDefaultMachineData: function (machines) {
          let tableRowDefaultData = {}
          machines.forEach(machineObj => {
            tableRowDefaultData['machine' + machineObj.id] = 0
          })
          return tableRowDefaultData
        },
        beforeDestroy: function () {
          clearTimeout(this.timeout)
          // clearInterval(this.interval)
        }
      },
      components: {
        MauSpinner
      },
      watch: {
      }
    }
</script>