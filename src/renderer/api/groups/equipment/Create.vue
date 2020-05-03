<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <equipment-form :saveFunction="params.save"></equipment-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import EquipmentForm from 'renderer/api/components/forms/EquipmentForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateEquipment',
    data () {
      return {
        entityType: EntityTypes.EQUIPMENT
      }
    },
    props: {
      onTheFly: {
        type: Function
      }
    },
    components: {
      EquipmentForm
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    methods: {
      callback: function () {
        if (this.onTheFly) {
          this.onTheFly()
        } else {
          this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
        }
      }
    }
  }
</script>
