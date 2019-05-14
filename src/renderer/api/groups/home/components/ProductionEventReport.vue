<template>
    <div>
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <b-table v-if="!isLoading" :items="monthItems" :fields="monthTableFields">
            <template slot="show_details" slot-scope="row">
                <span v-if="row.detailsShowing" :class="'fa fa-toggle-on'" @click.stop="row.toggleDetails"></span>
                <span v-else :class="'fa fa-toggle-off'" @click.stop="row.toggleDetails"></span>
            </template>
            <template slot="row-details" slot-scope="row">
                <b-table :items="row.item.dayItems" :fields="dayTableFields">
                </b-table>
            </template>
        </b-table>
    </div>
</template>

<script>
    import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
    import SpecificApiOperations from 'renderer/api/functions/SpecificApiOperations'
    import moment from 'moment'
    moment.locale('es')
    export default {
      name: 'ProductionEventReport',
      data () {
        return {
          isLoading: true,
          timeout: '',
          interval: '',
          groupsData: [],
          monthItems: [],
          monthTableFields: [],
          dayTableFields: []
        }
      },
      props: {
      },
      created () {
        this.setGroupsData()
        // let vm = this
        // this.interval = setInterval(function () {
        // vm.setGroupsData()
        // }, 300000)
      },
      methods: {
        setGroupsData: function () {
          this.isLoading = true
          this.groupsData = []
          let groupsData = []
          SpecificApiOperations.getStats('productionEvent').then(result => {
            for (let i = 0; i < result.length; i++) {
              let itemObj = result[i]
              let groupedDataObjFound = groupsData.find(groupedDataObj => {
                return groupedDataObj.meta.id === itemObj.production_event_type_id
              })
              if (!groupedDataObjFound) {
                groupsData.push({
                  meta: {
                    id: itemObj.production_event_type_id,
                    name: itemObj.name
                  },
                  data: [itemObj]
                })
              } else {
                groupedDataObjFound.data.push(itemObj)
              }
            }
            this.groupsData = groupsData
            let vm = this
            this.timeout = setTimeout(function () {
              vm.isLoading = false
            }, 2000)
          })
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
        groupsData: function (groupsData) {
          let monthNames = moment.months()
          let monthTableFields = [ {key: 'mes', label: 'mes'} ]
          let dayTableFields = [ {key: 'dia', label: 'dia'} ]
          groupsData.forEach(groupedDataObj => {
            monthTableFields.push({key: 'event_id' + groupedDataObj.meta.id, label: groupedDataObj.meta.name})
            dayTableFields.push({key: 'event_id' + groupedDataObj.meta.id, label: groupedDataObj.meta.name})
          })
          monthTableFields.push({key: 'show_details', label: ''})
          let monthItems = []
          for (let i = 0; i < monthNames.length; i++) {
            let daysInMonth = moment().month(i).daysInMonth()
            let monthItem = {}
            let dayItems = []
            for (let dayIndex = 0; dayIndex < daysInMonth; dayIndex++) {
              dayItems.push({dia: dayIndex + 1})
            }
            monthItem['mes'] = monthNames[i]
            groupsData.forEach(groupedDataObj => {
              monthItem['event_id' + groupedDataObj.meta.id] = 0
              let filteredGroupedDataByMonthByEventType = groupedDataObj.data.filter(groupedDataObjData => {
                return moment(groupedDataObjData.date).month() === i
              })
              dayItems = dayItems.map(dayItemObj => {
                dayItemObj['event_id' + groupedDataObj.meta.id] = 0
                return dayItemObj
              })
              filteredGroupedDataByMonthByEventType.forEach(filteredGroupedDataObj => {
                monthItem['event_id' + groupedDataObj.meta.id] += filteredGroupedDataObj.count
                let dayIndex = moment(filteredGroupedDataObj.date).date() - 1
                dayItems[dayIndex]['event_id' + groupedDataObj.meta.id] = filteredGroupedDataObj.count
              })
            })
            monthItem['dayItems'] = dayItems
            monthItems.push(monthItem)
          }
          this.dayTableFields = dayTableFields
          this.monthTableFields = monthTableFields
          this.monthItems = monthItems
        }
      }
    }
</script>
