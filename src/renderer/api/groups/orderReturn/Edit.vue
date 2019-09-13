<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner
            :id="id"
            :entityType="entityType"
            @entityResult="entityResultHandler"
    >
    </mau-entity-petitioner>
    <mau-crud-edit
            v-if="entity"
            :id="id"
            :relationshipIdName="hostRelationshipIdName"
            :entityType="entityType"
            :callback="callback">
      <template slot-scope="params">
        <order-return-form
          :initialObject="entity"
          :saveFunction="params.saveFunction"
          :entityType="entityType"
          :userHasWritePrivileges="true"
        >
        </order-return-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import OrderReturnForm from 'renderer/api/components/forms/OrderReturnForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'EditOrderReturn',
    data () {
      return {
        entityType: EntityTypes.ORDER_RETURN,
        hostRelationshipIdName: 'order_return_id',
        entity: null
      }
    },
    props: {
      id: null
    },
    components: {
      OrderReturnForm,
      MauSpinner,
      MauEntityPetitioner
    },
    methods: {
      callback: function () {
        this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
      },
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      }
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    }
  }
</script>
