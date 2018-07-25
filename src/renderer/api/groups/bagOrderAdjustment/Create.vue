<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
    >
      <template slot-scope="params">
        <bag-order-form
                :saveFunction="params.save"
                :adjustmentsMode="true"
                :entityType="entityType"
        >
        </bag-order-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import BagOrderForm from 'renderer/api/components/generic/bagOrder/BagOrderForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateBagOrderAdjustment',
    data () {
      return {
        hostRelationshipIdName: 'bag_order_adjustment_id',
        entityType: EntityTypes.BAG_ORDER_ADJUSTMENT
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
