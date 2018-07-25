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
  import EntityTypes from 'renderer/api/EntityTypes'
  import BagOrderSaleForm from 'renderer/api/components/generic/bagOrderSale/BagOrderSaleForm.vue'
  import MauFormInputSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  import {mapGetters} from 'vuex'
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
