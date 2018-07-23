<template>
  <div class="container">
    <div class="form-group">
      <mau-form-input-select
              :label="'Pedidos pendientes'"
              displayProperty="order_code_string"
              v-model="orderSaleRequestEntity"
              :entityType="bagOrderSaleRequestEntityType"
              :searchedProperty="'order_code'"
              :filterExact="filterExact"
              :name="'name'"
      >
      </mau-form-input-select>
    </div>
    <mau-crud-edit
      v-if="orderSaleRequestEntity && orderSaleRequestEntityId"
      :id="orderSaleRequestEntityId"
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
      :entityType="entityType"
    >
      <template slot-scope="params">
        <bag-order-sale-form
          ref="editBlock"
          :saveFunction="params.saveFunction"
          :receiptMode="true"
          :initialObject="orderSaleRequestEntity"
          :entityType="entityType"
        ></bag-order-sale-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import Vue from 'vue'
  import ChildTypes from 'renderer/api/ChildTypes'
  import BagOrderSaleForm from 'renderer/api/components/generic/bagOrderSale/BagOrderSaleForm.vue'
  import MauFormInputSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  import BagOrderSaleReceiptPropertiesReference from 'renderer/api/propertiesReference/BagOrderSaleReceiptPropertiesReference'
  export default {
    name: 'CreateBagOrderSaleReceipt',
    data () {
      return {
        hostRelationshipIdName: 'bag_order_sale_id',
        entityType: EntityTypes.BAG_ORDER_SALE_RECEIPT,
        bagOrderSaleRequestEntityType: EntityTypes.BAG_ORDER_SALE_REQUEST,
        orderSaleRequestEntity: null,
        orderSaleRequestEntityId: null,
        filterExact: {[BagOrderSaleReceiptPropertiesReference.ORDER_STATUS_TYPE.relationship_id_name]: 1}
      }
    },
    components: {
      BagOrderSaleForm,
      MauFormInputSelect
    },
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG_ORDER_SALE_RECEIPT, ChildTypes.LIST)})
      }
    },
    watch: {
      orderSaleRequestEntity: function (newOrderSaleRequestEntity) {
        this.orderSaleRequestEntityId = newOrderSaleRequestEntity[GlobalEntityIdentifier]
        Vue.nextTick(() => {
          this.$refs.editBlock.$forceUpdate()
        })
      }
    }
  }
</script>
