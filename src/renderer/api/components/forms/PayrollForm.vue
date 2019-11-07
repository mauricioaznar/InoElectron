1<template>
  <div>
      <div>
          <mau-form-group-date-time
                  :name="PayrollPropertiesReference.START_DATE_TIME.name"
                  :label="'de inicio'"
                  v-model="payroll.startDateTime"
                  :initialValue="initialValues[PayrollPropertiesReference.START_DATE_TIME.name]"
                  :error="errors.has(PayrollPropertiesReference.START_DATE_TIME.name) ? errors.first(PayrollPropertiesReference.START_DATE_TIME.name) : ''"
                  :disabled="!userHasWritePrivileges"
                  v-validate="'required'"
          >
          </mau-form-group-date-time>
          <mau-form-group-date-time
                  :name="PayrollPropertiesReference.END_DATE_TIME.name"
                  :label="'de fin'"
                  v-model="payroll.endDateTime"
                  :initialValue="initialValues[PayrollPropertiesReference.END_DATE_TIME.name]"
                  :error="errors.has(PayrollPropertiesReference.END_DATE_TIME.name) ? errors.first(PayrollPropertiesReference.END_DATE_TIME.name) : ''"
                  :disabled="!userHasWritePrivileges"
                  v-validate="'required|date_format:yyyy-MM-dd HH:mm:ss|after:' + payroll.startDateTime"
          >
          </mau-form-group-date-time>
          <payroll-employees
            :initialValues="initialValues[PayrollPropertiesReference.PAYROLL_EMPLOYEES.name]"
            v-model="payroll.payrollEmployees"
          >

          </payroll-employees>
          <div class="container mb-2 text-right">
              <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
          </div>
      </div>
  </div>
</template>

<script>
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import PayrollPropertiesReference from 'renderer/api/propertiesReference/PayrollPropertiesReference'
  import PayrollEmployees from 'renderer/api/components/m2m/PayrollEmployees'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'PayrollForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        PayrollPropertiesReference: PayrollPropertiesReference,
        payroll: {
          startDateTime: '',
          endDateTime: '',
          payrollEmployees: []
        },
        initialValues: {},
        buttonDisabled: false
      }
    },
    components: {
      MauFormInputSelectDynamic,
      PayrollEmployees
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
        this.initialValues[PayrollPropertiesReference.START_DATE_TIME.name] = DefaultValuesHelper.simple(this.initialObject, PayrollPropertiesReference.START_DATE_TIME.name)
        this.initialValues[PayrollPropertiesReference.END_DATE_TIME.name] = DefaultValuesHelper.simple(this.initialObject, PayrollPropertiesReference.END_DATE_TIME.name)
        this.initialValues[PayrollPropertiesReference.PAYROLL_EMPLOYEES.name] = DefaultValuesHelper.array(this.initialObject, PayrollPropertiesReference.PAYROLL_EMPLOYEES.name)
      },
      save: function () {
        let directParams = {
          [PayrollPropertiesReference.START_DATE_TIME.name]: this.payroll.startDateTime,
          [PayrollPropertiesReference.END_DATE_TIME.name]: this.payroll.endDateTime
        }
        let relayObjects = []
        let expenseItemsM2mFilteredObject = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
          this.initialValues[PayrollPropertiesReference.PAYROLL_EMPLOYEES.name],
          this.payroll.payrollEmployees,
          'id'
        )
        let payrollEmployeesRelayObjects = ManyToManyHelper.createRelayObject(expenseItemsM2mFilteredObject, EntityTypes.PAYROLL_EMPLOYEES)
        relayObjects.push(payrollEmployeesRelayObjects)
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.buttonDisabled = true
            this.saveFunction(directParams, relayObjects)
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
