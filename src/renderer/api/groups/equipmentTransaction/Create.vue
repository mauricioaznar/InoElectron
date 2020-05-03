<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
      :relationshipIdName="relationshipIdName"
    >
      <template slot-scope="params">
        <equipment-transaction-form :saveFunction="params.save"></equipment-transaction-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import EquipmentTransactionForm from './components/EquipmentTransactionForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateEquipmentTransaction',
    data () {
      return {
        entityType: EntityTypes.EQUIPMENT_TRANSACTION,
        relationshipIdName: 'equipment_transaction_id'
      }
    },
    components: {
      EquipmentTransactionForm
    },
    computed: {
      ...mapGetters([
        'groupDefaultRouteObject'
      ])
    },
    methods: {
      callback: function () {
        this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
      }
    }
  }
</script>
