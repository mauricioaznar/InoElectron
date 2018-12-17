<template>
  <div class="container">
    <div class="form-group">
      <mau-form-input-select
              :label="'Pedidos en produccion'"
              displayProperty="order_code_string"
              v-model="orderRequestEntity"
              :entityType="orderRequestEntityType"
              :searchedProperties="['order_code']"
              :filterExact="orderRequestFilterExact"
              :name="'name'"
      >
      </mau-form-input-select>
    </div>
    <mau-crud-create
      v-if="orderRequestEntity && orderRequestEntityId"
      :id="orderRequestEntityId"
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
      :entityType="orderSaleEntityType"
    >
      <template slot-scope="params">
        <bag-order-sale-form
          :key="orderRequestEntityId"
          :saveFunction="params.save"
          ref="editBlock"
          :receiptMode="true"
          :orderRequest="orderRequestEntity"
        ></bag-order-sale-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import BagOrderSaleForm from 'renderer/api/components/forms/OrderSaleForm.vue'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import OrderRequestPropertiesReference from 'renderer/api/propertiesReference/OrderRequestPropertiesReference'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateOrderSale',
    data () {
      return {
        hostRelationshipIdName: 'order_sale_id',
        orderSaleEntityType: EntityTypes.ORDER_SALE,
        orderRequestEntityType: EntityTypes.ORDER_REQUEST,
        orderRequestFilterExact: {[OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.relationship_id_name]: 2},
        orderRequestEntity: null,
        orderRequestEntityId: null
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
      orderRequestEntity: function (newOrderSaleRequestEntity) {
        this.orderRequestEntityId = newOrderSaleRequestEntity[GlobalEntityIdentifier]
      }
    }
  }
</script>
