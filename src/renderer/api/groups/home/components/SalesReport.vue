<template>
    <div>
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <div class="d-flex justify-content-between">
            <h2 v-if="!isLoading">Reporte de clientes</h2>
            <a class="fa fa-clipboard p-2" href="#" @click.prevent="copySalesToClipboard()"></a>
        </div>
        <table v-if="!isLoading" class="table">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Cantidad de pedidos</th>
                    <th scope="col">Cantidad de pedidos finalizados</th>
                    <th scope="col">Cantidad de ventas</th>
                    <th scope="col">Total de pedidos finalizados</th>
                    <th scope="col">Total ventas de ventas finalizadas</th>
                    <th scope="col">Promedio de dias de entrega </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(client, index) in clients">
                    <td>{{client.name}}</td>
                    <td>{{client.calculations.requests_total}}</td>
                    <td>{{client.calculations.finalized_requests_total}}</td>
                    <td>{{client.calculations.sales_total}}</td>
                    <td>{{client.calculations.requests_total_cost}}</td>
                    <td>{{client.calculations.sales_total_cost}}</td>
                    <td v-if="client.calculations.finalized_requests_total > 0">{{Math.round(client.calculations.finalized_requests_total_days_difference / client.calculations.finalized_requests_total * 100) / 100}}</td>
                    <td v-else>-</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
  import SpecificApiOperations from 'renderer/api/functions/SpecificApiOperations'
  import MauBarChart from 'renderer/components/mau-components/mau-chart/MauBarChart'
  import MauLineChart from 'renderer/components/mau-components/mau-chart/MauLineChart'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {clipboard} from 'electron'
  import moment from 'moment'
  export default {
    data () {
      return {
        sales: {},
        salesByMonthCostData: '',
        salesByMonthKilosData: '',
        salesByMonthByClientKilosData: '',
        salesByMonthByClientCostData: '',
        isLoading: true,
        timeout: '',
        clients: [],
        interval: '',
        monthNames: '',
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
            }]
          }
        }
      }
    },
    components: {
      MauBarChart,
      MauLineChart
    },
    created () {
      moment.locale('es')
      this.monthNames = moment.months()
      this.setSales()
    },
    methods: {
      setSales: function () {
        this.isLoading = true
        Promise.all([SpecificApiOperations.getStats('sales'), GenericApiOperations.list(EntityTypes.CLIENT.apiName, {paginate: false})]).then(result => {
          let requests = result[0]['requests']
          let sales = result[0]['sales']
          let clients = result[1]
          for (let clientIndex = 0; clientIndex < clients.length; clientIndex++) {
            let client = clients[clientIndex]
            client['calculations'] = {}
            client['years'] = []
            client['calculations']['requests_total'] = 0
            client['calculations']['requests_total_cost'] = 0
            client['calculations']['sales_total'] = 0
            client['calculations']['sales_total_cost'] = 0
            client['calculations']['finalized_requests_total'] = 0
            client['calculations']['finalized_requests_total_days_difference'] = 0
            for (let i = 2018; i <= 2020; i++) {
              let clientYearData = []
              for (let j = 0; j < this.monthNames.length; j++) {
                let clientMonthData = {
                  total_kilos_sold: 0,
                  total_kilos_requested: 0,
                  total_cost_requested: 0,
                  total_cost_sold: 0,
                  total_cost_reached: 0
                }
                clientYearData.push(clientMonthData)
              }
              client['years'][i - 2018] = clientYearData
            }
          }
          for (let reqIndex = 0; reqIndex < requests.length; reqIndex++) {
            let request = requests[reqIndex]
            let clientFound = clients.find(clientObj => { return clientObj['id'] === request['client_id'] })
            let requestMomentDate = moment(request['order_request_date'])
            let requestMonth = requestMomentDate.month()
            let requestYear = requestMomentDate.year() - 2018
            clientFound['calculations']['requests_total']++
            clientFound['calculations']['requests_total_cost'] = Math.round((clientFound['calculations']['requests_total_cost'] + request['total_cost_requested']) * 100) / 100
            clientFound['years'][requestYear][requestMonth]['total_kilos_requested'] += request['total_kilos_requested']
            clientFound['years'][requestYear][requestMonth]['total_cost_requested'] += request['total_cost_requested']
            if (request['order_request_status_id'] === 3) {
              clientFound['calculations']['finalized_requests_total']++
              clientFound['calculations']['finalized_requests_total_days_difference'] = Math.round((clientFound['calculations']['finalized_requests_total_days_difference'] + request['days_difference']) * 100) / 100
              clientFound['years'][requestYear][requestMonth]['total_cost_reached'] += (Math.round((request['total_cost_requested'] - request['total_cost_sold']) * 100) / 100)
            }
          }
          for (let saleIndex = 0; saleIndex < sales.length; saleIndex++) {
            let sale = sales[saleIndex]
            let clientFound = clients.find(clientObj => { return clientObj['id'] === sale['client_id'] })
            let saleMomentDate = moment(sale['order_sale_date'])
            let saleMonth = saleMomentDate.month()
            let saleYear = saleMomentDate.year() - 2018
            clientFound['calculations']['sales_total']++
            clientFound['calculations']['sales_total_cost'] = Math.round((clientFound['calculations']['sales_total_cost'] + sale['total_cost_sold']) * 100) / 100
            clientFound['years'][saleYear][saleMonth]['total_kilos_sold'] += sale['total_kilos_sold']
            clientFound['years'][saleYear][saleMonth]['total_cost_sold'] += sale['total_cost_sold']
          }
          this.clients = clients
          let vm = this
          this.timeout = setTimeout(function () {
            vm.isLoading = false
          }, 2000)
        })
      },
      copySalesToClipboard: function () {
        clipboard.writeText('is it on clipboard?')
      }
    },
    beforeDestroy: function () {
      clearTimeout(this.timeout)
    },
    watch: {
    }
  }
</script>
