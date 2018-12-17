<template>
  <div class="container">
    <mau-crud-create
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
      :entityType="entityType"
    >
      <template slot-scope="params">
        <order-production-form
                :extrusionMode="true"
                :saveFunction="params.save"
                :entityType="entityType"
        ></order-production-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import OrderProductionForm from 'renderer/api/components/forms/OrderProductionForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateRollOrderProduction',
    data () {
      return {
        hostRelationshipIdName: 'order_production_id',
        entityType: EntityTypes.ROLL_ORDER_PRODUCTION
      }
    },
    components: {
      OrderProductionForm
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
