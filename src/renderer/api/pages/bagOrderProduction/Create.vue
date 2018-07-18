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
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import BagOrderForm from 'renderer/api/components/generic/bagOrder/BagOrderForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
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
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG_ORDER_PRODUCTION, ChildTypes.LIST)})
      }
    }
  }
</script>
