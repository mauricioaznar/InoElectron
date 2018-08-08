<template>
    <div class="container">
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <h2 v-if="!isLoading">Reporte de ventas</h2>
        <div class="row" v-if="!isLoading">
            <div class="col-sm">
                <h6>Dinero</h6>
                <mau-bar-chart
                        :chartData="salesByMonthCostData"
                        :options="chartOptions"
                        :width="400"
                        :height="200"
                ></mau-bar-chart>
                <h6>Kilos</h6>
                <mau-bar-chart
                        :chartData="salesByMonthKilosData"
                        :options="chartOptions"
                        :width="400"
                        :height="200"
                ></mau-bar-chart>
            </div>
        </div>  
        <div class="row" v-if="!isLoading">
            <div class="col-sm">
                <h6>Dinero</h6>
                <mau-line-chart
                        :chartData="salesByMonthByClientCostData"
                        :options="chartOptions"
                        :width="400"
                        :height="200"
                ></mau-line-chart>
                <h6>Kilos</h6>
                <mau-line-chart
                :chartData="salesByMonthByClientKilosData"
                :options="chartOptions"
                :width="400"
                :height="200"
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
          legend: { display: false },
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
      let vm = this
      this.interval = setInterval(function () {
        vm.setSales()
      }, 60000)
    },
    methods: {
      setSales: function () {
        this.isLoading = true
        ApiOperations.getStats('sales/' + this.yearSelected).then(result => {
          this.sales = {}
          let salesNormal = []
          for (let i = 0; i < this.monthNames.length; i++) {
            let saleObjFound = result.sales.find(saleObj => {
              return saleObj.month - 1 === i
            })
            salesNormal.push({
              totalCost: saleObjFound ? saleObjFound.total_cost : 0,
              totalKilos: saleObjFound ? saleObjFound.kilos_given : 0
            })
          }
          let salesByClient = []
          let clients = result.sales_by_client.map(salesByClientObj => { return {id: salesByClientObj.client_id, name: salesByClientObj.companyname} }).reduce((acc, current) => {
            if (acc.findIndex(storedObj => { return current.id === storedObj.id }) < 0) {
              acc.push(current)
            }
            return acc
          }, [])
          for (let i = 0; i < clients.length; i++) {
            let salesByClientByYear = []
            for (let j = 0; j < this.monthNames.length; j++) {
              let saleObjFound = result.sales_by_client.find(saleObj => {
                return saleObj.month - 1 === j && saleObj.client_id === clients[i].id
              })
              salesByClientByYear.push({
                total_cost: saleObjFound ? saleObjFound.total_cost : 0,
                total_kilos: saleObjFound ? saleObjFound.kilos_given : 0
              })
            }
            salesByClient.push({id: clients[i].id, name: clients[i].name, data: salesByClientByYear})
          }
          this.sales.normal = salesNormal
          this.sales.byClient = salesByClient
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
        let kilos = sales.normal.map(saleNormalObj => {
          return saleNormalObj.totalKilos
        })
        let totalCost = sales.normal.map(saleNormalObj => {
          return saleNormalObj.totalCost
        })
        this.salesByMonthKilosData = {
          labels: this.monthNames,
          datasets: [
            {
              label: 'Kilos',
              backgroundColor: '#BF112E',
              data: kilos
            }
          ]
        }
        this.salesByMonthCostData = {
          labels: this.monthNames,
          datasets: [
            {
              label: 'Costo',
              backgroundColor: '#13A399',
              data: totalCost
            }
          ]
        }
        let salesByMonthByClientKilosDataSets = []
        sales.byClient.forEach((clientData, index) => {
          let kilosData = clientData.data.map(kilosCostData => {
            return kilosCostData.total_kilos
          })
          salesByMonthByClientKilosDataSets.push({
            label: clientData.name,
            borderColor: this.colors[index],
            data: kilosData
          })
        })
        this.salesByMonthByClientKilosData = {
          labels: this.monthNames,
          datasets: salesByMonthByClientKilosDataSets
        }
        let salesByMonthByClientCostDataSets = []
        sales.byClient.forEach((clientData, index) => {
          let costData = clientData.data.map(kilosCostData => {
            return kilosCostData.total_cost
          })
          salesByMonthByClientCostDataSets.push({
            label: clientData.name,
            borderColor: this.colors[index],
            data: costData
          })
        })
        this.salesByMonthByClientCostData = {
          labels: this.monthNames,
          datasets: salesByMonthByClientCostDataSets
        }
      }
    }
  }
</script>