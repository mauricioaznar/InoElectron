import {remote} from "electron"
<template>
    <div class="mt-4">
        <div class="form-group" v-if="!isLoading">
            <mau-form-input-date
                v-if="!isLoading"
                :name="'startDate'"
                :error="''"
                :label="'Fecha de inicio'"
                :initialValue="initialStartDate"
                v-model="startDate"
            >
            </mau-form-input-date>
        </div>
        <div class="form-group" v-if="!isLoading">
            <mau-form-input-date
                    :name="'endDate'"
                    :error="''"
                    :label="'Fecha de fin'"
                    :initialValue="initialEndDate"
                    v-model="endDate"
            >
            </mau-form-input-date>
        </div>
        <div class="form-group" v-if="!isLoading">
            <button class="btn btn-primary" @click="filterOrderProductionsAndProductionsEventByDateRange">Filtrar</button>
            <button class="btn btn-primary btn-excel" @click="createExcelFile">Excel</button>
        </div>
        <div class="my-2" v-show="showMachineProductTables" v-if="!isLoading && selectedMachineProductTableItem">
            {{selectedMachineProductTableItem.product_id + ' ' + selectedMachineProductTableItem.machine_id}}
            <div v-for="productionItem in selectedMachineProductTableItem.production_items" class="d-flex justify-content-around">
                <p>{{productionItem.employee_full_name}}</p>
                <p>{{productionItem.start_date_time}}</p>
                <p>{{productionItem.end_date_time}}</p>
                <p>{{productionItem.kilos}}</p>
            </div>
        </div>
        <table v-show="showMachineProductTables" v-if="!isLoading" class="mt-5">
            <tr>
                <th></th>
                <th v-for="machine in machines.filter(machineLooped => {return machineLooped.machine_type_id === 1})">{{machine.name}}</th>
            </tr>
            <tr v-for="product in products.filter(productLooped => {return productLooped.product_type_id === 1})">
                <td>{{product.description}}</td>
                <td v-for="machine in machines.filter(machineLooped => {return machineLooped.machine_type_id === 1})" @click="selectMachineProductTableItem(product.id, machine.id)">{{findMaxTableProductionItem(product.id, machine.id).max_kilo_production_per_hour}}</td>
            </tr>
        </table>
        <table v-show="showMachineProductTables" v-if="!isLoading" class="mt-5">
            <tr>
                <th></th>
                <th v-for="machine in machines.filter(machineLooped => {return machineLooped.machine_type_id === 2})">{{machine.name}}</th>
            </tr>
            <tr v-for="product in products.filter(productLooped => {return productLooped.product_type_id === 2})">
                <td>{{product.description}}</td>
                <td v-for="machine in machines.filter(machineLooped => {return machineLooped.machine_type_id === 2})">{{findMaxTableProductionItem(product.id, machine.id).max_kilo_production_per_hour}}</td>
            </tr>
        </table>
        <table class="table table-sm">
            <tr>
                <th>Fecha de inicio</th>
                <th>Fecha de fin</th>
                <th>Producto</th>
                <th>Empleado</th>
                <th>Maquinia</th>
                <th>Kilos</th>
                <th>Minutos que tiene que trabajar</th>
                <th>Minutos en mantenimiento</th>
            </tr>
            <tr v-for="productionProduct in filteredOrderProductionProducts">
                <td>{{productionProduct.start_date_time}}</td>
                <td>{{productionProduct.end_date_time}}</td>
                <td>{{productionProduct.product}}</td>
                <td>{{productionProduct.employee}}</td>
                <td>{{productionProduct.machine}}</td>
                <td>{{productionProduct.kilos}}</td>
                <td>{{productionProduct.minutes_should_work}}</td>
                <td>{{productionProduct.minutes_in_maintenance}}</td>
            </tr>
        </table>
        <table class="table table-sm">
            <tr>
                <th>Fecha de inicio</th>
                <th>Fecha de fin</th>
                <th>Maquina</th>
            </tr>
            <tr v-for="productionEvent in filteredProductionEvents">
                <td>{{productionEvent.start_date_time}}</td>
                <td>{{productionEvent.end_date_time}}</td>
                <td>{{productionEvent.machine.name}}</td>
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
    import xlsx from 'xlsx'
    import {remote} from 'electron'
    const dateFormat = 'YYYY-MM-DD'
    const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss'
    export default {
      name: 'SalesAndProductionReport',
      data () {
        return {
          productionEvents: [],
          filteredProductionEvents: [],
          allOrderProductions: [],
          filteredOrderProductionProducts: [],
          machines: [],
          products: [],
          machineProductTable: [],
          selectedMachineProductTableItem: {},
          showMachineProductTables: false,
          initialStartDate: moment().subtract(7 + moment().isoWeekday() - 1, 'days').format(dateFormat),
          startDate: moment().subtract(7 + moment().isoWeekday() - 1, 'days').format(dateFormat),
          initialEndDate: moment().subtract(moment().isoWeekday(), 'days').format(dateFormat),
          endDate: moment().subtract(moment().isoWeekday(), 'days').format(dateFormat),
          isLoading: false
        }
      },
      methods: {
        setMachineProductTable: async function () {
          this.isLoading = true
          await this.getOrderProductionsSerial()
          await this.getMachineAndProducts()
          for (let machineIndex = 0; machineIndex < this.machines.length; machineIndex++) {
            for (let productIndex = 0; productIndex < this.products.length; productIndex++) {
              let machine = this.machines[machineIndex]
              let product = this.products[productIndex]
              let foundMachineProductTableItem = this.machineProductTable.find(MachineProductTableItem => {
                return MachineProductTableItem.machine_id === machine.id && MachineProductTableItem.product_id === product.id
              })
              if (!foundMachineProductTableItem) {
                this.machineProductTable.push({
                  machine_id: machine.id,
                  machine: machine.name,
                  product_id: product.id,
                  product: product.description,
                  max_kilo_production_per_hour: 0,
                  production_items: []
                })
              }
            }
          }
          for (let orderProductionIndex = 0; orderProductionIndex < this.allOrderProductions.length; orderProductionIndex++) {
            let orderProduction = this.allOrderProductions[orderProductionIndex]
            let orderProductionProducts = orderProduction.products
            for (let orderProductionProductIndex = 0; orderProductionProductIndex < orderProductionProducts.length; orderProductionProductIndex++) {
              let MachineProductTableItem = this.machineProductTable.find(MachineProductTableItem => {
                return MachineProductTableItem.machine_id === orderProductionProducts[orderProductionProductIndex].pivot.machine_id && MachineProductTableItem.product_id === orderProductionProducts[orderProductionProductIndex].id
              })
              let kilos = orderProductionProducts[orderProductionProductIndex].pivot.kilos
              let employeeFullname = orderProduction.employee.fullname
              let startDateTime = orderProduction.start_date_time
              let endDateTime = orderProduction.end_date_time
              if (MachineProductTableItem) {
                MachineProductTableItem.production_items.push({
                  employee_full_name: employeeFullname,
                  end_date_time: endDateTime,
                  start_date_time: startDateTime,
                  kilos: kilos
                })
                if (MachineProductTableItem.max_kilo_production_per_hour < kilos) {
                  MachineProductTableItem.max_kilo_production_per_hour = kilos
                }
              }
            }
          }
          this.isLoading = false
          await this.filterOrderProductionsAndProductionsEventByDateRange()
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
        filterOrderProductionsAndProductionsEventByDateRange: async function () {
          let startDateTime = moment(this.startDate).format(dateFormat)
          let endDateTime = moment(this.endDate).add(1, 'd').format(dateFormat)
          let startDateTimeMinusOverlap = moment(this.startDate).subtract(7, 'd').format(dateFormat)
          let endDateTimePlusOverlap = moment(this.endDate).add(8, 'd').format(dateFormat)
          await Promise.all([GenericApiOperations.list(EntityTypes.BAG_ORDER_PRODUCTION.apiName, {filterStartDateTime: {start_date_time: startDateTime}, filterEndDateTime: {start_date_time: endDateTime}}),
            GenericApiOperations.list(EntityTypes.PRODUCTION_EVENT.apiName, {filterStartDateTime: {start_date_time: startDateTimeMinusOverlap}, filterEndDateTime: {start_date_time: endDateTimePlusOverlap}})
          ]).then(result => {
            this.filteredOrderProductionProducts = []
            result[0].forEach(orderProduction => {
              return orderProduction.products.map(orderProductionProduct => {
                if ((orderProduction.order_production_type_id === 1 && orderProductionProduct.product_type_id === 1) || (orderProduction.order_production_type_id === 2 && orderProductionProduct.product_type_id === 2)) {
                  this.filteredOrderProductionProducts.push({
                    product_id: orderProductionProduct.id,
                    product: orderProductionProduct.description,
                    employee: orderProduction.employee.fullname,
                    machine_id: orderProductionProduct.pivot.machine_id,
                    machine: this.machines.find(machine => { return machine.id === orderProductionProduct.pivot.machine_id }).name,
                    kilos: orderProductionProduct.pivot.kilos,
                    start_date_time: orderProduction.start_date_time,
                    end_date_time: orderProduction.end_date_time,
                    minutes_should_work: moment(orderProduction.end_date_time, dateTimeFormat).diff(moment(orderProduction.start_date_time, dateTimeFormat), 'minutes'),
                    minutes_in_maintenance: 0
                  })
                }
              })
            })
            this.filteredProductionEvents = []
            result[1].forEach(productionEvent => {
              let filteredOrderProductionProductsByMachine = this.filteredOrderProductionProducts.filter(productionProduct => {
                return productionProduct.machine_id === productionEvent.machine_id
              })
              filteredOrderProductionProductsByMachine.forEach(productionProduct => {
                let productionProductStartDateTime = moment(productionProduct.start_date_time, dateTimeFormat)
                let productionProductEndDateTime = moment(productionProduct.end_date_time, dateTimeFormat)
                let productionEventStartDateTime = moment(productionEvent.start_date_time, dateTimeFormat)
                let productionEventEndDateTime = moment(productionEvent.end_date_time, dateTimeFormat)
                if (productionEventStartDateTime.isBetween(productionProductStartDateTime, productionProductEndDateTime, '[]') && productionEventEndDateTime.isBetween(productionProductStartDateTime, productionProductEndDateTime, '[]')) {
                  let minutesInMaintenance = productionEventEndDateTime.diff(productionEventStartDateTime, 'minutes')
                  productionProduct.minutes_in_maintenance = productionProduct.minutes_in_maintenance + minutesInMaintenance
                } else if (productionEventStartDateTime.isBetween(productionProductStartDateTime, productionProductEndDateTime, '[]') && productionEventEndDateTime.isAfter(productionProductEndDateTime)) {
                  let minutesInMaintenance = productionProductEndDateTime.diff(productionEventStartDateTime, 'minutes')
                  productionProduct.minutes_in_maintenance = productionProduct.minutes_in_maintenance + minutesInMaintenance
                } else if (productionEventEndDateTime.isBetween(productionProductStartDateTime, productionProductEndDateTime, '[]') && productionEventStartDateTime.isBefore(productionProductStartDateTime)) {
                  let minutesInMaintenance = productionEventEndDateTime.diff(productionProductStartDateTime, 'minutes')
                  productionProduct.minutes_in_maintenance = productionProduct.minutes_in_maintenance + minutesInMaintenance
                }
              })
              this.filteredProductionEvents.push({...productionEvent})
            })
          })
        },
        findMaxTableProductionItem: function (productId, machineId) {
          let maxTableProductionItem = this.machineProductTable.find(MachineProductTableItem => {
            return MachineProductTableItem.machine_id === machineId && MachineProductTableItem.product_id === productId
          })
          return maxTableProductionItem || {}
        },
        selectMachineProductTableItem: function (productId, machineId) {
          this.selectedMachineProductTableItem = this.findMaxTableProductionItem(productId, machineId)
        },
        createExcelFile: function () {
          let options = {
            title: 'Save file',
            defaultPath: 'my_file',
            buttonLabel: 'Save',
            filters: [
              {name: 'xlsx', extensions: ['xlsx']},
              {name: 'txt', extensions: ['txt']},
              {name: 'All Files', extensions: ['*']}
            ]
          }
          let workbook = xlsx.utils.book_new()
          let productionItems = []
          this.machineProductTable.forEach(MachineProductTableItem => {
            MachineProductTableItem.production_items.forEach(productionItem => {
              productionItems.push({
                'Inicio': productionItem.start_date_time,
                'Fin': productionItem.end_date_time,
                'Empleado': productionItem.employee_full_name,
                'Maquina': MachineProductTableItem.machine,
                'Producto': MachineProductTableItem.product,
                'Kilos': productionItem.kilos
              })
            })
          })
          let productsWS = xlsx.utils.json_to_sheet(productionItems)
          xlsx.utils.book_append_sheet(workbook, productsWS, 'Productos producidos')
          let o = remote.dialog.showSaveDialog(options)
          xlsx.writeFile(workbook, o)
        }
      },
      created () {
        this.setMachineProductTable()
      }
    }
</script>