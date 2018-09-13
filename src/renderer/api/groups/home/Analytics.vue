<template>
    <div class="container">
        <b-tabs @input="tabsUpdated">
            <b-tab title="Reporte de ventas" active>
                <sales-report v-if="tabIndex === 0" class="mt-4"></sales-report>
            </b-tab>
            <b-tab title="Inventario">
                <inventory-report v-if="tabIndex === 1" class="mt-4"></inventory-report>
            </b-tab>
            <b-tab title="Reporte de bolseo">
                <bag-report v-if="tabIndex === 2" class="mt-4"></bag-report>
            </b-tab>
            <b-tab title="Reporte de extrusion">
                <roll-report v-if="tabIndex === 3" class="mt-4"></roll-report>
            </b-tab>
            <b-tab title="Reporte de eventos de produccion">
                <production-event-report v-if="tabIndex === 4" class="mt-4"></production-event-report>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
    import SalesReport from 'renderer/api/groups/home/components/SalesReport.vue'
    import InventoryReport from 'renderer/api/groups/home/components/InventoryReport.vue'
    import ProductionEventReport from 'renderer/api/groups/home/components/ProductionEventReport.vue'
    import BagReport from 'renderer/api/groups/home/components/BagReport.vue'
    import RollReport from 'renderer/api/groups/home/components/RollReport.vue'
    export default {
      data () {
        return {
          tabIndex: 0
        }
      },
      components: {
        InventoryReport,
        SalesReport,
        ProductionEventReport,
        BagReport,
        RollReport
      },
      methods: {
        tabsUpdated: function (index) {
          this.tabIndex = index
        }
      }
    }
</script>
