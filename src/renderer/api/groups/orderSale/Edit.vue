<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner
            :id="id"
            :entityType="orderSaleEntityType"
            @entityResult="orderSaleHandler"
    >
    </mau-entity-petitioner>
    <mau-entity-petitioner
            :key="orderRequestId"
            v-if="orderRequestId !== null"
            :id="orderRequestId"
            :entityType="orderRequestEntityType"
            @entityResult="orderRequestHandler"
    >
    </mau-entity-petitioner>
    <mau-crud-edit
      v-if="entity && orderRequest"
      :id="id"
      :relationshipIdName="hostRelationshipIdName"
      :entityType="orderSaleEntityType"
      :callback="callback">
      <template slot-scope="params">
        <order-sale-form
          :initialObject="entity"
          :saveFunction="params.saveFunction"
          :receiptMode="true"
          :orderRequest="orderRequest"
          :userHasWritePrivileges="true"
        >
        </order-sale-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import OrderSaleForm from 'renderer/api/components/forms/OrderSaleForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'EditOrderSale',
    data () {
      return {
        orderSaleEntityType: EntityTypes.ORDER_SALE,
        orderRequestEntityType: EntityTypes.ORDER_REQUEST,
        orderRequestId: 0,
        hostRelationshipIdName: 'order_sale_id',
        entity: null,
        orderRequest: null
      }
    },
    props: {
      id: null
    },
    components: {
      OrderSaleForm,
      MauEntityPetitioner,
      MauSpinner
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    methods: {
      callback: function () {
        this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
      },
      orderSaleHandler: function (entityObj) {
        this.orderRequestId = entityObj.order_request_id
        this.orderRequest = null
        this.entity = entityObj
      },
      orderRequestHandler: function (entityObj) {
        let orderSales = [...entityObj.order_sales]
          .filter(orderSale => {
            return orderSale.id !== Number(this.id)
          })
        this.orderRequest = {
          ...entityObj,
          order_sales: orderSales
        }
      }
    }
  }
</script>
