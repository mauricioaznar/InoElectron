<template>
    <div>
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <h2 v-if="!isLoading">Reporte de empresas</h2>
        <table v-if="!isLoading" class="table">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Total de pedidos</th>
                    <th scope="col">Total de pedidos finalizados</th>
                    <th scope="col">Total de ventas</th>
                    <th scope="col">Total de dinero estimado</th>
                    <th scope="col">Total de ganancias</th>
                    <th scope="col">Dias de differencia entre pedidos finalizados y su ultima venta / cantidad de pedidos finalizados </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(company, index) in companies">
                    <td>{{company.name}}</td>
                    <td>{{company.requests_total_year_1}}</td>
                    <td>{{company.finalized_requests_total_year_1}}</td>
                    <td>{{company.sales_total_year_1}}</td>
                    <td>{{company.requests_total_cost_year_1}}</td>
                    <td>{{company.sales_total_cost_year_1}}</td>
                    <td v-if="company.finalized_requests_total_year_1 > 0">{{company.finalized_requests_total_days_difference_year_1 / company.finalized_requests_total_year_1}}</td>
                    <td v-else>-</td>
                </tr>
            </tbody>
        </table>
        <h2 v-if="!isLoading">Reporte de ventas</h2>
        <div class="row" v-if="!isLoading">
            <div class="col-sm-12 py-2">
                <h6>Dinero estimado de pedidos vs dinero ingresado de ventas (sin IVA) por mes</h6>
                <mau-bar-chart
                        :chartData="salesByMonthCostData"
                        :options="chartOptions"
                        :width="400"
                        :height="200"
                ></mau-bar-chart>
            </div>
            <div class="col-sm-12 py-2">
                <h6>Kilos estimado de pedidos vs kilos vendidos de ventas por mes</h6>
                <mau-bar-chart
                        :chartData="salesByMonthKilosData"
                        :options="chartOptions"
                        :width="400"
                        :height="200"
                ></mau-bar-chart>
            </div>
        </div>
        <div class="row" v-if="!isLoading">
            <div class="col-sm-12 py-2">
                <h6>Kilos de ventas por cliente por mes</h6>
                <mau-line-chart
                        :chartData="salesByMonthByClientKilosData"
                        :options="chartOptions"
                        :width="400"
                        :height="400"
                ></mau-line-chart>
            </div>
            <div class="col-sm-12 py-2">
                <h6>Dinero de ventas por cliente por mes</h6>
                <mau-line-chart
                        :chartData="salesByMonthByClientCostData"
                        :options="chartOptions"
                        :width="400"
                        :height="400"
                ></mau-line-chart>
            </div>
        </div>
        <div class="row" v-if="!isLoading">
            <div class="col-sm-12 py-2">
                <h6>sumas de: costo estimado de los pedidos finalizados - costo real de las ventas del pedido finalizado, ordenadas por cliente por mes (se toma la fecha del pedido como referencia)</h6>
                <mau-line-chart
                        :chartData="salesByMonthByCompanyBalanceData"
                        :options="chartCostReachedOptions"
                        :width="400"
                        :height="400"
                ></mau-line-chart>
            </div>
        </div>
    </div>
</template>

<script>
  import ApiOperations from 'renderer/api/functions/ApiOperations'
  import MauBarChart from 'renderer/components/mau-components/mau-chart/MauBarChart'
  import MauLineChart from 'renderer/components/mau-components/mau-chart/MauLineChart'
  import EntityTypes from 'renderer/api/EntityTypes'
  import moment from 'moment'
  export default {
    data () {
      return {
        sales: {},
        salesByMonthCostData: '',
        salesByMonthKilosData: '',
        salesByMonthByClientKilosData: '',
        salesByMonthByClientCostData: '',
        salesByMonthByCompanyBalanceData: '',
        isLoading: true,
        timeout: '',
        yearSelected: '2018',
        companies: [],
        interval: '',
        monthNames: '',
        colors: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
          '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
          '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
          '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
          '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
          '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
          '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
          '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
          '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
          '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'],
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
        },
        chartCostReachedOptions: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'right'
          },
          tooltips: { displayColors: false },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false
              }
            }]
          }
        },
        stackedChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          legend: { display: false },
          tooltips: { displayColors: false },
          scales: {
            yAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              stacked: true
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
      // let vm = this
      // this.interval = setInterval(function () {
      // vm.setSales()
      // }, 60000)
    },
    methods: {
      setSales: function () {
        this.isLoading = true
        Promise.all([ApiOperations.getStats('sales'), ApiOperations.getWithoutPagination(EntityTypes.COMPANY)]).then(result => {
          let requests = result[0]['requests']
          let sales = result[0]['sales']
          let companies = result[1]
          for (let compIndex = 0; compIndex < companies.length; compIndex++) {
            let company = companies[compIndex]
            company['requests_total_year_1'] = 0
            company['requests_total_cost_year_1'] = 0
            company['sales_total_year_1'] = 0
            company['sales_total_cost_year_1'] = 0
            company['finalized_requests_total_year_1'] = 0
            company['finalized_requests_total_days_difference_year_1'] = 0
            let companyYearData = []
            for (let i = 0; i < this.monthNames.length; i++) {
              let companyMonthData = {
                total_kilos_sold: 0,
                total_kilos_requested: 0,
                total_cost_requested: 0,
                total_cost_sold: 0,
                total_cost_reached: 0
              }
              companyYearData.push(companyMonthData)
            }
            company['year_1_data'] = companyYearData
          }
          for (let reqIndex = 0; reqIndex < requests.length; reqIndex++) {
            let request = requests[reqIndex]
            let companyFound = companies.find(companyObj => { return companyObj['id'] === request['company_id'] })
            let requestMomentDate = moment(request['order_request_date'])
            let requestMonth = requestMomentDate.month()
            let requestYear = requestMomentDate.year()
            if (requestYear === 2018) {
              companyFound['requests_total_year_1']++
              companyFound['requests_total_cost_year_1'] = Math.round((companyFound['requests_total_cost_year_1'] + request['total_cost_requested']) * 100) / 100
              companyFound['year_1_data'][requestMonth]['total_kilos_requested'] += request['total_kilos_requested']
              companyFound['year_1_data'][requestMonth]['total_cost_requested'] += request['total_cost_requested']
              if (request['order_request_status_id'] === 3) {
                companyFound['finalized_requests_total_year_1']++
                companyFound['finalized_requests_total_days_difference_year_1'] = Math.round((companyFound['finalized_requests_total_days_difference_year_1'] + request['days_difference']) * 100) / 100
                companyFound['year_1_data'][requestMonth]['total_cost_reached'] += (Math.round((request['total_cost_requested'] - request['total_cost_sold']) * 100) / 100)
              }
            }
          }
          
          for (let saleIndex = 0; saleIndex < requests.length; saleIndex++) {
            let sale = sales[saleIndex]
            let companyFound = companies.find(companyObj => { return companyObj['id'] === sale['company_id'] })
            let saleMomentDate = moment(sale['order_sale_date'])
            let saleMonth = saleMomentDate.month()
            let saleYear = saleMomentDate.year()
            if (saleYear === 2018) {
              companyFound['sales_total_year_1']++
              companyFound['sales_total_cost_year_1'] = Math.round((companyFound['sales_total_cost_year_1'] + sale['total_cost_sold']) * 100) / 100
              companyFound['year_1_data'][saleMonth]['total_kilos_sold'] += sale['total_kilos_sold']
              companyFound['year_1_data'][saleMonth]['total_cost_sold'] += sale['total_cost_sold']
            }
          }
          this.companies = companies
          let vm = this
          this.timeout = setTimeout(function () {
            vm.isLoading = false
          }, 2000)
        })
      }
    },
    beforeDestroy: function () {
      clearTimeout(this.timeout)
      // clearInterval(this.interval)
    },
    watch: {
      companies: function (companies) {
        let totalKilosSoldYearData = []
        let totalCostSoldYearData = []
        let totalCostRequestedYearData = []
        let totalKilosRequestedYearData = []
        for (let i = 0; i < this.monthNames.length; i++) {
          let kilosSoldMonthData = 0
          let costSoldMonthData = 0
          let costRequestedMonthData = 0
          let kilosRequestedMonthTotal = 0
          for (let j = 0; j < companies.length; j++) {
            kilosSoldMonthData += companies[j]['year_1_data'][i]['total_kilos_sold']
            costSoldMonthData += companies[j]['year_1_data'][i]['total_cost_sold']
            costRequestedMonthData += companies[j]['year_1_data'][i]['total_cost_requested']
            kilosRequestedMonthTotal += companies[j]['year_1_data'][i]['total_kilos_requested']
          }
          totalKilosSoldYearData.push(kilosSoldMonthData)
          totalKilosRequestedYearData.push(kilosRequestedMonthTotal)
          totalCostSoldYearData.push(costSoldMonthData)
          totalCostRequestedYearData.push(costRequestedMonthData)
        }
        this.salesByMonthKilosData = {
          labels: this.monthNames,
          datasets: [
            {
              label: 'Kilos vendidos',
              backgroundColor: '#E42',
              data: totalKilosSoldYearData
            },
            {
              label: 'Kilos solicitados',
              backgroundColor: '#AA2',
              data: totalKilosRequestedYearData
            }
          ]
        }
        this.salesByMonthCostData = {
          labels: this.monthNames,
          datasets: [
            {
              label: 'Dinero obtenido en ventas (iva no incluido)',
              backgroundColor: '#E42',
              data: totalCostSoldYearData
            },
            {
              label: 'Dinero estimado en los pedidos',
              backgroundColor: '#AA2',
              data: totalCostRequestedYearData
            }
          ]
        }
        let companiesTotalKilosSoldYear1DataSets = companies.map((companyObj, i) => {
          return {
            label: companyObj['name'],
            borderColor: this.colors[i],
            fill: false,
            data: companyObj['year_1_data'].map(companyYear1DataObj => {
              return companyYear1DataObj['total_kilos_sold']
            })
          }
        })
        this.salesByMonthByClientKilosData = {
          labels: this.monthNames,
          datasets: companiesTotalKilosSoldYear1DataSets
        }
        let companiesTotalCostSoldYear1DataSets = companies.map((companyObj, i) => {
          return {
            label: companyObj['name'],
            borderColor: this.colors[i],
            fill: false,
            data: companyObj['year_1_data'].map(companyYear1DataObj => {
              return companyYear1DataObj['total_cost_sold']
            })
          }
        })
        this.salesByMonthByClientCostData = {
          labels: this.monthNames,
          datasets: companiesTotalCostSoldYear1DataSets
        }
        let companiesTotalCostReachedYear1DataSets = companies.map((companyObj, i) => {
          return {
            label: companyObj['name'],
            borderColor: this.colors[i],
            fill: false,
            data: companyObj['year_1_data'].map(companyYear1DataObj => {
              return companyYear1DataObj['total_cost_reached']
            })
          }
        })
        this.salesByMonthByCompanyBalanceData = {
          labels: this.monthNames,
          datasets: companiesTotalCostReachedYear1DataSets
        }
      }
    }
  }
</script>