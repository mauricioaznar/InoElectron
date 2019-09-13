<template>
  <div class="container">
    <mau-crud-create
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
      :entityType="entityType"
    >
      <template slot-scope="params">
        <order-return-form
          :saveFunction="params.save"
          :entityType="entityType"
        ></order-return-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import OrderReturnForm from 'renderer/api/components/forms/OrderReturnForm.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateOrderReturn',
    data () {
      return {
        hostRelationshipIdName: 'order_return_id',
        entityType: EntityTypes.ORDER_RETURN
      }
    },
    components: {
      OrderReturnForm
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
