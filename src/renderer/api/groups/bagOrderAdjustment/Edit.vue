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
        <bag-order-adjustment-form
          :initialObject="entity"
          :entityType="entityType"
          :saveFunction="params.saveFunction">
        </bag-order-adjustment-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import BagOrderAdjustmentForm from 'renderer/api/components/forms/BagOrderAdjustmentForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import {mapGetters} from 'vuex'
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
      BagOrderAdjustmentForm
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    methods: {
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      },
      callback: function () {
        this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
      }
    }
  }
</script>
