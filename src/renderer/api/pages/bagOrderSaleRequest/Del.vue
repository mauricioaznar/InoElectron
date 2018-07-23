<template>
    <div>
        <mau-crud-del
                :id="id"
                :entityType="entityType"
                :entity="requestedEntity"
        >
        </mau-crud-del>
    </div>
</template>

<script>
  import Entities from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'DelBagOrderSaleRequest',
    data () {
      return {
        entityType: Entities.BAG_ORDER_SALE_REQUEST
      }
    },
    components: {
    },
    props: {
      id: null
    },
    computed: {
      ...mapGetters([
        'requestedEntity'
      ])
    }
  }
</script>
