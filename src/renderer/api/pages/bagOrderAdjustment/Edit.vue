<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :relationshipIdName="hostRelationshipIdName"
      :entityType="entityType"
      :callback="callback">
      <template slot-scope="params">
        <bag-order-form
          :adjustmentsMode="true"
          :initialObject="params.entity"
          :entityType="entityType"
          :saveFunction="params.saveFunction">
        </bag-order-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import BagOrderForm from 'renderer/api/components/generic/bagOrder/BagOrderForm.vue'
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'EditBagOrderAdjustment',
    data () {
      return {
        entityType: EntityTypes.BAG_ORDER_ADJUSTMENT,
        hostRelationshipIdName: 'bag_order_adjustment_id'
      }
    },
    props: {
      id: null
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
