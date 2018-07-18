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
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
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
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG_ORDER_ADJUSTMENT, ChildTypes.LIST)})
      }
    }
  }
</script>
