<template>
    <div class="px-5">
        <mau-form-input-select-static
            :availableObjects="options"
            :initialObject="initialOptionSelected"
            :displayProperty="'text'"
            :name="'reportSelect'"
            :trackBy="'value'"
            v-model="optionSelected"
        >
        </mau-form-input-select-static>
        <sales-report v-if="optionSelected.value === 0" class="mt-4"> </sales-report>
        <bag-inventory-report v-if="optionSelected.value === 1" class="mt-4"> </bag-inventory-report>
        <production-report :key="optionSelected.value + 'bag'" :reportType="'bag'" v-if="optionSelected.value === 2" class="mt-4"> </production-report>
        <production-report :key="optionSelected.value + 'roll'" :reportType="'roll'" v-if="optionSelected.value === 3" class="mt-4"> </production-report>
        <expense-report-two :key="optionSelected.value + 'expenseReport2'" v-if="optionSelected.value === 4" class="mt-4"> </expense-report-two>
        <expense-report-three :key="optionSelected.value + 'expenseReport3'" v-if="optionSelected.value === 5" class="mt-4"> </expense-report-three>
        <general-report :key="optionSelected.value + 'generalReport'" v-if="optionSelected.value === 6"> </general-report>
        <equipment-transaction-report :key="optionSelected.value + 'equipmentTransactionReport'" v-if="optionSelected.value === 7"> </equipment-transaction-report>
    </div>
</template>

<script>
    import SalesReport from 'renderer/api/groups/home/components/SalesReport.vue'
    import BagInventoryReport from 'renderer/api/groups/home/components/BagInventoryReport.vue'
    import ProductionEventReport from 'renderer/api/groups/home/components/ProductionEventReport.vue'
    import ProductionReport from 'renderer/api/groups/home/components/ProductionReport.vue'
    import ExpenseReportTwo from 'renderer/api/groups/home/components/ExpenseReportTwo'
    import ExpenseReportThree from 'renderer/api/groups/home/components/ExpenseReportThree'
    import GeneralReport from 'renderer/api/groups/home/components/GeneralReport'
    import EquipmentTransactionReport from 'renderer/api/groups/home/components/EquipmentTransactionReport'
    import {mapGetters} from 'vuex'
    export default {
      data () {
        return {
          optionSelected: '',
          initialOptionSelected: {},
          options: []
        }
      },
      created () {
        if (this.isSalesUser || this.isAdminUser) {
          this.options.push({value: 0, text: 'Reporte de ventas'})
          this.options.push({value: 1, text: 'Inventario de bolsas'})
        }
        if (this.isAdminUser) {
          this.options.push({value: 2, text: 'Reporte de bolseo'})
          this.options.push({value: 3, text: 'Reporte de extrusion'})
          this.options.push({value: 4, text: 'Resumen de facturas'})
          this.options.push({value: 5, text: 'Resumen general'})
          this.options.push({value: 6, text: 'Resumen de empleados'})
          this.options.push({value: 7, text: 'Equipment transaction report'})
        }
        this.initialOptionSelected = this.options[0]
      },
      computed: {
        ...mapGetters([
          'isAdminUser',
          'isProductionUser',
          'isSalesUser'
        ])
      },
      components: {
        BagInventoryReport,
        SalesReport,
        ProductionEventReport,
        ProductionReport,
        ExpenseReportTwo,
        ExpenseReportThree,
        GeneralReport,
        EquipmentTransactionReport
      },
      methods: {
      }
    }
</script>
