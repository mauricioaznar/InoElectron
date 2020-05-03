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
      :entityType="entityType"
      :relationshipIdName="relationshipIdName"
      :callback="callback"
    >
      <template slot-scope="params">
        <equipment-transaction-form
          :initialObject="entity"
          :saveFunction="params.saveFunction"
          :userHasWritePrivileges="true"
        >
        </equipment-transaction-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import EquipmentTransactionForm from './components/EquipmentTransactionForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import EntityActions from 'renderer/api/store/entityActions.js'
  import {mapGetters} from 'vuex'
  export default {
    name: 'EditBag',
    data () {
      return {
        entityType: EntityTypes.EQUIPMENT_TRANSACTION,
        entity: null,
        relationshipIdName: 'equipment_transaction_id'
      }
    },
    props: {
      id: null
    },
    components: {
      EquipmentTransactionForm,
      MauEntityPetitioner,
      MauSpinner
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    methods: {
      callback: function () {
        this.$store.dispatch(EntityActions.GET_PRODUCTS)
        this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
      },
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      }
    }
  }
</script>
