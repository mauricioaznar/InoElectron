<template>
    <div class="container">
        <mau-form-input-select-static
            :availableObjects="options"
            :initialObject="initialTabIndex"
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
        <expense-report :key="tabIndex.value + 'roll'" v-if="tabIndex.value === 4" class="mt-4"></expense-report>
    </div>
</template>

<script>
    import SalesReport from 'renderer/api/groups/home/components/SalesReport.vue'
    import BagInventoryReport from 'renderer/api/groups/home/components/BagInventoryReport.vue'
    import ProductionEventReport from 'renderer/api/groups/home/components/ProductionEventReport.vue'
    import ProductionReport from 'renderer/api/groups/home/components/ProductionReport.vue'
    import ExpenseReport from 'renderer/api/groups/home/components/ExpenseReport'
    export default {
      data () {
        return {
          tabIndex: '',
          initialTabIndex: {value: 4, text: 'Reporte de gastos'},
          options: [
            {value: 0, text: 'Reporte de ventas'},
            {value: 1, text: 'Inventario de bolsas'},
            {value: 2, text: 'Reporte de bolseo'},
            {value: 3, text: 'Reporte de extrusion'},
            {value: 4, text: 'Reporte de gastos'}
          ]
        }
      },
      components: {
        BagInventoryReport,
        SalesReport,
        ProductionEventReport,
        ProductionReport,
        ExpenseReport
      },
      methods: {
      }
    }
</script>
