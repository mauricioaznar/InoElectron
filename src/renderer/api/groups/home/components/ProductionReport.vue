<template>
    <div>
        Production Report
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
      created () {
        this.setGenericDateArrays()
        let machineTypeId
        if (this.reportType === 'bag') {
          machineTypeId = 1
        }
        if (this.reportType === 'roll') {
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
            let machineItem = machineItems.find(machineItemObj => { return machineItemObj.id === productionRegistry.machine_id})
            if (machineItem === undefined) {
              continue
            }
            let startDateTime = moment(productionRegistry.start_date_time, 'YYYY-MM-DD HH:mm:ss')
            let endDateTime = moment(productionRegistry.end_date_time, 'YYYY-MM-DD HH:mm:ss')
            let hours = endDateTime.diff(startDateTime, 'hours')
            let kilosPerHour = (productionRegistry.kilos / hours).toFixed(2)
            let iterableDateTime = moment(productionRegistry.start_date_time, 'YYYY-MM-DD HH:mm:ss')
            while (iterableDateTime.isBetween(startDateTime, endDateTime, 'hours', '[)')) {
              let yearIndex = Number(iterableDateTime.year() - 2018)
              let monthIndex = Number(iterableDateTime.month())
              let dayIndex = Number(iterableDateTime.date() - 1)
              let hoursIndex = Number(iterableDateTime.hours())
              console.log(yearIndex)
              console.log(monthIndex)
              console.log(dayIndex)
              console.log(hoursIndex)
              if (machineItem.productionItems === undefined) {
                console.log(machineItem)
              }
              machineItem.productionItems[yearIndex][monthIndex][dayIndex][hoursIndex] = kilosPerHour
              iterableDateTime.add(1, 'hours')
            }
          }
          this.machineItems = machineItems
          this.materialItems = materialItems
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
                days[day - 1] = Array(24)
              }
              months.push(days)
            }
            genericYears.push(months)
          }
          this.genericYears = genericYears
        }
      }
    }
</script>
