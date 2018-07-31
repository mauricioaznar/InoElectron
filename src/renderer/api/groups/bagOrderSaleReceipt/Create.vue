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
  import EntityTypes from 'renderer/api/EntityTypes'
  import Vue from 'vue'
  import BagOrderSaleForm from 'renderer/api/components/forms/BagOrderSaleForm.vue'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import BagOrderSaleRequestPropertiesReference from 'renderer/api/propertiesReference/BagOrderSaleRequestPropertiesReference'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateBagOrderSaleReceipt',
    data () {
      return {
        hostRelationshipIdName: 'bag_order_sale_id',
        entityType: EntityTypes.BAG_ORDER_SALE_RECEIPT,
        bagOrderSaleRequestEntityType: EntityTypes.BAG_ORDER_SALE_REQUEST,
        orderSaleRequestEntity: null,
        orderSaleRequestEntityId: null,
        filterExact: {[BagOrderSaleRequestPropertiesReference.ORDER_STATUS.relationship_id_name]: 1}
      }
    },
    components: {
      BagOrderSaleForm,
      MauFormInputSelect
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    methods: {
      callback: function () {
        this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
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
