<template>
    <div class="container">
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <h2 v-if="!isLoading">Inventario</h2>
        <h6 v-if="!isLoading">Bolsas</h6>
        <table v-if="!isLoading" class="table">
            <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Kilos Actuales</th>
                <th scope="col">Bultos Actuales</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in inventory">
                <td>{{item.name}}</td>
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
                        :options="{responsive: true, maintainAspectRatio: false, legend: { display: false }, tooltips: { displayColors: false }}"
                        :width="400"
                        :height="200"
                ></mau-bar-chart>
                <mau-bar-chart
                        :chartData="onSiteGroupsData"
                        :options="{responsive: true, maintainAspectRatio: false, legend: { display: false }, tooltips: { displayColors: false }}"
                        :width="400"
                        :height="200"
                ></mau-bar-chart>
            </div>
            <div class="col-sm">
                <h6>Sobrevendidas</h6>
                <mau-bar-chart
                        :chartData="soldOutKilosData"
                        :options="{responsive: true, maintainAspectRatio: false, legend: { display: false }, tooltips: { displayColors: false }}"
                        :width="400"
                        :height="200"
                ></mau-bar-chart>
                <mau-bar-chart
                        :chartData="soldOutGroupsData"
                        :options="{responsive: true, maintainAspectRatio: false, legend: { display: false }, tooltips: { displayColors: false }}"
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
          isLoading: true
        }
      },
      components: {
        MauBarChart
      },
      created () {
        this.setInventory()
        let vm = this
        setInterval(function () {
          vm.setInventory()
        }, 30000)
      },
      methods: {
        setInventory: function () {
          this.isLoading = true
          ApiOperations.getStats('inventory').then(result => {
            this.inventory = []
            let inventoryItems = []
            result.forEach(item => {
              let kilosGiven = item.kilos_given || 0
              let kilosAdjusted = item.kilos_adjusted || 0
              let kilosProduced = item.kilos_produced || 0
              let currentKilos = -(kilosGiven) + kilosAdjusted + kilosProduced
              let groupsGiven = item.groups_given || 0
              let groupsAdjusted = item.groups_adjusted || 0
              let groupsProduced = item.groups_produced || 0
              let currentGroups = -(groupsGiven) + groupsAdjusted + groupsProduced
              if (currentKilos !== 0) {
                inventoryItems.push({
                  name: item.name,
                  current_kilos: currentKilos,
                  current_groups: currentGroups
                })
              }
            })
            this.inventory = inventoryItems
            let vm = this
            setTimeout(function () {
              vm.isLoading = false
            }, 2000)
          })
        }
      },
      watch: {
        inventory: function (inventory) {
          let onSiteLabels = inventory.filter(inventoryObj => { return inventoryObj.current_kilos > 0 }).map(inventoryObj => { return inventoryObj.name })
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
          let soldOutLabels = inventory.filter(inventoryObj => { return inventoryObj.current_kilos < 0 }).map(inventoryObj => { return inventoryObj.name })
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