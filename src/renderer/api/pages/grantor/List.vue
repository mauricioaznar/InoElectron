<template>
  <div>
    <mau-crud-list :entityName="'Grantor'">
      <grantor-list :apiUrl="apiUrl" :canEdit="canEdit"></grantor-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import GrantorList from './components/GrantorList.vue'
  import {ApiRoutes} from 'renderer/api/ApiUrls'
  export default {
    name: 'ListGrantor',
    data () {
      return {
        apiUrl: ApiRoutes.grantor.list,
        canEdit: true
      }
    },
    components: {
      GrantorList
    }
  }
</script>
