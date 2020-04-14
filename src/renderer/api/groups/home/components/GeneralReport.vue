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
            <button class="btn btn-primary" @click="getOrderProductionsAndProductionEventsFromDateRange">Filtrar</button>
        </div>
        <table v-if="!isLoading" class="mt-5">
            <tr>
                <th></th>
                <th v-for="machine in machines.filter(machineLooped => {return machineLooped.machine_type_id === 1})">{{machine.name}}</th>
            </tr>
            <tr v-for="product in products.filter(productLooped => {return productLooped.product_type_id === 1})">
                <td>{{product.description}}</td>
                <td v-for="machine in machines.filter(machineLooped => {return machineLooped.machine_type_id === 1})">{{findMaxTableProductionItem(product.id, machine.id).max_kilo_production_per_hour}}</td>
            </tr>
        </table>
        <table v-if="!isLoading" class="mt-5">
            <tr>
                <th></th>
                <th v-for="machine in machines.filter(machineLooped => {return machineLooped.machine_type_id === 2})">{{machine.name}}</th>
            </tr>
            <tr v-for="product in products.filter(productLooped => {return productLooped.product_type_id === 2})">
                <td>{{product.description}}</td>
                <td v-for="machine in machines.filter(machineLooped => {return machineLooped.machine_type_id === 2})">{{findMaxTableProductionItem(product.id, machine.id).max_kilo_production_per_hour}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import EntityTypes from 'renderer/api/EntityTypes'
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
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
          products: [],
          maxProductionTable: [],
          initialStartDate: moment().subtract(7 + moment().isoWeekday() - 1, 'days').format(dateFormat),
          startDate: moment().subtract(7 + moment().isoWeekday() - 1, 'days').format(dateFormat),
          initialEndDate: moment().subtract(moment().isoWeekday(), 'days').format(dateFormat),
          endDate: moment().subtract(moment().isoWeekday(), 'days').format(dateFormat),
          isLoading: false
        }
      },
      methods: {
        setMaxProductionPerMachineAndProduct: async function () {
          this.isLoading = true
          await this.getOrderProductionsSerial()
          await this.getMachineAndProducts()
          for (let machineIndex = 0; machineIndex < this.machines.length; machineIndex++) {
            for (let productIndex = 0; productIndex < this.products.length; productIndex++) {
              let machine = this.machines[machineIndex]
              let product = this.products[productIndex]
              let foundMaxProductionTableItem = this.maxProductionTable.find(maxProductionTableItem => {
                return maxProductionTableItem.machine_id === machine.id && maxProductionTableItem.product_id === product.id
              })
              if (!foundMaxProductionTableItem) {
                this.maxProductionTable.push({machine_id: machine.id, product_id: product.id, max_kilo_production_per_hour: 0})
              }
            }
          }
          for (let orderProductionIndex = 0; orderProductionIndex < this.allOrderProductions.length; orderProductionIndex++) {
            let orderProduction = this.allOrderProductions[orderProductionIndex]
            let orderProductionProducts = orderProduction.products
            for (let orderProductionProductIndex = 0; orderProductionProductIndex < orderProductionProducts.length; orderProductionProductIndex++) {
              let maxProductionTableItem = this.maxProductionTable.find(maxProductionTableItem => {
                return maxProductionTableItem.machine_id === orderProductionProducts[orderProductionProductIndex].pivot.machine_id && maxProductionTableItem.product_id === orderProductionProducts[orderProductionProductIndex].id
              })
              let kilos = orderProductionProducts[orderProductionProductIndex].pivot.kilos
              if (maxProductionTableItem && maxProductionTableItem.max_kilo_production_per_hour < kilos) {
                maxProductionTableItem.max_kilo_production_per_hour = kilos
              }
            }
          }
          this.isLoading = false
        },
        getOrderProductionsSerial: async function () {
          let currentPage = 1
          let perPage = 1500
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
          this.allOrderProductions = totalData
        },
        getMachineAndProducts: async function () {
          await Promise.all([
            GenericApiOperations.list(EntityTypes.MACHINE.apiName),
            GenericApiOperations.list(EntityTypes.PRODUCT.apiName)
          ]).then(result => {
            this.machines = result[0]
            this.products = result[1]
          })
        },
        getOrderProductionsAndProductionEventsFromDateRange: async function () {
          let startDateTime = this.startDate
          let endDateTime = moment(this.endDate).add(1, 'd').format(dateFormat)
          await Promise.all([GenericApiOperations.list(EntityTypes.BAG_ORDER_PRODUCTION.apiName, {filterExacts: {order_production_type_id: 1}, filterStartDateTime: {start_date_time: startDateTime}, filterEndDateTime: {start_date_time: endDateTime}}),
            GenericApiOperations.list(EntityTypes.ROLL_ORDER_PRODUCTION.apiName, {filterExacts: {order_production_type_id: 2}, filterStartDateTime: {start_date_time: startDateTime}, filterEndDateTime: {start_date_time: endDateTime}}),
            GenericApiOperations.list(EntityTypes.PRODUCTION_EVENT.apiName, {filterStartDateTime: {start_date_time: startDateTime}, filterEndDateTime: {start_date_time: endDateTime}})
          ]).then(result => {
            this.bagProductionOrders = result[0]
            this.rollProductionOrders = result[1]
            this.productionEvents = result[2]
          })
        },
        findMaxTableProductionItem: function (productId, machineId) {
          let maxTableProductionItem = this.maxProductionTable.find(maxProductionTableItem => {
            return maxProductionTableItem.machine_id === machineId && maxProductionTableItem.product_id === productId
          })
          return maxTableProductionItem || {}
        }
      },
      created () {
        this.setMaxProductionPerMachineAndProduct()
        this.getOrderProductionsAndProductionEventsFromDateRange()
      }
    }
</script>