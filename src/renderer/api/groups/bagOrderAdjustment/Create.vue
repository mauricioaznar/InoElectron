<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
    >
      <template slot-scope="params">
        <bag-order-adjustment-form
                :saveFunction="params.save"
                :entityType="entityType"
        >
        </bag-order-adjustment-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import BagOrderAdjustmentForm from 'renderer/api/components/forms/BagOrderAdjustmentForm.vue'
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
      BagOrderAdjustmentForm
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
