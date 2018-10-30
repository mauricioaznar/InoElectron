<template>
    <div>
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <h2 v-if="!isLoading">Inventario</h2>
        <h6 v-if="!isLoading && type === 'Bag'">Bolsas</h6>
        <h6 v-if="!isLoading && type === 'Roll'">Rollos</h6>
        <table v-if="!isLoading" class="table">
            <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Codigo</th>
                <th scope="col">Kilos Actuales</th>
                <th scope="col" v-if="type === 'Bag'">Bultos Actuales</th>
                <th scope="col" v-if="type === 'Roll'">Rollos Actuales</th>
                <th scope="col" v-if="type === 'Bag'">Kilos restantes por producir</th>
                <th scope="col" v-if="type === 'Bag'">Bultos restantes por producir</th>
                <th scope="col" v-if="type === 'Bag'">Kilos en pedidos pendientes</th>
                <th scope="col" v-if="type === 'Bag'">Bultos en pedidos pendientes</th>
                <!--<th scope="col" v-if="type === 'Bag'">Kilos en pedidos en produccion</th>-->
                <!--<th scope="col" v-if="type === 'Bag'">Bultos en pedidos en produccion</th>-->
                <!--<th scope="col" v-if="type === 'Bag'">Kilos de ventas pendientes</th>-->
                <!--<th scope="col" v-if="type === 'Bag'">Bultos de ventas pendientes</th>-->
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in inventory">
                <td>{{item.description}}</td>
                <td>{{item.code}}</td>
                <td>{{item.current_kilos}}</td>
                <td>{{item.current_groups}}</td>
                <td v-if="type === 'Bag'">{{item.kilos_requested_to_be_produced}}</td>
                <td v-if="type === 'Bag'">{{item.groups_requested_to_be_produced}}</td>
                <td v-if="type === 'Bag'">{{item.kilos_requested_pending}}</td>
                <td v-if="type === 'Bag'">{{item.groups_requested_pending}}</td>
                <!--<td v-if="type === 'Bag'">{{item.kilos_requested_in_production}}</td>-->
                <!--<td v-if="type === 'Bag'">{{item.groups_requested_in_production}}</td>-->
                <!--<td v-if="type === 'Bag'">{{item.kilos_sold_pending}}</td>-->
                <!--<td v-if="type === 'Bag'">{{item.groups_sold_pending}}</td>-->
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
              let kilosSoldGiven = item.kilos_sold_given || 0
              let kilosSoldPending = item.kilos_sold_pending || 0
              let kilosRequested = item.kilos_requested || 0
              let kilosRequestedGiven = item.kilos_requested_given || 0
              let kilosRequestedPending = item.kilos_requested_pending || 0
              let kilosRequestedInProduction = item.kilos_requested_in_production || 0
              let kilosRequestedToBeProduced = Math.round((kilosRequested - kilosRequestedGiven) * 100) / 100
              let kilosAdjusted = item.kilos_adjusted || 0
              let kilosProduced = item.kilos_produced || 0
              let kilosCut = item.kilos_cut || 0
              let currentKilos = Math.round((-(kilosSoldGiven + kilosCut) + (kilosAdjusted + kilosProduced)) * 100) / 100
              let groupsSoldGiven = item.groups_sold_given || 0
              let groupsSoldPending = item.groups_sold_pending || 0
              let groupsRequested = item.groups_requested || 0
              let groupsRequestedPending = item.groups_requested_pending || 0
              let groupsRequestedInProduction = item.groups_requested_to_be_produced || 0
              let groupsRequestedGiven = item.groups_requested_given || 0
              let groupsRequestedToBeProduced = Math.round((groupsRequested - groupsRequestedGiven) * 100) / 100
              let groupsAdjusted = item.groups_adjusted || 0
              let groupsProduced = item.groups_produced || 0
              let groupsCut = item.groups_cut || 0
              let currentGroups = +(-(groupsSoldGiven + groupsCut).toFixed(12) + groupsAdjusted + groupsProduced).toFixed(12)
              if ((this.type === 'Bag' && ((currentKilos >= 0.01 || currentKilos <= -0.01)) || (kilosRequestedToBeProduced >= 0.01)) || (this.type === 'Roll' && (currentKilos >= 0.01 || currentKilos <= -0.01 || currentGroups > 0 || currentGroups < 0))) {
                inventoryItems.push({
                  description: item.description,
                  code: item.code,
                  current_kilos: currentKilos,
                  kilos_sold_pending: kilosSoldPending,
                  kilos_requested: kilosRequested,
                  kilos_requested_pending: kilosRequestedPending,
                  kilos_requested_in_production: kilosRequestedInProduction,
                  kilos_requested_to_be_produced: kilosRequestedToBeProduced,
                  current_groups: currentGroups,
                  groups_sold_pending: groupsSoldPending,
                  groups_requested: groupsRequested,
                  groups_requested_pending: groupsRequestedPending,
                  groups_requested_in_production: groupsRequestedInProduction,
                  groups_requested_to_be_produced: groupsRequestedToBeProduced
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