<template>
  <div class="container">
    <mau-crud-create
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
      :entityType="entityType"
    >
      <template slot-scope="params">
        <order-request-form
          :saveFunction="params.save"
          :entityType="entityType"
        ></order-request-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import OrderRequestForm from 'renderer/api/components/forms/OrderRequestForm.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateOrderRequest',
    data () {
      return {
        hostRelationshipIdName: 'order_request_id',
        entityType: EntityTypes.ORDER_REQUEST
      }
    },
    components: {
      OrderRequestForm
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
