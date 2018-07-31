<template>
  <div class="container">
    <mau-crud-create
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
      :entityType="entityType"
    >
      <template slot-scope="params">
        <bag-order-production-form
                :saveFunction="params.save"
                :entityType="entityType"
        ></bag-order-production-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import BagOrderProductionForm from 'renderer/api/components/forms/BagOrderProductionForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateBagOrderProduction',
    data () {
      return {
        hostRelationshipIdName: 'bag_order_production_id',
        entityType: EntityTypes.BAG_ORDER_PRODUCTION
      }
    },
    components: {
      BagOrderProductionForm
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
