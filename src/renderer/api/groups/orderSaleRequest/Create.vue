<template>
  <div class="container">
    <mau-crud-create
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
      :entityType="entityType"
    >
      <template slot-scope="params">
        <order-sale-form
          :saveFunction="params.save"
          :requestMode="true"
          :entityType="entityType"
        ></order-sale-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import OrderSaleForm from 'renderer/api/components/forms/OrderSaleForm.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateOrderSaleRequest',
    data () {
      return {
        hostRelationshipIdName: 'order_sale_id',
        entityType: EntityTypes.ORDER_SALE_REQUEST
      }
    },
    components: {
      OrderSaleForm
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    methods: {
      callback: function () {
        this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
      }
    }
  }
</script>
