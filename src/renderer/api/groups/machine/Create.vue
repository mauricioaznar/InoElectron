<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <machine-form :saveFunction="params.save"></machine-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import MachineForm from 'renderer/api/components/forms/MachineForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateMachine',
    data () {
      return {
        entityType: EntityTypes.MACHINE
      }
    },
    props: {
      onTheFly: {
        type: Function
      }
    },
    components: {
      MachineForm
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
