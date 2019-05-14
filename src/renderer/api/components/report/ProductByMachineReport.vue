<template>
    <div>
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <h4 v-if="!isLoading && bagMode">Bolsas por maquina</h4>
        <h4 v-if="!isLoading && rollMode">Rollos por maquina</h4>
        <b-table v-if="!isLoading" :items="machineItems" :fields="yearMachineTableFields">
            <template slot="show_details" slot-scope="row">
                <span v-if="row.detailsShowing" :class="'fa fa-toggle-on'" @click.stop="row.toggleDetails"></span>
                <span v-else :class="'fa fa-toggle-off'" @click.stop="row.toggleDetails"></span>
            </template>
            <template slot="row-details" slot-scope="row">
                <b-table :items="row.item.monthItems" :fields="monthMachineTableFields">
                    <template slot="show_details" slot-scope="row">
                        <span v-if="row.detailsShowing" :class="'fa fa-toggle-on'" @click.stop="row.toggleDetails"></span>
                        <span v-else :class="'fa fa-toggle-off'" @click.stop="row.toggleDetails"></span>
                    </template>
                    <template slot="row-details" slot-scope="row">
                        <b-table :items="row.item.dayItems" :fields="dayMachineTableFields">
                        </b-table>
                    </template>
                </b-table>
            </template>
        </b-table>
        <h4 v-if="!isLoading && bagMode">Bolsas por material</h4>
        <h4 v-if="!isLoading && rollMode">Rollos por material</h4>
        <b-table v-if="!isLoading" :items="materialItems" :fields="yearMaterialTableFields">
            <template slot="show_details" slot-scope="row">
                <span v-if="row.detailsShowing" :class="'fa fa-toggle-on'" @click.stop="row.toggleDetails"></span>
                <span v-else :class="'fa fa-toggle-off'" @click.stop="row.toggleDetails"></span>
            </template>
            <template slot="row-details" slot-scope="row">
                <b-table :items="row.item.monthItems" :fields="monthMaterialTableFields">
                    <template slot="show_details" slot-scope="row">
                        <span v-if="row.detailsShowing" :class="'fa fa-toggle-on'" @click.stop="row.toggleDetails"></span>
                        <span v-else :class="'fa fa-toggle-off'" @click.stop="row.toggleDetails"></span>
                    </template>
                    <template slot="row-details" slot-scope="row">
                        <b-table :items="row.item.dayItems" :fields="dayMaterialTableFields">
                        </b-table>
                    </template>
                </b-table>
            </template>
        </b-table>
    </div>
</template>

<script>
    import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    import SpecificApiOperations from 'renderer/api/functions/SpecificApiOperations'
    import moment from 'moment'
    import cloneDeep from 'renderer/services/common/cloneDeep.js'
    import EntityTypes from 'renderer/api/EntityTypes'
    moment.locale('es')
    export default {
      name: 'ProductByMachineReport',
      data () {
        return {
          isLoading: true,
          timeout: '',
          interval: '',
          bootstrapItems: [],
          yearMachineTableFields: [],
          monthMachineTableFields: [],
          dayMachineTableFields: [],
          machineItems: [],
          yearMaterialTableFields: [],
          monthMaterialTableFields: [],
          dayMaterialTableFields: [],
          materialItems: []
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
        this.setInitialBootstrapData()
      },
      methods: {
        setInitialBootstrapData: function () {
          this.isLoading = true
          if (!this.bagMode && !this.rollMode) {
            return
          }
          let statsRoute = ''
          let wasteRoute = ''
          let machineTypeId = 0
          if (this.bagMode) {
            statsRoute = 'bagProductionByIntervalsReport'
            wasteRoute = 'bagProductionWasteByIntervalsReport'
            machineTypeId = 1
          }
          if (this.rollMode) {
            statsRoute = 'rollProductionByIntervalsReport'
            wasteRoute = 'rollProductionWasteByIntervalsReport'
            machineTypeId = 2
          }
          Promise.all([
            GenericApiOperations.list(EntityTypes.MACHINE.apiName, {filterExacts: {machine_type_id: machineTypeId}}),
            GenericApiOperations.list(EntityTypes.MATERIAL.apiName, {paginate: false}),
            SpecificApiOperations.getStats(statsRoute),
            SpecificApiOperations.getStats(wasteRoute)
          ]).then(result => {
            let machines = result[0]
            let materials = result[1]
            let productionData = result[2]
            let wasteData = result[3]
            console.log(wasteData)
            this.bootstrapItems = []
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
                  dayItems.push(dayItem)
                }
                monthItem['dayItems'] = dayItems
                monthItems.push(monthItem)
              }
              yearItem['monthItems'] = monthItems
              this.bootstrapItems.push(yearItem)
            }
            this.setMachinesData(productionData, wasteData, machines)
            this.setMaterialsData(productionData, wasteData, materials)
            let vm = this
            this.timeout = setTimeout(function () {
              vm.isLoading = false
            }, 2000)
          })
        },
        setMachinesData: function (machinesData, wasteData, machines) {
          this.yearMachineTableFields = [{key: 'year', label: ''}, {key: 'show_details', label: ''}]
          this.monthMachineTableFields = [{key: 'month', label: 'mes'}]
            .concat(machines.map(machineObj => { return {key: 'machine' + machineObj.id, label: machineObj.name} }))
            .concat({key: 'total', label: 'total'})
            .concat({key: 'waste', label: 'Desperdicio'})
            .concat({key: 'show_details', label: ''})
          this.dayMachineTableFields = [{key: 'day', label: 'dia'}, {key: 'weekday', label: 'dia de la semana'}]
            .concat(machines.map(machineObj => { return {key: 'machine' + machineObj.id, label: machineObj.name} }))
            .concat({key: 'total', label: 'total'})
            .concat({key: 'waste', label: 'Desperdicio'})
          this.machineItems = cloneDeep(this.bootstrapItems)
          this.machineItems.forEach(yearMachineItem => {
            yearMachineItem['monthItems'].forEach(monthMachineItem => {
              monthMachineItem = Object.assign(monthMachineItem, getTableRowDefaultMachineData(machines), {total: 0}, {waste: 0})
              monthMachineItem['dayItems'].forEach(dayMachineItem => {
                dayMachineItem = Object.assign(dayMachineItem, getTableRowDefaultMachineData(machines), {total: 0}, {waste: 0})
              })
            })
          })
          machinesData.forEach(machineDataObj => {
            let machineDataMomentDate = moment(machineDataObj.date_time, 'YYYY-MM-DD HH:mm:ss')
            let machineDataEfficiency = machineDataObj.efficiency
            let machineId = machineDataObj.machine_id
            let machineDataYear = machineDataMomentDate.year()
            let machineDataMonth = machineDataMomentDate.month() + 1 // zero indexed
            let machineDataDay = machineDataMomentDate.date()
            if (machineDataYear >= 2018 && machineDataYear <= 2019) {
              let monthItem = this.machineItems[machineDataYear - 2018].monthItems[machineDataMonth - 1]
              monthItem.total = Math.round((machineDataEfficiency + monthItem.total) * 100) / 100
              monthItem['machine' + machineId] = Math.round((machineDataEfficiency + monthItem['machine' + machineId]) * 100) / 100
              let dayItem = monthItem.dayItems[machineDataDay - 1]
              dayItem.total = Math.round((machineDataEfficiency + dayItem.total) * 100) / 100
              dayItem['machine' + machineId] = Math.round((machineDataEfficiency + dayItem['machine' + machineId]) * 100) / 100
            }
          })
          wasteData.forEach(wasteDataObj => {
            let wasteDataMomentDate = moment(wasteDataObj.date_time, 'YYYY-MM-DD HH:mm:ss')
            let wasteDataWaste = wasteDataObj.waste
            let wasteDataYear = wasteDataMomentDate.year()
            let wasteDataMonth = wasteDataMomentDate.month() + 1
            let wasteDataDay = wasteDataMomentDate.date()
            if (wasteDataYear >= 2018 && wasteDataYear <= 2019) {
              let monthItem = this.machineItems[wasteDataYear - 2018].monthItems[wasteDataMonth - 1]
              monthItem.waste = Math.round((wasteDataWaste + monthItem.waste) * 100) / 100
              let dayItem = monthItem.dayItems[wasteDataDay - 1]
              dayItem.waste = Math.round((wasteDataWaste + dayItem.waste) * 100) / 100
            }
          })
          function getTableRowDefaultMachineData (machines) {
            let tableRowDefaultData = {}
            machines.forEach(machineObj => {
              tableRowDefaultData['machine' + machineObj.id] = 0
            })
            return tableRowDefaultData
          }
        },
        setMaterialsData: function (materialsData, wasteData, materials) {
          this.yearMaterialTableFields = [{key: 'year', label: ''}, {key: 'show_details', label: ''}]
          this.monthMaterialTableFields = [{key: 'month', label: 'mes'}]
            .concat(materials.map(materialObj => { return {key: 'material' + materialObj.id, label: materialObj.name} }))
            .concat({key: 'total', label: 'total'})
            .concat({key: 'waste', label: 'Desperdicio'})
            .concat({key: 'show_details', label: ''})
          this.dayMaterialTableFields = [{key: 'day', label: 'dia'}, {key: 'weekday', label: 'dia de la semana'}]
            .concat(materials.map(materialObj => { return {key: 'material' + materialObj.id, label: materialObj.name} }))
            .concat({key: 'total', label: 'total'})
            .concat({key: 'waste', label: 'Desperdicio'})
          this.materialItems = cloneDeep(this.bootstrapItems)
          this.materialItems.forEach(yearMaterialItem => {
            yearMaterialItem['monthItems'].forEach(monthMaterialItem => {
              monthMaterialItem = Object.assign(monthMaterialItem, getTableRowDefaultMaterialData(materials), {total: 0}, {waste: 0})
              monthMaterialItem['dayItems'].forEach(dayMaterialItem => {
                dayMaterialItem = Object.assign(dayMaterialItem, getTableRowDefaultMaterialData(materials), {total: 0}, {waste: 0})
              })
            })
          })
          materialsData.forEach(materialDataObj => {
            let materialDataMomentDate = moment(materialDataObj.date_time, 'YYYY-MM-DD HH:mm:ss')
            let materialDataEfficiency = materialDataObj.efficiency
            let materialId = materialDataObj.material_id
            let materialDataYear = materialDataMomentDate.year()
            let materialDataMonth = materialDataMomentDate.month() + 1 // zero indexed
            let materialDataDay = materialDataMomentDate.date()
            if (materialDataYear >= 2018 && materialDataYear <= 2019) {
              let monthItem = this.materialItems[materialDataYear - 2018].monthItems[materialDataMonth - 1]
              monthItem.total = Math.round((materialDataEfficiency + monthItem.total) * 100) / 100
              monthItem['material' + materialId] = Math.round((materialDataEfficiency + monthItem['material' + materialId]) * 100) / 100
              let dayItem = monthItem.dayItems[materialDataDay - 1]
              dayItem.total = Math.round((materialDataEfficiency + dayItem.total) * 100) / 100
              dayItem['material' + materialId] = Math.round((materialDataEfficiency + dayItem['material' + materialId]) * 100) / 100
            }
          })
          wasteData.forEach(wasteDataObj => {
            let wasteDataMomentDate = moment(wasteDataObj.date_time, 'YYYY-MM-DD HH:mm:ss')
            let wasteDataWaste = wasteDataObj.waste
            let wasteDataYear = wasteDataMomentDate.year()
            let wasteDataMonth = wasteDataMomentDate.month() + 1
            let wasteDataDay = wasteDataMomentDate.date()
            if (wasteDataYear >= 2018 && wasteDataYear <= 2019) {
              let monthItem = this.materialItems[wasteDataYear - 2018].monthItems[wasteDataMonth - 1]
              monthItem.waste = Math.round((wasteDataWaste + monthItem.waste) * 100) / 100
              let dayItem = monthItem.dayItems[wasteDataDay - 1]
              dayItem.waste = Math.round((wasteDataWaste + dayItem.waste) * 100) / 100
            }
          })
          function getTableRowDefaultMaterialData (materials) {
            let tableRowDefaultData = {}
            materials.forEach(materialObj => {
              tableRowDefaultData['material' + materialObj.id] = 0
            })
            return tableRowDefaultData
          }
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
