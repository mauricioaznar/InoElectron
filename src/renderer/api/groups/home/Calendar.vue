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
      // let vm = this
      // this.interval = setInterval(function () {
      // vm.setCalendar()
      // }, 30000)
    },
    methods: {
      setCalendar: function () {
        this.isLoading = true
        Promise.all([
          ApiOperations.getWithoutPagination(EntityTypes.ORDER_REQUEST),
          ApiOperations.getWithoutPagination(EntityTypes.ORDER_SALE)
        ]).then(result => {
          this.calendarEvents = []
          let calendarItems = []
          let requests = result[0]
          for (let requestIndex = 0; requestIndex < requests.length; requestIndex++) {
            let requestObj = requests[requestIndex]
            calendarItems.push({
              title: requestObj.company.abbreviation + ' ' + requestObj.total_cost,
              start: moment(requestObj.date),
              cssClass: 'request',
              YOUR_DATA: {
                id: requestObj.id,
                request: true
              }
            })
          }
          let sales = result[1]
          for (let saleIndex = 0; saleIndex < sales.length; saleIndex++) {
            let saleObj = sales[saleIndex]
            calendarItems.push({
              title: saleObj.company.abbreviation + ' ' + saleObj.total_cost,
              start: moment(saleObj.date),
              cssClass: 'sale',
              YOUR_DATA: {
                id: saleObj.id,
                sale: true
              }
            })
          }
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
          this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.ORDER_REQUEST, 'view') + '/' + id})
        }
        if (obj.YOUR_DATA.sale) {
          this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.ORDER_SALE, 'view') + '/' + id})
        }
      }
    },
    beforeDestroy: function () {
      clearTimeout(this.timeout)
      // clearInterval(this.interval)
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
    .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.sale {
        background-color: #cb7832;

    }
    .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.request {
        background-color: #0b97c4;
    }
</style>