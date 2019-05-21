<template>
    <div class="container">
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <div class="form-row">
            <div class="col">
                <mau-form-input-select-static
                        v-if="!isLoading"
                        :key="selectedEvent && selectedEvent.title ? selectedEvent.YOUR_DATA.id : 0"
                        v-model="selectedOrderCollectionStatus"
                        :name="'selectedOrderCollectionStatus'"
                        :availableObjects="availableOrderSaleCollectionStatuses"
                        :initialObject="selectedEvent.YOUR_DATA.saleObj.order_sale_collection_status"
                        :displayProperty="'name'"
                        :trackBy="'id'"
                        :error="''"
                >
                </mau-form-input-select-static>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">Actualizar</button>
            </div>
        </div>
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
  import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
  import OrderSalePropertiesReference from 'renderer/api/propertiesReference/OrderSalePropertiesReference'
  import EntityTypes from 'renderer/api/EntityTypes'
  import moment from 'moment'
  export default {
    data () {
      return {
        interval: '',
        timeout: '',
        isLoading: true,
        selectedEvent: {},
        selectedOrderCollectionStatus: {},
        calendarEvents: [],
        availableOrderSaleCollectionStatuses: []
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
        Promise.all([
          GenericApiOperations.list(EntityTypes.ORDER_SALE.apiName, {paginate: false, filterOrderBy: 'date'}),
          GenericApiOperations.list(EntityTypes.ORDER_SALE_COLLECTION_STATUS.apiName, {paginate: false})
        ]).then(result => {
          let calendarEvents = []
          let sales = result[0]
          this.availableOrderSaleCollectionStatuses = result[1]
          for (let saleIndex = 0; saleIndex < sales.length; saleIndex++) {
            let saleObj = sales[saleIndex]
            let saleEventObj = this.createEvent(saleObj)
            // console.log(moment(saleObj.date, 'YYYY-MM-DD').format('YYYY-MMMM-dddd-DD'))
            calendarEvents.push(saleEventObj)
          }
          this.selectedEvent = calendarEvents[0]
          this.calendarEvents = calendarEvents
          let vm = this
          this.timeout = setTimeout(function () {
            vm.isLoading = false
          }, 2000)
        })
      },
      eventClicked: function (event) {
        this.selectedEvent = event
      },
      updateEvent: function () {
        let oldEvent = this.selectedEvent
        let oldEventId = oldEvent.YOUR_DATA.saleObj.id
        GenericApiOperations.edit(EntityTypes.ORDER_SALE.apiName, oldEventId, {[OrderSalePropertiesReference.ORDER_SALE_COLLECTION_STATUS.relationship_id_name]: 2}).then((result) => {
          let newEvent = this.createEvent(result)
          oldEvent.cssClass = newEvent.cssClass
          oldEvent.title = newEvent.title
          oldEvent.YOUR_DATA.saleObj = newEvent.YOUR_DATA.saleObj
        })
      },
      createEvent (saleObj) {
        let title = ''
        let cssClass = ''
        let totalCost = parseInt(saleObj.total_cost / 1000)
        if (saleObj[OrderSalePropertiesReference.ORDER_SALE_COLLECTION_STATUS.relationship_id_name] === 1) {
          title = '#' + saleObj.order_code + ' ' + saleObj.company.abbreviation + ' ' + totalCost + 'k p'
          cssClass = 'sale pending'
        }
        if (saleObj[OrderSalePropertiesReference.ORDER_SALE_COLLECTION_STATUS.relationship_id_name] === 2) {
          title = '#' + saleObj.order_code + ' ' + saleObj.company.abbreviation + ' ' + totalCost + 'k pc'
          cssClass = 'sale partially-collected'
        }
        if (saleObj[OrderSalePropertiesReference.ORDER_SALE_COLLECTION_STATUS.relationship_id_name] === 3) {
          title = '#' + saleObj.order_code + ' ' + saleObj.company.abbreviation + ' ' + totalCost + 'k c'
          cssClass = 'sale collected'
        }
        return {
          title: title,
          start: moment(saleObj.date),
          cssClass: cssClass,
          YOUR_DATA: {
            id: saleObj.id,
            saleObj: saleObj
          }
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
