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
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    import moment from 'moment'
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
      created () {
        this.getApiResults()
      },
      methods: {
        getApiResults: function () {
          let startDateTime = this.startDate
          let endDateTime = moment(this.endDate).add(1, 'd').format(dateFormat)
          Promise.all([GenericApiOperations.list(EntityTypes.BAG_ORDER_PRODUCTION.apiName, {filterExacts: {order_production_type_id: 1}, filterStartDateTime: {start_date_time: startDateTime}, filterEndDateTime: {start_date_time: endDateTime}}),
            GenericApiOperations.list(EntityTypes.ROLL_ORDER_PRODUCTION.apiName, {filterExacts: {order_production_type_id: 2}, filterStartDateTime: {start_date_time: startDateTime}, filterEndDateTime: {start_date_time: endDateTime}}),
            GenericApiOperations.list(EntityTypes.PRODUCTION_EVENT.apiName, {filterStartDateTime: {start_date_time: startDateTime}, filterEndDateTime: {start_date_time: endDateTime}}),
            GenericApiOperations.list(EntityTypes.ORDER_PRODUCTION.apiName),
            GenericApiOperations.list(EntityTypes.MACHINE.apiName)
          ]).then(result => {
            this.bagProductionOrders = result[0]
            this.rollProductionOrders = result[1]
            this.productionEvents = result[3]
            this.allOrderProductions = result[4]
            this.machines = result[5]
          })
        }
      }
    }
</script>