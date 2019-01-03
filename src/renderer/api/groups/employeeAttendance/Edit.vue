<template>
  <div class="container">
    <mau-spinner v-if="!entity" :sizeType="'router'"></mau-spinner>
    <mau-entity-petitioner :id="id" :entityType="entityType" @entityResult="entityResultHandler"></mau-entity-petitioner>
    <mau-crud-edit
      v-if="entity"
      :id="id"
      :entityType="entityType"
      :callback="callback">
      <template slot-scope="params">
        <employee-attendance-form
          :initialObject="entity"
          :saveFunction="params.saveFunction"
          :entityType="entityType"
          :userHasWritePrivileges="true"
        >
        </employee-attendance-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import EmployeeAttendanceForm from 'renderer/api/components/forms/EmployeeAttendanceForm.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauEntityPetitioner from 'renderer/api/components/crud/MauEntityPetitioner.vue'
  import MauSpinner from 'renderer/components/mau-components/mau-spinner/MauSpinner.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'EditEmployeeAttendance',
    data () {
      return {
        entityType: EntityTypes.EMPLOYEE_ATTENDANCE,
        entity: null
      }
    },
    props: {
      id: null
    },
    components: {
      EmployeeAttendanceForm,
      MauEntityPetitioner,
      MauSpinner
    },
    computed: {
      ...mapGetters(['groupDefaultRouteObject'])
    },
    methods: {
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      },
      callback: function () {
        this.$router.push({path: this.groupDefaultRouteObject(this.$route).path})
      }
    }
  }
</script>
