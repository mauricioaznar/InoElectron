<template>
    <div class="container">
        <a class="btn-submit btn btn-excel col-md-3 col-sm-12 py-2"
           :href="excelRoute">
            <button class="">Excel</button>
        </a>
    </div>
</template>

<script>
    import {getApiRoute, ApiRouteTypes} from 'renderer/api/ApiUrls'
    import EntityTypes from 'renderer/api/EntityTypes'
    export default {
      name: 'OrderSalesDownloads',
      data () {
        return {
          excelRoute: ''
        }
      },
      created () {
        this.excelRoute = getApiRoute(EntityTypes.AUTH, ApiRouteTypes.DOWNLOADS)
      }
    }
</script>