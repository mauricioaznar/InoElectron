<template>
    <div>
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <h2 v-if="!isLoading">Reporte de empresas</h2>
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
                <tr v-for="(company, index) in companies">
                    <td>{{company.name}}</td>
                    <td>{{company.calculations.requests_total}}</td>
                    <td>{{company.calculations.finalized_requests_total}}</td>
                    <td>{{company.calculations.sales_total}}</td>
                    <td>{{company.calculations.requests_total_cost}}</td>
                    <td>{{company.calculations.sales_total_cost}}</td>
                    <td v-if="company.calculations.finalized_requests_total > 0">{{Math.round(company.calculations.finalized_requests_total_days_difference / company.calculations.finalized_requests_total * 100) / 100}}</td>
                    <td v-else>-</td>
                </tr>
            </tbody>
        </table>
        <h2 v-if="!isLoading">Reporte de ventas</h2>
        <div class="row" v-if="!isLoading">
            <div class="col-sm-12 py-2" v-for="(chartData, index) in salesByMonthCostData">
                <h6>Comparativo de total de pedidos vs total de ventas (sin IVA) por mes, {{index + 2018}}</h6>
                <mau-bar-chart
                        :chartData="chartData"
                        :options="chartOptions"
                        :width="400"
                        :height="200"
                ></mau-bar-chart>
            </div>
            <div class="col-sm-12 py-2" v-for="(chartData, index) in salesByMonthKilosData">
                <h6>Comparativo de kilos de pedidos vs kilos vendidos de ventas por mes, {{index + 2018}}</h6>
                <mau-bar-chart
                        :chartData="chartData"
                        :options="chartOptions"
                        :width="400"
                        :height="200"
                ></mau-bar-chart>
            </div>
        </div>
        <div class="row" v-if="!isLoading">
            <div class="col-sm-12 py-2" v-for="(chartData, index) in salesByMonthByClientCostData">
                <h6>Total de ventas por cliente por mes, {{index + 2018}}</h6>
                <mau-line-chart
                        :chartData="chartData"
                        :options="chartOptions"
                        :width="400"
                        :height="400"
                ></mau-line-chart>
            </div>
            <div class="col-sm-12 py-2" v-for="(chartData, index) in salesByMonthByClientKilosData">
                <h6>Total de kilos de ventas por cliente por mes, {{index + 2018}}</h6>
                <mau-line-chart
                        :chartData="chartData"
                        :options="chartOptions"
                        :width="400"
                        :height="400"
                ></mau-line-chart>
            </div>
        </div>
    </div>
</template>

<script>
  import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
  import SpecificApiOperations from 'renderer/api/functions/SpecificApiOperations'
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
        isLoading: true,
        timeout: '',
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
    },
    methods: {
      setSales: function () {
        this.isLoading = true
        Promise.all([SpecificApiOperations.getStats('sales'), GenericApiOperations.list(EntityTypes.CLIENT.apiName, {paginate: false})]).then(result => {
          let requests = result[0]['requests']
          let sales = result[0]['sales']
          let companies = result[1]
          for (let compIndex = 0; compIndex < companies.length; compIndex++) {
            let company = companies[compIndex]
            company['calculations'] = {}
            company['years'] = []
            company['calculations']['requests_total'] = 0
            company['calculations']['requests_total_cost'] = 0
            company['calculations']['sales_total'] = 0
            company['calculations']['sales_total_cost'] = 0
            company['calculations']['finalized_requests_total'] = 0
            company['calculations']['finalized_requests_total_days_difference'] = 0
            for (let i = 2018; i <= 2019; i++) {
              let companyYearData = []
              for (let j = 0; j < this.monthNames.length; j++) {
                let companyMonthData = {
                  total_kilos_sold: 0,
                  total_kilos_requested: 0,
                  total_cost_requested: 0,
                  total_cost_sold: 0,
                  total_cost_reached: 0
                }
                companyYearData.push(companyMonthData)
              }
              company['years'][i - 2018] = companyYearData
            }
          }
          for (let reqIndex = 0; reqIndex < requests.length; reqIndex++) {
            let request = requests[reqIndex]
            let companyFound = companies.find(companyObj => { return companyObj['id'] === request['company_id'] })
            let requestMomentDate = moment(request['order_request_date'])
            let requestMonth = requestMomentDate.month()
            let requestYear = requestMomentDate.year() - 2018
            companyFound['calculations']['requests_total']++
            companyFound['calculations']['requests_total_cost'] = Math.round((companyFound['calculations']['requests_total_cost'] + request['total_cost_requested']) * 100) / 100
            companyFound['years'][requestYear][requestMonth]['total_kilos_requested'] += request['total_kilos_requested']
            companyFound['years'][requestYear][requestMonth]['total_cost_requested'] += request['total_cost_requested']
            if (request['order_request_status_id'] === 3) {
              companyFound['calculations']['finalized_requests_total']++
              companyFound['calculations']['finalized_requests_total_days_difference'] = Math.round((companyFound['calculations']['finalized_requests_total_days_difference'] + request['days_difference']) * 100) / 100
              companyFound['years'][requestYear][requestMonth]['total_cost_reached'] += (Math.round((request['total_cost_requested'] - request['total_cost_sold']) * 100) / 100)
            }
          }
          for (let saleIndex = 0; saleIndex < sales.length; saleIndex++) {
            let sale = sales[saleIndex]
            let companyFound = companies.find(companyObj => { return companyObj['id'] === sale['company_id'] })
            let saleMomentDate = moment(sale['order_sale_date'])
            let saleMonth = saleMomentDate.month()
            let saleYear = saleMomentDate.year() - 2018
            companyFound['calculations']['sales_total']++
            companyFound['calculations']['sales_total_cost'] = Math.round((companyFound['calculations']['sales_total_cost'] + sale['total_cost_sold']) * 100) / 100
            companyFound['years'][saleYear][saleMonth]['total_kilos_sold'] += sale['total_kilos_sold']
            companyFound['years'][saleYear][saleMonth]['total_cost_sold'] += sale['total_cost_sold']
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
        if (companies === undefined) {
          return
        }
        let totalKilosSoldYearsData = []
        let totalKilosRequestedYearsData = []
        let totalCostSoldYearsData = []
        let totalCostRequestedYearsData = []
        for (let yearIndex = 0; yearIndex <= 1; yearIndex++) {
          let totalKilosSoldYearData = []
          let totalKilosRequestedYearData = []
          let totalCostSoldYearData = []
          let totalCostRequestedYearData = []
          for (let monthIndex = 0; monthIndex < this.monthNames.length; monthIndex++) {
            let kilosSoldMonthData = 0
            let kilosRequestedMonthTotal = 0
            let costSoldMonthData = 0
            let costRequestedMonthData = 0
            for (let companyIndex = 0; companyIndex < companies.length; companyIndex++) {
              kilosSoldMonthData += companies[companyIndex]['years'][yearIndex][monthIndex]['total_kilos_sold']
              kilosRequestedMonthTotal += companies[companyIndex]['years'][yearIndex][monthIndex]['total_kilos_requested']
              costSoldMonthData += companies[companyIndex]['years'][yearIndex][monthIndex]['total_cost_sold']
              costRequestedMonthData += companies[companyIndex]['years'][yearIndex][monthIndex]['total_cost_requested']
            }
            totalKilosSoldYearData.push(kilosSoldMonthData)
            totalKilosRequestedYearData.push(kilosRequestedMonthTotal)
            totalCostSoldYearData.push(costSoldMonthData)
            totalCostRequestedYearData.push(costRequestedMonthData)
          }
          totalKilosSoldYearsData.push(totalKilosSoldYearData)
          totalKilosRequestedYearsData.push(totalKilosRequestedYearData)
          totalCostSoldYearsData.push(totalCostSoldYearData)
          totalCostRequestedYearsData.push(totalCostRequestedYearData)
        }
        this.salesByMonthKilosData = []
        this.salesByMonthCostData = []
        this.salesByMonthByClientKilosData = []
        this.salesByMonthByClientCostData = []
        for (let yearIndex = 0; yearIndex <= 1; yearIndex++) {
          this.salesByMonthKilosData.push({
            labels: this.monthNames,
            datasets: [
              {
                label: 'Kilos vendidos',
                backgroundColor: '#E42',
                data: totalKilosSoldYearsData[yearIndex]
              },
              {
                label: 'Kilos solicitados',
                backgroundColor: '#AA2',
                data: totalKilosRequestedYearsData[yearIndex]
              }
            ]
          })
          this.salesByMonthCostData.push({
            labels: this.monthNames,
            datasets: [
              {
                label: 'Dinero obtenido en ventas (iva no incluido)',
                backgroundColor: '#E42',
                data: totalCostSoldYearsData[yearIndex]
              },
              {
                label: 'Dinero en los pedidos',
                backgroundColor: '#AA2',
                data: totalCostRequestedYearsData[yearIndex]
              }
            ]
          })
          let companiesTotalKilosSoldYear1DataSets = companies.map((companyObj, i) => {
            return {
              label: companyObj['name'],
              borderColor: this.colors[i],
              fill: false,
              data: companyObj['years'][yearIndex].map(companyYear1DataObj => {
                return companyYear1DataObj['total_kilos_sold']
              })
            }
          })
          this.salesByMonthByClientKilosData.push({
            labels: this.monthNames,
            datasets: companiesTotalKilosSoldYear1DataSets
          })
          let companiesTotalCostSoldYear1DataSets = companies.map((companyObj, i) => {
            return {
              label: companyObj['name'],
              borderColor: this.colors[i],
              fill: false,
              data: companyObj['years'][yearIndex].map(companyYear1DataObj => {
                return companyYear1DataObj['total_cost_sold']
              })
            }
          })
          this.salesByMonthByClientCostData.push({
            labels: this.monthNames,
            datasets: companiesTotalCostSoldYear1DataSets
          })
        }
      }
    }
  }
</script>
