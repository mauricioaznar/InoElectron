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
  import OrderSalePropertiesReference from 'renderer/api/propertiesReference/OrderSalePropertiesReference'
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
          ApiOperations.getWithoutPagination(EntityTypes.ORDER_SALE)
        ]).then(result => {
          this.calendarEvents = []
          let calendarItems = []
          let sales = result[0]
          for (let saleIndex = 0; saleIndex < sales.length; saleIndex++) {
            let saleObj = sales[saleIndex]
            let totalCost = parseInt(saleObj.total_cost / 1000)
            if (saleObj[OrderSalePropertiesReference.ORDER_SALE_COLLECTION_STATUS.relationship_id_name] === 1) {
              calendarItems.push({
                title: saleObj.company.abbreviation + ' ' + totalCost + 'k p',
                start: moment(saleObj.date),
                cssClass: 'sale pending',
                YOUR_DATA: {
                  id: saleObj.id,
                  sale: true
                }
              })
            }
            if (saleObj[OrderSalePropertiesReference.ORDER_SALE_COLLECTION_STATUS.relationship_id_name] === 2) {
              calendarItems.push({
                title: saleObj.company.abbreviation + ' ' + totalCost + 'k pc',
                start: moment(saleObj.date),
                cssClass: 'sale partially-collected',
                YOUR_DATA: {
                  id: saleObj.id,
                  sale: true
                }
              })
            }
            if (saleObj[OrderSalePropertiesReference.ORDER_SALE_COLLECTION_STATUS.relationship_id_name] === 3) {
              calendarItems.push({
                title: saleObj.company.abbreviation + ' ' + totalCost + 'k c',
                start: moment(saleObj.date),
                cssClass: 'sale collected',
                YOUR_DATA: {
                  id: saleObj.id,
                  sale: true
                }
              })
            }
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
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.ORDER_SALE, 'view') + '/' + id})
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
    .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.sale.pending {
        background-color: #D3D3D3;
    }
    .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.sale.partially-collected {
        background-color: #99badd;
    }
    .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.sale.collected {
        background-color: #badd99;
    }
</style>