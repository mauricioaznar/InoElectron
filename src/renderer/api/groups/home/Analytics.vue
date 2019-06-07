<template>
    <div class="container">
        <b-tabs @input="tabsUpdated">
            <b-tab title="Reporte de ventas" active>
                <sales-report v-if="tabIndex === 0" class="mt-4"></sales-report>
            </b-tab>
            <b-tab title="Inventario de bolsa">
                <bag-inventory-report v-if="tabIndex === 1" class="mt-4"></bag-inventory-report>
            </b-tab>
            <b-tab title="Reporte de eventos de produccion">
                <production-event-report v-if="tabIndex === 4" class="mt-4"></production-event-report>
            </b-tab>
            <b-tab title="Reporte de bolseo v2">
                <production-report :reportType="'bag'" v-if="tabIndex === 5" class="mt-4"></production-report>
            </b-tab>
            <b-tab title="Reporte de extrusion v2">
                <production-report :reportType="'roll'" v-if="tabIndex === 6" class="mt-4"></production-report>
            </b-tab>
        </b-tabs>
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
          tabIndex: 0
        }
      },
      components: {
        BagInventoryReport,
        SalesReport,
        ProductionEventReport,
        ProductionReport
      },
      methods: {
        tabsUpdated: function (index) {
          this.tabIndex = index
        }
      }
    }
</script>
