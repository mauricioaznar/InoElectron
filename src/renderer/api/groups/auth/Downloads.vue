<template>
    <div class="container">
        <a class="btn-submit btn btn-excel col-md-3 col-sm-12 py-2"
           :href="excelRoute">
            <button class="">Excel</button>
        </a>
    </div>
</template>

<script>
    import SpecificApiUrls from 'renderer/api/functions/SpecificApiUrls'
    export default {
      name: 'OrderSalesDownloads',
      data () {
        return {
          excelRoute: ''
        }
      },
      created () {
        this.excelRoute = SpecificApiUrls.createExcelDownloadsUrl()
      },
      methods: {
      }
    }
</script>
