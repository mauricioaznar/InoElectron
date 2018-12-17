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
        <order-production-form
          :extrusionMode="true"
          :initialObject="entity"
          :saveFunction="params.saveFunction"
          :entityType="entityType"
          :userHasWritePrivileges="true"
        >
        </order-production-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import OrderProductionForm from 'renderer/api/components/forms/OrderProductionForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'EditRollOrderProduction',
    data () {
      return {
        entityType: EntityTypes.ROLL_ORDER_PRODUCTION,
        hostRelationshipIdName: 'order_production_id',
        entity: null
      }
    },
    props: {
      id: null
    },
    components: {
      OrderProductionForm,
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
