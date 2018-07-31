<template>
    <div>
        <mau-spinner v-if="isLoading" :sizeType="'router'"></mau-spinner>
        <table v-if="!isLoading" class="table">
            <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Kilos Actuales</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in inventory">
                <td>{{item.name}}</td>
                <td>{{item.current_kilos}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import ApiOperations from 'renderer/api/functions/ApiOperations'
    export default {
      data () {
        return {
          inventory: '',
          isLoading: true
        }
      },
      created () {
        ApiOperations.getStats('inventory').then(result => {
          this.inventory = []
          let inventoryItems = []
          result.forEach(item => {
            let kilosGiven = item.kilos_given || 0
            let kilosAdjusted = item.kilos_adjusted || 0
            let kilosProduced = item.kilos_produced || 0
            let balance =  -(kilosGiven) + kilosAdjusted + kilosProduced
            if (balance !== 0) {
              inventoryItems.push({
                name: item.name,
                current_kilos: balance
              })
            }
          })
          this.inventory = inventoryItems
          this.isLoading = false
        })
      }
    }
</script>