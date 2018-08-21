<template>
    <production-report :rollMode="true"></production-report>
</template>

<script>
  import ProductionReport from 'renderer/api/components/template/ProductionReport.vue'
  export default {
    data () {
      return {
      }
    },
    components: {
      ProductionReport
    }
  }
</script>