<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :relationshipIdName="hostRelationshipIdName"
      :entityType="entityType"
      :callback="callback">
      <template slot-scope="params">
        <bag-order-form
          :initialObject="params.entity"
          :saveFunction="params.saveFunction"
          :salesMode="true"
          :entityType="entityType"
        >
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
    name: 'EditOrderSale',
    data () {
      return {
        entityType: EntityTypes.BAG_ORDER_SALE,
        hostRelationshipIdName: 'bag_order_sale_id'
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
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG_ORDER_SALE, ChildTypes.LIST)})
      }
    }
  }
</script>
