<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-crud-edit
      v-if="entity"
      :id="id"
      :entityType="entityType"
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback">
      <template slot-scope="params">
        <bag-order-form
          :initialObject="entity"
          :saveFunction="params.saveFunction"
          :entityType="entityType">
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
    name: 'EditOrderProduction',
    data () {
      return {
        entityType: EntityTypes.BAG_ORDER_PRODUCTION,
        hostRelationshipIdName: 'bag_order_production_id',
        entity: null
      }
    },
    props: {
      id: null
    },
    components: {
      BagOrderForm,
      MauEntityPetitioner,
      MauSpinner
    },
    methods: {
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      },
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG_ORDER_PRODUCTION, ChildTypes.LIST)})
      }
    }
  }
</script>
