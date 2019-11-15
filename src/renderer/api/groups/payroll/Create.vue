<template>
  <div class="container">
    <mau-crud-create
      :entityType="entityType"
      :callback="callback"
      :relationshipIdName="'payroll_id'"
    >
      <template slot-scope="params">
        <payroll-form :saveFunction="params.save"></payroll-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import PayrollForm from 'renderer/api/components/forms/PayrollForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreatePayroll',
    data () {
      return {
        entityType: EntityTypes.PAYROLL
      }
    },
    props: {
      onTheFly: {
        type: Function
      }
    },
    components: {
      PayrollForm
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
