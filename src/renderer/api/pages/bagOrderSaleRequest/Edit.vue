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
  import BagOrderSaleForm from 'renderer/api/components/generic/bagOrderSale/BagOrderSaleForm.vue'
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/components/mau-components/mau-entity-petitioner/MauEntityPetitioner.vue'
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
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG_ORDER_SALE_REQUEST, ChildTypes.LIST)})
      },
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      }
    },
    computed: {

    }
  }
</script>
