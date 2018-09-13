<template>
    <product-report :bagMode="true"></product-report>
</template>

<script>
  import ProductReport from 'renderer/api/components/report/ProductReport.vue'
  export default {
    data () {
      return {

      }
    },
    components: {
      ProductReport
    }
  }
</script>