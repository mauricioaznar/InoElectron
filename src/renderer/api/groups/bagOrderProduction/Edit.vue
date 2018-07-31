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
        <bag-order-production-form
          :initialObject="entity"
          :saveFunction="params.saveFunction"
          :entityType="entityType">
        </bag-order-production-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import BagOrderProductionForm from 'renderer/api/components/forms/BagOrderProductionForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import {mapGetters} from 'vuex'
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
      BagOrderProductionForm,
      MauEntityPetitioner,
      MauSpinner
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
