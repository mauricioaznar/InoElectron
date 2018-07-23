<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-crud-edit
      v-if="entity"
      :id="id"
      :relationshipIdName="hostRelationshipIdName"
      :entityType="entityType"
      :callback="callback">
      <template slot-scope="params">
        <bag-order-form
          :adjustmentsMode="true"
          :initialObject="entity"
          :entityType="entityType"
          :saveFunction="params.saveFunction">
        </bag-order-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import BagOrderForm from 'renderer/api/components/generic/bagOrder/BagOrderForm.vue'
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  import MauEntityPetitioner from 'renderer/components/mau-components/mau-entity-petitioner/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  export default {
    name: 'EditBagOrderAdjustment',
    data () {
      return {
        entityType: EntityTypes.BAG_ORDER_ADJUSTMENT,
        entity: null,
        hostRelationshipIdName: 'bag_order_adjustment_id'
      }
    },
    props: {
      id: null
    },
    components: {
      MauSpinner,
      MauEntityPetitioner,
      BagOrderForm
    },
    methods: {
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      },
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG_ORDER_ADJUSTMENT, ChildTypes.LIST)})
      }
    }
  }
</script>
