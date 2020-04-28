<template>
    <div class="mt-4">
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
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
                <td v-for="machine in machines.filter(machineLooped => {return machineLooped.machine_type_id === 1})" @click="selectMachineProductTableItem(product.id, machine.id)">{{findMachineProductTableItem(product.id, machine.id).max_kilo_production_per_hour}}</td>
            </tr>
        </table>
        <table v-show="showMachineProductTables" v-if="!isLoading" class="mt-5">
            <tr>
                <th></th>
                <th v-for="machine in machines.filter(machineLooped => {return machineLooped.machine_type_id === 2})">{{machine.name}}</th>
            </tr>
            <tr v-for="product in products.filter(productLooped => {return productLooped.product_type_id === 2})">
                <td>{{product.description}}</td>
                <td v-for="machine in machines.filter(machineLooped => {return machineLooped.machine_type_id === 2})">{{findMachineProductTableItem(product.id, machine.id).max_kilo_production_per_hour}}</td>
            </tr>
        </table>
        <div v-if="!isLoading">
            <div class="row">
                <div class="text-left col-sm-1">Inicio</div>
                <div class="text-left col-sm-1">Fin</div>
                <div class="text-left col-sm-2">Empleado</div>
                <div class="col-sm-7">
                    <div class="row">
                        <div class="col-sm-5 text-left">Producto</div>
                        <div class="col-sm-2 text-left">Maquina</div>
                        <div class="col-sm-2 text-right">Kilos</div>
                        <div class="col-sm-1 text-right">T (m)</div>
                        <div class="col-sm-1 text-right">M (m)</div>
                        <div class="col-sm-1 text-right">Extras</div>
                    </div>
                </div>
                <div class="text-left col-sm-1">Desempeño</div>
            </div>
            <div v-for="orderProduction in filteredOrderProductions" class="my-3">
                <div class="row">
                    <div class="text-left col-sm-1">{{orderProduction.start_date_time}}</div>
                    <div class="text-left col-sm-1">{{orderProduction.end_date_time}}</div>
                    <div class="text-left col-sm-2">{{orderProduction.employee}}</div>
                    <div class="col-sm-7">
                        <div v-for="(productionProduct, productionProductIndex) in orderProduction.production_products" class="row">
                            <div class="col-sm-5 text-left">{{productionProduct.product}}</div>
                            <div class="col-sm-2 text-left">{{productionProductIndex !== 0 && orderProduction.order_production_type_id === 1 ? '-' : productionProduct.machine}}</div>
                            <div class="col-sm-2 text-right">{{productionProduct.kilos}} kg</div>
                            <div class="col-sm-1 text-right">{{productionProductIndex !== 0 ? '-' : productionProduct.minutes_should_work + 'm'}}</div>
                            <div class="col-sm-1 text-right">{{productionProductIndex !== 0 && orderProduction.order_production_type_id === 1 ? '-' : productionProduct.minutes_in_maintenance + 'm'}}</div>
                            <div class="col-sm-1 text-right">
                                <mau-form-input-check-box
                                        :initial-value="0"
                                        v-model="productionProduct.show_extras"
                                >
                                </mau-form-input-check-box>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <div class="form-group">
                            <mau-form-input-number
                                    :key="'filteredOrderProductionPerformance' + orderProduction.id"
                                    :label="''"
                                    :placeholder="''"
                                    :name="'filteredOrderProductionPerformance' + orderProduction.id"
                                    v-model="orderProduction.performance"
                                    :initialValue="orderProduction.initial_performance"
                                    :type="'float'"
                                    @input="updateOrderProductionWithPerformance(orderProduction)"
                            >
                            </mau-form-input-number>
                        </div>
                    </div>
                </div>
                <div class="row collapse my-3" v-for="(productionProduct, productionProductIndex) in orderProduction.production_products" :class="{'show': productionProduct.show_extras === 1}">
                    <div class="col-sm-4">
                        <label>Sin estandarizar</label>
                        <div class="row" v-for="frequencyItem in findMachineProductTableItem(productionProduct.product_id, productionProduct.machine_id).frequency_production_items">
                            <div class="col-sm-6">{{frequencyItem.label}}</div>
                            <div class="col-sm-6">{{frequencyItem.count}}</div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <label>Estandarizado</label>
                        <div class="row" v-for="frequencyItem in findMachineProductTableItem(productionProduct.product_id, productionProduct.machine_id).frequency_production_items_standardized">
                            <div class="col-sm-6">{{frequencyItem.label}}</div>
                            <div class="col-sm-6">{{frequencyItem.count}}</div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <label>Reportes de mantenimiento</label>
                        <div class="row" v-for="productionEvent in productionProduct.production_events">
                            <div class="col-sm-3">{{productionEvent.start_date_time}}</div>
                            <div class="col-sm-3">{{productionEvent.end_date_time}}</div>
                            <div class="col-sm-3">{{productionEvent.machine.name}}</div>
                            <div class="col-sm-3">{{productionEvent.maintenance_employee_description}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import EntityTypes from 'renderer/api/EntityTypes'
    import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
    import MauBarChart from 'renderer/components/mau-components/mau-chart/MauBarChart'
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
          allProductionEvents: [],
          filteredOrderProductions: [],
          machines: [],
          products: [],
          machineProductTable: [],
          selectedMachineProductTableItem: {},
          showMachineProductTables: false,
          initialStartDate: moment().subtract(7 + moment().isoWeekday() - 1, 'days').format(dateFormat),
          startDate: moment().subtract(7 + moment().isoWeekday() - 1, 'days').format(dateFormat),
          initialEndDate: moment().subtract(moment().isoWeekday(), 'days').format(dateFormat),
          endDate: moment().subtract(moment().isoWeekday(), 'days').format(dateFormat),
          isLoading: false,
          chartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: true },
            tooltips: { displayColors: false },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }],
              xAxes: [{
                categoryPercentage: 1.0,
                barPercentage: 1.0
              }]
            }
          },
          chartData: {
            labels: ['0-1', '1-2', '2-1'],
            datasets: [
              {
                label: 'Prueba',
                backgroundColor: '#E42',
                data: [1, 2, 5]
              },
              {
                label: 'Prueba',
                backgroundColor: '#E42',
                data: [1, 2, 5]
              }
            ]
          }
        }
      },
      methods: {
        setMachineProductTable: async function () {
          this.isLoading = true
          await this.getOrderProductionsSerial()
          await this.getProductionEventsSerial()
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
                  product_type_id: product.product_type_id,
                  product: product.description,
                  max_kilo_production_per_hour: 0,
                  production_items: [],
                  frequency_production_items: [],
                  frequency_production_items_standardized: []
                })
              }
            }
          }
          for (let orderProductionIndex = 0; orderProductionIndex < this.allOrderProductions.length; orderProductionIndex++) {
            let orderProduction = this.allOrderProductions[orderProductionIndex]
            let orderProductionProducts = orderProduction.products
            for (let orderProductionProductIndex = 0; orderProductionProductIndex < orderProductionProducts.length; orderProductionProductIndex++) {
              let productionProduct = orderProductionProducts[orderProductionProductIndex]
              let machineProductTableItem = this.machineProductTable.find(machineProductTableItem => {
                return machineProductTableItem.machine_id === productionProduct.pivot.machine_id && machineProductTableItem.product_id === productionProduct.id
              })
              if (machineProductTableItem) {
                let countOfTheSameProductTypeInTheSameMachine = 0
                orderProductionProducts.forEach(productionProduct => {
                  if (machineProductTableItem.machine_id === productionProduct.pivot.machine_id && productionProduct.product_type_id === machineProductTableItem.product_type_id) {
                    countOfTheSameProductTypeInTheSameMachine = countOfTheSameProductTypeInTheSameMachine + 1
                  }
                })
                let countMaintenanceReportsInMachine = 0
                for (let productionEventIndex = 0; productionEventIndex < this.allProductionEvents.length; productionEventIndex++) {
                  let productionEvent = this.allProductionEvents[productionEventIndex]
                  if (productionEvent.machine_id === productionProduct.pivot.machine_id) {
                    let productionProductStartDateTime = moment(orderProduction.start_date_time, dateTimeFormat)
                    let productionProductEndDateTime = moment(orderProduction.end_date_time, dateTimeFormat)
                    let productionEventStartDateTime = moment(productionEvent.start_date_time, dateTimeFormat)
                    let productionEventEndDateTime = moment(productionEvent.end_date_time, dateTimeFormat)
                    if (productionEventStartDateTime.isBetween(productionProductStartDateTime, productionProductEndDateTime, '[]') && productionEventEndDateTime.isBetween(productionProductStartDateTime, productionProductEndDateTime, '[]')) {
                      countMaintenanceReportsInMachine++
                    } else if (productionEventStartDateTime.isBetween(productionProductStartDateTime, productionProductEndDateTime, '[]') && productionEventEndDateTime.isAfter(productionProductEndDateTime)) {
                      countMaintenanceReportsInMachine++
                    } else if (productionEventEndDateTime.isBetween(productionProductStartDateTime, productionProductEndDateTime, '[]') && productionEventStartDateTime.isBefore(productionProductStartDateTime)) {
                      countMaintenanceReportsInMachine++
                    }
                  }
                }
                let kilos = productionProduct.pivot.kilos
                let employeeFullname = orderProduction.employee.fullname
                let startDateTime = orderProduction.start_date_time
                let startDateTimeMoment = moment(startDateTime, dateTimeFormat)
                let endDateTime = orderProduction.end_date_time
                let endDateTimeMoment = moment(endDateTime, dateTimeFormat)
                let orderProductionDuration = endDateTimeMoment.diff(startDateTimeMoment, 'minutes')
                let kilosStandardized = ((kilos / orderProductionDuration) * 480)
                machineProductTableItem.production_items.push({
                  employee_full_name: employeeFullname,
                  end_date_time: endDateTime,
                  start_date_time: startDateTime,
                  kilos: kilos,
                  kilos_standardized: kilosStandardized,
                  count_in_the_same_order_production: countOfTheSameProductTypeInTheSameMachine,
                  count_in_maintenance_reports_in_order_production: countMaintenanceReportsInMachine
                })
                if (machineProductTableItem.max_kilo_production_per_hour < kilos) {
                  machineProductTableItem.max_kilo_production_per_hour = kilos
                }
              }
            }
          }
          for (let machineProductTableItemIndex = 0; machineProductTableItemIndex < this.machineProductTable.length; machineProductTableItemIndex++) {
            let machineProductTableItem = this.machineProductTable[machineProductTableItemIndex]
            let productionItems = machineProductTableItem.production_items
            if (productionItems.length > 0) {
              let minProductionItemKilos = 0
              let maxProductionItemKilos = 0
              let intervals = 30
              for (let productionItemIndex = 0; productionItemIndex < productionItems.length; productionItemIndex++) {
                let productionItem = productionItems[productionItemIndex]
                if (productionItem.kilos > maxProductionItemKilos) {
                  maxProductionItemKilos = productionItem.kilos
                }
              }
              let intervalSize = Math.ceil(((maxProductionItemKilos - minProductionItemKilos) / (intervals - 1)) + 1).toFixed(2)
              for (let i = 1; i <= (intervals); i++) {
                let maxIntervalLimit = (i * intervalSize).toFixed(2)
                let minIntervalLimit = (maxIntervalLimit - intervalSize).toFixed(2)
                machineProductTableItem.frequency_production_items.push({
                  label: (i >= intervals) ? (maxIntervalLimit + ' >') : (minIntervalLimit + ' - ' + maxIntervalLimit),
                  count: 0
                })
                machineProductTableItem.frequency_production_items_standardized.push({
                  label: (i >= intervals) ? (maxIntervalLimit + ' >') : (minIntervalLimit + ' - ' + maxIntervalLimit),
                  count: 0
                })
              }
              for (let productionItemIndex = 0; productionItemIndex < productionItems.length; productionItemIndex++) {
                let productionItem = productionItems[productionItemIndex]
                let frequencyProductionIndex = Math.floor(productionItem.kilos / intervalSize)
                if (frequencyProductionIndex >= intervals) {
                  machineProductTableItem.frequency_production_items[intervals - 1].count = machineProductTableItem.frequency_production_items[intervals - 1].count + 1
                } else {
                  machineProductTableItem.frequency_production_items[frequencyProductionIndex].count = machineProductTableItem.frequency_production_items[frequencyProductionIndex].count + 1
                }
                if (productionItem.count_in_the_same_order_production === 1 && productionItem.count_in_maintenance_reports_in_order_production === 0) {
                  let frequencyProductionStandardizedIndex = Math.floor(productionItem.kilos_standardized / intervalSize)
                  if (frequencyProductionStandardizedIndex >= intervals) {
                    machineProductTableItem.frequency_production_items_standardized[intervals - 1].count = machineProductTableItem.frequency_production_items_standardized[intervals - 1].count + 1
                  } else {
                    machineProductTableItem.frequency_production_items_standardized[frequencyProductionStandardizedIndex].count = machineProductTableItem.frequency_production_items_standardized[frequencyProductionStandardizedIndex].count + 1
                  }
                }
              }
            }
          }
          this.isLoading = false
          await this.filterOrderProductionsAndProductionsEventByDateRange()
        },
        getOrderProductionsSerial: async function () {
          let currentPage = 1
          let perPage = 600
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
        getProductionEventsSerial: async function () {
          let currentPage = 1
          let perPage = 300
          let nextPageUrl = GenericApiUrls.createListUrl(EntityTypes.PRODUCTION_EVENT.apiName, {paginate: true, page: currentPage, perPage: perPage})
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
                nextPageUrl = GenericApiUrls.createListUrl(EntityTypes.PRODUCTION_EVENT.apiName, {paginate: true, page: currentPage, perPage: perPage})
              }
            })
          }
          this.allProductionEvents = totalData
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
            this.filteredOrderProductions = []
            result[0].forEach(orderProduction => {
              let filteredOrderProduction = {
                id: orderProduction.id,
                employee: orderProduction.employee.fullname,
                production_products: [],
                start_date_time: orderProduction.start_date_time,
                end_date_time: orderProduction.end_date_time,
                initial_performance: orderProduction.performance,
                performance: orderProduction.performance,
                order_production_type_id: orderProduction.order_production_type_id
              }
              orderProduction.products.forEach(orderProductionProduct => {
                if ((orderProduction.order_production_type_id === 1 && orderProductionProduct.product_type_id === 1) || (orderProduction.order_production_type_id === 2 && orderProductionProduct.product_type_id === 2)) {
                  filteredOrderProduction.production_products.push({
                    id: orderProductionProduct.id,
                    product_id: orderProductionProduct.id,
                    product: orderProductionProduct.description,
                    machine_id: orderProductionProduct.pivot.machine_id,
                    machine: this.machines.find(machine => { return machine.id === orderProductionProduct.pivot.machine_id }).name,
                    minutes_in_maintenance: 0,
                    production_events: [],
                    minutes_should_work: moment(orderProduction.end_date_time, dateTimeFormat).diff(moment(orderProduction.start_date_time, dateTimeFormat), 'minutes'),
                    kilos: orderProductionProduct.pivot.kilos,
                    show_extras: 0
                  })
                }
              })
              if (filteredOrderProduction.production_products.length > 0) {
                this.filteredOrderProductions.push(filteredOrderProduction)
              }
            })
            this.filteredProductionEvents = []
            result[1].forEach(productionEvent => {
              this.filteredOrderProductions.forEach(orderProduction => {
                orderProduction.production_products.forEach(productionProduct => {
                  if (productionProduct.machine_id === productionEvent.machine_id) {
                    let productionProductStartDateTime = moment(orderProduction.start_date_time, dateTimeFormat)
                    let productionProductEndDateTime = moment(orderProduction.end_date_time, dateTimeFormat)
                    let productionEventStartDateTime = moment(productionEvent.start_date_time, dateTimeFormat)
                    let productionEventEndDateTime = moment(productionEvent.end_date_time, dateTimeFormat)
                    if (productionEventStartDateTime.isBetween(productionProductStartDateTime, productionProductEndDateTime, '[]') && productionEventEndDateTime.isBetween(productionProductStartDateTime, productionProductEndDateTime, '[]')) {
                      let minutesInMaintenance = productionEventEndDateTime.diff(productionEventStartDateTime, 'minutes')
                      productionProduct.minutes_in_maintenance = productionProduct.minutes_in_maintenance + minutesInMaintenance
                      console.log(productionProduct)
                      productionProduct.production_events.push(productionEvent)
                    } else if (productionEventStartDateTime.isBetween(productionProductStartDateTime, productionProductEndDateTime, '[]') && productionEventEndDateTime.isAfter(productionProductEndDateTime)) {
                      let minutesInMaintenance = productionProductEndDateTime.diff(productionEventStartDateTime, 'minutes')
                      productionProduct.minutes_in_maintenance = productionProduct.minutes_in_maintenance + minutesInMaintenance
                      console.log(productionProduct)
                      productionProduct.production_events.push(productionEvent)
                    } else if (productionEventEndDateTime.isBetween(productionProductStartDateTime, productionProductEndDateTime, '[]') && productionEventStartDateTime.isBefore(productionProductStartDateTime)) {
                      let minutesInMaintenance = productionEventEndDateTime.diff(productionProductStartDateTime, 'minutes')
                      productionProduct.minutes_in_maintenance = productionProduct.minutes_in_maintenance + minutesInMaintenance
                      console.log(productionProduct)
                      productionProduct.production_events.push(productionEvent)
                    }
                  }
                })
              })
              this.filteredProductionEvents.push({...productionEvent})
            })
          })
        },
        findMachineProductTableItem: function (productId, machineId) {
          let maxTableProductionItem = this.machineProductTable.find(MachineProductTableItem => {
            return MachineProductTableItem.machine_id === machineId && MachineProductTableItem.product_id === productId
          })
          return maxTableProductionItem || {}
        },
        selectMachineProductTableItem: function (productId, machineId) {
          this.selectedMachineProductTableItem = this.findMachineProductTableItem(productId, machineId)
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
          this.allOrderProductions.forEach(orderProduction => {
            orderProduction.products.forEach(product => {
              productionItems.push({
                'Inicio': orderProduction.start_date_time,
                'Fin': orderProduction.end_date_time,
                'Id de la orden de produccion': orderProduction.id,
                'Maquina': this.machines.find(machine => { return machine.id === product.pivot.machine_id }).name,
                'Producto': product.description,
                'Kilos': product.pivot.kilos
              })
            })
          })
          let productsWS = xlsx.utils.json_to_sheet(productionItems)
          xlsx.utils.book_append_sheet(workbook, productsWS, 'Productos producidos')
          let o = remote.dialog.showSaveDialog(options)
          xlsx.writeFile(workbook, o)
        },
        updateOrderProductionWithPerformance: function (orderProduction) {
          console.log(orderProduction)
          let orderProductionId = orderProduction.id
          let orderProductionPerformance = orderProduction.performance
          let orderProductionInitialPerformance = orderProduction.initial_performance
          if (orderProductionInitialPerformance !== orderProductionPerformance) {
            GenericApiOperations.edit(EntityTypes.ORDER_PRODUCTION.apiName, orderProductionId, {performance: orderProductionPerformance}).then(result => {
              console.log(result)
            })
          }
        }
      },
      created () {
        this.setMachineProductTable()
      },
      components: {
        MauBarChart
      }
    }
</script>