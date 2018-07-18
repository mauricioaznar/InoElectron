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
          :salesMode="true"
          :entityType="entityType"
        ></bag-order-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  import BagOrderForm from 'renderer/api/components/generic/bagOrder/BagOrderForm.vue'
  export default {
    name: 'CreateBagOrderSale',
    data () {
      return {
        hostRelationshipIdName: 'bag_order_sale_id',
        entityType: EntityTypes.BAG_ORDER_SALE
      }
    },
    components: {
      BagOrderForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG_ORDER_SALE, ChildTypes.LIST)})
      }
    }
  }
</script>
