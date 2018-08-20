<template>
    <div class="container">
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <full-calendar
                v-if="!isLoading"
                class="custom-calendar"
                :events="calendarEvents"
                :monthNames="['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']"
                :weekNames="['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']"
                @eventClick="eventClicked"
        >
        </full-calendar>
    </div>
</template>

<script>
  import FullCalendar from 'vue-fullcalendar'
  import ApiOperations from 'renderer/api/functions/ApiOperations'
  import RouteObjectHelper from 'renderer/api/functions/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import moment from 'moment'
  export default {
    data () {
      return {
        interval: '',
        timeout: '',
        isLoading: true,
        calendarEvents: ''
      }
    },
    created () {
      this.setCalendar()
      let vm = this
      this.interval = setInterval(function () {
        vm.setCalendar()
      }, 30000)
    },
    methods: {
      setCalendar: function () {
        this.isLoading = true
        ApiOperations.getStats('requests').then(result => {
          this.calendarEvents = []
          let calendarItems = []
          result.forEach(item => {
            console.log(item)
            calendarItems.push({
              title: item.abbreviation + ' ' + item.total_cost_requested,
              start: moment(item.date_requested),
              cssClass: 'request',
              YOUR_DATA: {
                id: item.id,
                request: true
              }
            })
            let dateGiven = moment(item.date_given)
            if (dateGiven.isValid()) {
              calendarItems.push({
                title: item.abbreviation + ' ' + item.total_cost_given,
                start: moment(item.date_given),
                cssClass: 'receipt',
                YOUR_DATA: {
                  id: item.id,
                  receipt: true
                }
              })
            }
          })
          this.calendarEvents = calendarItems
          let vm = this
          this.timeout = setTimeout(function () {
            vm.isLoading = false
          }, 2000)
        })
      },
      eventClicked: function (obj) {
        let id = obj.YOUR_DATA.id
        if (obj.YOUR_DATA.request) {
          this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.ORDER_SALE_REQUEST, 'view') + '/' + id})
        }
        if (obj.YOUR_DATA.receipt) {
          this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.ORDER_SALE_RECEIPT, 'view') + '/' + id})
        }
      }
    },
    beforeDestroy: function () {
      clearTimeout(this.timeout)
      clearInterval(this.interval)
    },
    components: {
      FullCalendar
    }
  }
</script>

<style lang="scss">
    .custom-calendar {
        * {
            box-sizing: content-box;
        }
    }
    .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.receipt {
        background-color: #cb7832;

    }
    .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.request {
        background-color: #0b97c4;
    }
</style>