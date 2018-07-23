<template>
  <div class="container">
    <mau-crud-create
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
      :entityType="entityType"
    >
      <template slot-scope="params">
        <bag-order-sale-form
          :saveFunction="params.save"
          :requestMode="true"
          :entityType="entityType"
        ></bag-order-sale-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  import BagOrderSaleForm from 'renderer/api/components/generic/bagOrderSale/BagOrderSaleForm.vue'
  import MauFormInputSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  export default {
    name: 'CreateBagOrderSaleRequest',
    data () {
      return {
        hostRelationshipIdName: 'bag_order_sale_id',
        entityType: EntityTypes.BAG_ORDER_SALE_REQUEST
      }
    },
    components: {
      BagOrderSaleForm,
      MauFormInputSelect
    },
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG_ORDER_SALE_REQUEST, ChildTypes.LIST)})
      }
    }
  }
</script>
