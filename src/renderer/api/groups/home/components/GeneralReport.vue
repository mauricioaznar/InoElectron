<template>
    <div class="mt-4">
        <div class="form-group">
            <mau-form-input-date
                :name="'startDate'"
                :error="''"
                :label="'Fecha de inicio'"
                :initialValue="initialStartDate"
                v-model="startDate"
            >
            </mau-form-input-date>
        </div>
        <div class="form-group">
            <mau-form-input-date
                    :name="'endDate'"
                    :error="''"
                    :label="'Fecha de fin'"
                    :initialValue="initialEndDate"
                    v-model="endDate"
            >
            </mau-form-input-date>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" @click="getApiResults">Filtrar</button>
        </div>
    </div>
</template>

<script>
    import EntityTypes from 'renderer/api/EntityTypes'
    // import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    import moment from 'moment'
    import Vue from 'vue'
    import GenericApiUrls from 'renderer/api/functions/GenericApiUrls'
    const dateFormat = 'YYYY-MM-DD'
    export default {
      name: 'SalesAndProductionReport',
      data () {
        return {
          productionEvents: [],
          bagProductionOrders: [],
          rollProductionOrders: [],
          allOrderProductions: [],
          machines: [],
          initialStartDate: moment().subtract(7 + moment().isoWeekday() - 1, 'days').format(dateFormat),
          startDate: moment().subtract(7 + moment().isoWeekday() - 1, 'days').format(dateFormat),
          initialEndDate: moment().subtract(moment().isoWeekday(), 'days').format(dateFormat),
          endDate: moment().subtract(moment().isoWeekday(), 'days').format(dateFormat)
        }
      },
      methods: {
        getApiResults: function () {
          // this.allOrderProductions = []
          // let startDateTime = this.startDate
          // let endDateTime = moment(this.endDate).add(1, 'd').format(dateFormat)
          // Promise.all([GenericApiOperations.list(EntityTypes.BAG_ORDER_PRODUCTION.apiName, {filterExacts: {order_production_type_id: 1}, filterStartDateTime: {start_date_time: startDateTime}, filterEndDateTime: {start_date_time: endDateTime}}),
          //   GenericApiOperations.list(EntityTypes.ROLL_ORDER_PRODUCTION.apiName, {filterExacts: {order_production_type_id: 2}, filterStartDateTime: {start_date_time: startDateTime}, filterEndDateTime: {start_date_time: endDateTime}}),
          //   GenericApiOperations.list(EntityTypes.PRODUCTION_EVENT.apiName, {filterStartDateTime: {start_date_time: startDateTime}, filterEndDateTime: {start_date_time: endDateTime}}),
          //   GenericApiOperations.list(EntityTypes.MACHINE.apiName)
          // ]).then(result => {
          //   console.log(result[0])
          //   this.bagProductionOrders = result[0]
          //   this.rollProductionOrders = result[1]
          //   this.productionEvents = result[2]
          //   this.machines = result[3]
          // })
        },
        getOrderProductions: async function () {
          let currentPage = 1
          let perPage = 200
          let nextPageUrl = GenericApiUrls.createListUrl(EntityTypes.ORDER_PRODUCTION.apiName, {paginate: true, page: currentPage, perPage: perPage})
          let totalData = []
          while (nextPageUrl !== null) {
            await Vue.http.get(nextPageUrl).then(result => {
              totalData = totalData.concat(result.data.data)
              return result.body.links.pagination
            }).then(result => {
              if (currentPage === result.last_page) {
                nextPageUrl = null
              } else {
                currentPage++
                nextPageUrl = GenericApiUrls.createListUrl(EntityTypes.ORDER_PRODUCTION.apiName, {paginate: true, page: currentPage, perPage: perPage})
              }
            })
          }
          console.log(totalData)
        }
      },
      created () {
        this.getApiResults()
        this.getOrderProductions()
      }
    }
</script>