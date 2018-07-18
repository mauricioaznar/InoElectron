<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityType="entityType"
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback">
      <template slot-scope="params">
        <bag-order-form
          :initialObject="params.entity"
          :saveFunction="params.saveFunction"
          :entityType="entityType">
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
    name: 'EditOrderProduction',
    data () {
      return {
        entityType: EntityTypes.BAG_ORDER_PRODUCTION,
        hostRelationshipIdName: 'bag_order_production_id'
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
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG_ORDER_PRODUCTION, ChildTypes.LIST)})
      }
    }
  }
</script>
