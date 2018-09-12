<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner
            :id="id"
            :entityType="orderSaleEntityType"
            @entityResult="entityResultHandler"
    >
    </mau-entity-petitioner>
    <mau-crud-edit
      v-if="entity"
      :id="id"
      :relationshipIdName="hostRelationshipIdName"
      :entityType="orderSaleEntityType"
      :callback="callback">
      <template slot-scope="params">
        <order-sale-form
          :initialObject="entity"
          :saveFunction="params.saveFunction"
          :receiptMode="true"
          :orderRequest="entity.order_request"
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
        hostRelationshipIdName: 'order_sale_id',
        entity: null
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
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      }
    }
  }
</script>
