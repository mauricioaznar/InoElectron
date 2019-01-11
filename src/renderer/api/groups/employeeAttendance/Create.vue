<template>
  <div class="container">
    <mau-crud-create
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
      :entityType="entityType"
    >
      <template slot-scope="params">
        <employee-attendance-form
                :saveFunction="params.save"
                :entityType="entityType"
        ></employee-attendance-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  import EmployeeAttendanceForm from 'renderer/api/components/forms/EmployeeAttendanceForm.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateEmployeeAttendance',
    data () {
      return {
        hostRelationshipIdName: 'employee_attendance_id',
        entityType: EntityTypes.EMPLOYEE_ATTENDANCE
      }
    },
    components: {
      EmployeeAttendanceForm
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
