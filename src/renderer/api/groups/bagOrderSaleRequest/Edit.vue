<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner
            :id="id"
            :entityType="entityType"
            @entityResult="entityResultHandler"
    >
    </mau-entity-petitioner>
    <mau-crud-edit
            v-if="entity"
            :id="id"
            :relationshipIdName="hostRelationshipIdName"
            :entityType="entityType"
            :callback="callback">
      <template slot-scope="params">
        <bag-order-sale-form
          :initialObject="entity"
          :saveFunction="params.saveFunction"
          :requestMode="true"
          :entityType="entityType"
        >
        </bag-order-sale-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import BagOrderSaleForm from 'renderer/api/components/forms/BagOrderSaleForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'EditOrderSaleRequest',
    data () {
      return {
        entityType: EntityTypes.BAG_ORDER_SALE_REQUEST,
        hostRelationshipIdName: 'bag_order_sale_id',
        entity: null
      }
    },
    props: {
      id: null
    },
    components: {
      BagOrderSaleForm,
      MauSpinner,
      MauEntityPetitioner
    },
    methods: {
      callback: function () {
        this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
      },
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      }
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    }
  }
</script>
