<template>
    <div>
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <h2 v-if="!isLoading">Inventario</h2>
        <h6 v-if="!isLoading">Bolsas</h6>
        <table v-if="!isLoading" class="table">
            <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Codigo</th>
                <th scope="col">Kilos Actuales</th>
                <th scope="col">Bultos Actuales</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in inventory">
                <td>{{item.description}}</td>
                <td>{{item.code}}</td>
                <td>{{item.current_kilos}}</td>
                <td>{{item.current_groups}}</td>
            </tr>
            </tbody>
        </table>
        <div class="row" v-if="!isLoading">
            <div class="col-sm">
                <h6>En piso</h6>
                <mau-bar-chart
                        :chartData="onSiteKilosData"
                        :options="chartOptions"
                        :width="400"
                        :height="200"
                ></mau-bar-chart>
                <mau-bar-chart
                        :chartData="onSiteGroupsData"
                        :options="chartOptions"
                        :width="400"
                        :height="200"
                ></mau-bar-chart>
            </div>
            <div class="col-sm">
                <h6>Excedidos</h6>
                <mau-bar-chart
                        :chartData="soldOutKilosData"
                        :options="chartOptions"
                        :width="400"
                        :height="200"
                ></mau-bar-chart>
                <mau-bar-chart
                        :chartData="soldOutGroupsData"
                        :options="chartOptions"
                        :width="400"
                        :height="200"
                ></mau-bar-chart>
            </div>
        </div>
    </div>
</template>

<script>
    import ApiOperations from 'renderer/api/functions/ApiOperations'
    import MauBarChart from 'renderer/components/mau-components/mau-chart/MauBarChart'
    export default {
      data () {
        return {
          inventory: '',
          onSiteKilosData: '',
          onSiteGroupsData: '',
          soldOutKilosData: '',
          soldOutGroupsData: '',
          isLoading: true,
          timeout: '',
          interval: '',
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
        MauBarChart
      },
      created () {
        this.setInventory()
        // let vm = this
        // this.interval = setInterval(function () {
        // vm.setInventory()
        // }, 30000)
      },
      props: {
        type: {
          type: String,
          validator: function (value) {
            return ['Roll', 'Bag'].indexOf(value) !== -1
          },
          required: true
        }
      },
      methods: {
        setInventory: function () {
          this.isLoading = true
          let endpointName = ''
          if (this.type === 'Bag') {
            endpointName = 'bagInventory'
          } else if (this.type === 'Roll') {
            endpointName = 'rollInventory'
          } else {
            return
          }
          ApiOperations.getStats(endpointName).then(result => {
            this.inventory = []
            let inventoryItems = []
            result.forEach(item => {
              let kilosGiven = item.kilos_given || 0
              let kilosAdjusted = item.kilos_adjusted || 0
              let kilosProduced = item.kilos_produced || 0
              let kilosCut = item.kilos_cut || 0
              let currentKilos = +(-(kilosGiven + kilosCut).toFixed(12) + kilosAdjusted + kilosProduced).toFixed(12)
              let groupsGiven = item.groups_given || 0
              let groupsAdjusted = item.groups_adjusted || 0
              let groupsProduced = item.groups_produced || 0
              let groupsCut = item.groups_cut || 0
              let currentGroups = +(-(groupsGiven + groupsCut).toFixed(12) + groupsAdjusted + groupsProduced).toFixed(12)
              if (currentKilos >= 0.01 || currentKilos <= -0.01) {
                inventoryItems.push({
                  description: item.description,
                  code: item.code,
                  current_kilos: currentKilos,
                  current_groups: currentGroups
                })
              }
            })
            this.inventory = inventoryItems
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
        inventory: function (inventory) {
          let onSiteLabels = inventory.filter(inventoryObj => { return inventoryObj.current_kilos > 0 }).map(inventoryObj => { return inventoryObj.code })
          let onSiteKilos = inventory.filter(inventoryObj => { return inventoryObj.current_kilos > 0 }).map(inventoryObj => { return inventoryObj.current_kilos })
          let onSiteGroups = inventory.filter(inventoryObj => { return inventoryObj.current_groups > 0 }).map(inventoryObj => { return inventoryObj.current_groups })
          this.onSiteKilosData = {
            labels: onSiteLabels,
            datasets: [
              {
                label: 'Kilos',
                backgroundColor: '#BF112E',
                data: onSiteKilos
              }
            ]
          }
          this.onSiteGroupsData = {
            labels: onSiteLabels,
            datasets: [
              {
                label: 'Grupos',
                backgroundColor: '#13A399',
                data: onSiteGroups
              }
            ]
          }
          let soldOutLabels = inventory.filter(inventoryObj => { return inventoryObj.current_kilos < 0 }).map(inventoryObj => { return inventoryObj.code })
          let soldOutKilos = inventory.filter(inventoryObj => { return inventoryObj.current_kilos < 0 }).map(inventoryObj => { return (-1 * inventoryObj.current_kilos) })
          let soldOutGroups = inventory.filter(inventoryObj => { return inventoryObj.current_groups < 0 }).map(inventoryObj => { return (-1 * inventoryObj.current_groups) })
          this.soldOutKilosData = {
            labels: soldOutLabels,
            datasets: [
              {
                label: 'Kilos',
                backgroundColor: '#BF112E',
                data: soldOutKilos
              }
            ]
          }
          this.soldOutGroupsData = {
            labels: soldOutLabels,
            datasets: [
              {
                label: 'Grupos',
                backgroundColor: '#13A399',
                data: soldOutGroups
              }
            ]
          }
        }
      }
    }
</script>