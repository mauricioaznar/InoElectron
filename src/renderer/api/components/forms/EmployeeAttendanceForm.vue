<template>
  <div>
      <div>
          <mau-form-group-date-time
                  :name="EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.name"
                  :label="EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.title"
                  v-model="employeeAttendance.entranceDateTime"
                  :initialValue="initialValues[EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.name]"
                  :error="errors.has(EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.name) ? errors.first(EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.name) : ''"
                  :disabled="!userHasWritePrivileges"
                  v-validate="'required'"
          >
          </mau-form-group-date-time>
          <mau-form-group-date-time
                  :name="EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.name"
                  :label="EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.title"
                  v-model="employeeAttendance.exitDateTime"
                  :initialValue="initialValues[EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.name]"
                  :error="errors.has(EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.name) ? errors.first(EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.name) : ''"
                  :disabled="!userHasWritePrivileges"
          >
          </mau-form-group-date-time>
          <div class="form-group"
          >
              <mau-form-input-select
                      :initialObject="initialValues[EmployeeAttendancePropertiesReference.EMPLOYEE.name]"
                      :label="EmployeeAttendancePropertiesReference.EMPLOYEE.title"
                      :displayProperty="'full_name'"
                      v-model="employeeAttendance.employee"
                      :name="EmployeeAttendancePropertiesReference.EMPLOYEE.name"
                      :data-vv-as="EmployeeAttendancePropertiesReference.EMPLOYEE.title"
                      :error="errors.first(EmployeeAttendancePropertiesReference.EMPLOYEE.name)"
                      :entityType="employeeEntityType"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select>
          </div>
          <div class="container mb-2 text-right">
              <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
          </div>
      </div>
  </div>
</template>

<script>
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import EmployeeAttendancePropertiesReference from 'renderer/api/propertiesReference/EmployeeAttendancePropertiesReference'
  export default {
    name: 'MauSimpleOrderForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        EmployeeAttendancePropertiesReference: EmployeeAttendancePropertiesReference,
        employeeAttendance: {
          entranceDateTime: '',
          exitDateTime: '',
          employee: {}
        },
        initialValues: {},
        buttonDisabled: false,
        employeeEntityType: EntityTypes.EMPLOYEE
      }
    },
    components: {
      MauFormInputSelect
    },
    props: {
      initialObject: {
        type: Object
      },
      saveFunction: {
        type: Function,
        required: true
      }
    },
    mounted () {
      FormSubmitEventBus.onEvent(function (isSuccess) {
        if (isSuccess === false) {
          this.buttonDisabled = false
        }
      }.bind(this))
    },
    created () {
      this.setInitialValues()
    },
    computed: {
      userHasWritePrivileges: function () {
        return true
      }
    },
    methods: {
      setInitialValues: function () {
        this.initialValues[EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.name] = DefaultValuesHelper.simple(this.initialObject, EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.name)
        this.initialValues[EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.name] = DefaultValuesHelper.simple(this.initialObject, EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.name)
        this.initialValues[EmployeeAttendancePropertiesReference.EMPLOYEE.name] = DefaultValuesHelper.object(this.initialObject, EmployeeAttendancePropertiesReference.EMPLOYEE.name)
      },
      save: function () {
        let directParams = {
          [EmployeeAttendancePropertiesReference.EXIT_DATE_TIME.name]: this.employeeAttendance.exitDateTime,
          [EmployeeAttendancePropertiesReference.ENTRANCE_DATE_TIME.name]: this.employeeAttendance.entranceDateTime
        }
        directParams[EmployeeAttendancePropertiesReference.EMPLOYEE.relationship_id_name] = this.employeeAttendance.employee ? this.employeeAttendance.employee[GlobalEntityIdentifier] : null
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.buttonDisabled = true
            this.saveFunction(directParams, [])
          }
        })
      }
    },
    watch: {
      initialObject: function (initialObject) {
        this.setInitialValues(initialObject)
      }
    }
  }

</script>
