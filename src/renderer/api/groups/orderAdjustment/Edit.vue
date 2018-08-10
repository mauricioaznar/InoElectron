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
        <order-adjustment-form
          :initialObject="entity"
          :entityType="entityType"
          :saveFunction="params.saveFunction">
        </order-adjustment-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import OrderAdjustmentForm from 'renderer/api/components/forms/OrderAdjustmentForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'EditBagOrderAdjustment',
    data () {
      return {
        entityType: EntityTypes.ORDER_ADJUSTMENT,
        entity: null,
        hostRelationshipIdName: 'order_adjustment_id'
      }
    },
    props: {
      id: null
    },
    components: {
      MauSpinner,
      MauEntityPetitioner,
      OrderAdjustmentForm
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
