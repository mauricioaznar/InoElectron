<template>
    <div class="container">
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <h2 v-if="!isLoading">Reporte de ventas</h2>
        <div class="row" v-if="!isLoading">
            <div class="col-sm-12 py-2">
                <h6>Pedidos vs ventas por mes por ingreso</h6>
                <mau-bar-chart
                        :chartData="salesByMonthCostData"
                        :options="chartOptions"
                        :width="400"
                        :height="200"
                ></mau-bar-chart>
            </div>
            <div class="col-sm-12 py-2">
                <h6>Pedidos vs ventas por mes por kilos</h6>
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
                <h6>Pedidos vs ventas por mes por ingreso por cliente</h6>
                <mau-line-chart
                        :chartData="salesByMonthByClientCostData"
                        :options="chartOptions"
                        :width="400"
                        :height="200"
                ></mau-line-chart>
            </div>
            <div class="col-sm-12 py-2">
                <h6>Pedidos vs ventas por mes por kilos por cliente</h6>
                <mau-line-chart
                        :chartData="salesByMonthByClientKilosData"
                        :options="chartOptions"
                        :width="400"
                        :height="200"
                ></mau-line-chart>
            </div>
        </div>
        <div class="row" v-if="!isLoading">
            <div class="col-sm-12 py-2">
                <h6>Balance (Ventas vs pedidos) por ingreso</h6>
                <mau-line-chart
                        :chartData="salesByMonthByCompanyBalanceData"
                        :options="chartNegativeOptions"
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
        chartNegativeOptions: {
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
      let vm = this
      this.interval = setInterval(function () {
        vm.setSales()
      }, 60000)
    },
    methods: {
      setSales: function () {
        this.isLoading = true
        ApiOperations.getStats('sales').then(result => {
          this.sales = {}
          let salesNormal = []
          for (let i = 0; i < this.monthNames.length; i++) {
            let saleNormalObjFound = result.sales_normal.find(saleNormalObj => {
              return saleNormalObj.month - 1 === i
            })
            let requestNormalObjFound = result.requests_normal.find(requestNormalObj => {
              return requestNormalObj.month - 1 === i
            })
            salesNormal.push({
              total_cost_given: saleNormalObjFound ? saleNormalObjFound.total_cost : 0,
              total_kilos_given: saleNormalObjFound ? saleNormalObjFound.kilos : 0,
              total_cost_requested: requestNormalObjFound ? requestNormalObjFound.total_cost : 0,
              total_kilos_requested: requestNormalObjFound ? requestNormalObjFound.kilos : 0
            })
          }
          let salesByCompany = []
          let companies = result.sales_by_client.map(salesByCompanyObj => { return {id: salesByCompanyObj.company_id, name: salesByCompanyObj.company_name} }).reduce((acc, current) => {
            if (acc.findIndex(storedObj => { return current.id === storedObj.id }) < 0) {
              acc.push(current)
            }
            return acc
          }, [])
          for (let i = 0; i < companies.length; i++) {
            let salesByCompanyByYear = []
            for (let j = 0; j < this.monthNames.length; j++) {
              let saleByClientObjFound = result.sales_by_client.find(saleObj => {
                return saleObj.month - 1 === j && saleObj.company_id === companies[i].id
              })
              let requestByClientObjFound = result.requests_by_client.find(requestObj => {
                return requestObj.month - 1 === j && requestObj.company_id === companies[i].id
              })
              let totalBalance = (requestByClientObjFound ? requestByClientObjFound.total_cost : 0) - (saleByClientObjFound ? saleByClientObjFound.total_cost : 0)
              salesByCompanyByYear.push({
                total_cost: saleByClientObjFound ? saleByClientObjFound.total_cost : 0,
                total_kilos: saleByClientObjFound ? saleByClientObjFound.kilos : 0,
                total_balance: totalBalance
              })
            }
            salesByCompany.push({id: companies[i].id, name: companies[i].name, data: salesByCompanyByYear})
          }
          this.sales.normal = salesNormal
          this.sales.byCompany = salesByCompany
          let vm = this
          this.timeout = setTimeout(function () {
            vm.isLoading = false
          }, 2000)
        })
      }
    },
    beforeDestroy: function () {
      clearTimeout(this.timeout)
      clearInterval(this.interval)
    },
    watch: {
      sales: function (sales) {
        let kilosGiven = sales.normal.map(saleNormalObj => {
          return saleNormalObj.total_kilos_given
        })
        let totalCostGiven = sales.normal.map(saleNormalObj => {
          return saleNormalObj.total_cost_given
        })
        let kilosRequested = sales.normal.map(saleNormalObj => {
          return saleNormalObj.total_kilos_requested
        })
        let totalCostRequested = sales.normal.map(saleNormalObj => {
          return saleNormalObj.total_cost_requested
        })
        this.salesByMonthKilosData = {
          labels: this.monthNames,
          datasets: [
            {
              label: 'Kilos solicitados',
              backgroundColor: '#E42',
              data: kilosRequested
            },
            {
              label: 'Kilos vendidos',
              backgroundColor: '#BF112E',
              data: kilosGiven
            }
          ]
        }
        this.salesByMonthCostData = {
          labels: this.monthNames,
          datasets: [
            {
              label: 'Costo solicitado',
              backgroundColor: '#506',
              data: totalCostRequested
            },
            {
              label: 'Costo vendido',
              backgroundColor: '#13A399',
              data: totalCostGiven
            }
          ]
        }
        let salesByMonthByCompanyKilosDataSets = []
        sales.byCompany.forEach((companyData, index) => {
          let kilosData = companyData.data.map(kilosCostData => {
            return kilosCostData.total_kilos
          })
          salesByMonthByCompanyKilosDataSets.push({
            label: companyData.name,
            borderColor: this.colors[index],
            data: kilosData
          })
        })
        this.salesByMonthByClientKilosData = {
          labels: this.monthNames,
          datasets: salesByMonthByCompanyKilosDataSets
        }
        let salesByMonthByCompanyCostDataSets = []
        sales.byCompany.forEach((companyData, index) => {
          let costData = companyData.data.map(kilosCostData => {
            return kilosCostData.total_cost
          })
          salesByMonthByCompanyCostDataSets.push({
            label: companyData.name,
            borderColor: this.colors[index],
            data: costData
          })
        })
        this.salesByMonthByClientCostData = {
          labels: this.monthNames,
          datasets: salesByMonthByCompanyCostDataSets
        }
        let salesByMonthByCompanyBalanceDataSets = []
        sales.byCompany.forEach((companyData, index) => {
          let balanceData = companyData.data.map(kilosCostData => {
            return kilosCostData.total_balance
          })

          salesByMonthByCompanyBalanceDataSets.push({
            label: companyData.name,
            borderColor: this.colors[index],
            data: balanceData
          })
        })
        this.salesByMonthByCompanyBalanceData = {
          labels: this.monthNames,
          datasets: salesByMonthByCompanyBalanceDataSets
        }
      }
    }
  }
</script>