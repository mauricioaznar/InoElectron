<template>
  <div class="container">
    <mau-crud-create
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
      :entityType="entityType"
    >
      <template slot-scope="params">
        <bag-order-form
                :saveFunction="params.save"
                :entityType="entityType"
        ></bag-order-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import BagOrderForm from 'renderer/api/components/generic/bagOrder/BagOrderForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateBagOrderProduction',
    data () {
      return {
        hostRelationshipIdName: 'bag_order_production_id',
        entityType: EntityTypes.BAG_ORDER_PRODUCTION
      }
    },
    components: {
      BagOrderForm
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    methods: {
      callback: function () {
        this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
      }
    }
  }
</script>
