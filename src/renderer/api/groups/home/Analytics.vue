<template>
    <div class="container">
        <mau-form-input-select-static
            :availableObjects="options"
            :displayProperty="'text'"
            :name="'reportSelect'"
            :trackBy="'value'"
            v-model="tabIndex"
        >
        </mau-form-input-select-static>
        <sales-report v-if="tabIndex.value === 0" class="mt-4"></sales-report>
        <bag-inventory-report v-if="tabIndex.value === 1" class="mt-4"></bag-inventory-report>
        <production-report :key="tabIndex.value + 'bag'" :reportType="'bag'" v-if="tabIndex.value === 2" class="mt-4"></production-report>
        <production-report :key="tabIndex.value + 'roll'" :reportType="'roll'" v-if="tabIndex.value === 3" class="mt-4"></production-report>
    </div>
</template>

<script>
    import SalesReport from 'renderer/api/groups/home/components/SalesReport.vue'
    import BagInventoryReport from 'renderer/api/groups/home/components/BagInventoryReport.vue'
    import ProductionEventReport from 'renderer/api/groups/home/components/ProductionEventReport.vue'
    import ProductionReport from 'renderer/api/groups/home/components/ProductionReport.vue'
    export default {
      data () {
        return {
          tabIndex: {value: 0, text: 'Reporte de ventas'},
          options: [
            {value: 0, text: 'Reporte de ventas'},
            {value: 1, text: 'Inventario de bolsas'},
            {value: 2, text: 'Reporte de bolseo'},
            {value: 3, text: 'Reporte de extrusion'}
          ]
        }
      },
      components: {
        BagInventoryReport,
        SalesReport,
        ProductionEventReport,
        ProductionReport
      },
      methods: {
      }
    }
</script>
