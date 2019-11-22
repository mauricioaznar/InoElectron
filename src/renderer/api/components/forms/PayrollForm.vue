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
          <div class="form-row">
              <div class="form-group col-sm-12">
                  <mau-form-input-number
                          :label="PayrollPropertiesReference.CREDIT_USED.title"
                          :name="PayrollPropertiesReference.CREDIT_USED.name"
                          :initialValue="initialValues[PayrollPropertiesReference.CREDIT_USED.name]"
                          v-model="payroll.creditUsed"
                          :error="errors.has(PayrollPropertiesReference.CREDIT_USED.name) ? errors.first(PayrollPropertiesReference.CREDIT_USED.name) : ''"
                          :disabled="!userHasWritePrivileges"
                          v-validate="'required'"
                          :type="'float'"
                  >
                  </mau-form-input-number>
              </div>
          </div>
          <div class="form-row">
              <div class="form-group col-sm-12">
                  <mau-form-input-number
                          :label="PayrollPropertiesReference.INFONAVIT_USED.title"
                          :name="PayrollPropertiesReference.INFONAVIT_USED.name"
                          :initialValue="initialValues[PayrollPropertiesReference.INFONAVIT_USED.name]"
                          v-model="payroll.infonavitUsed"
                          :error="errors.has(PayrollPropertiesReference.INFONAVIT_USED.name) ? errors.first(PayrollPropertiesReference.INFONAVIT_USED.name) : ''"
                          :disabled="!userHasWritePrivileges"
                          v-validate="'required'"
                          :type="'float'"
                  >
                  </mau-form-input-number>
              </div>
          </div>
          <div class="form-row">
              <div class="form-group col-sm-12">
                  <mau-form-input-select-dynamic
                          :initialObject="initialValues[PayrollPropertiesReference.PAYROLL_TYPE.name]"
                          :label="PayrollPropertiesReference.PAYROLL_TYPE.title"
                          v-model="payroll.payrollType"
                          :name="PayrollPropertiesReference.PAYROLL_TYPE.name"
                          :displayProperty="'name'"
                          :error="errors.has(PayrollPropertiesReference.PAYROLL_TYPE.name) ? errors.first(PayrollPropertiesReference.PAYROLL_TYPE.name) : ''"
                          :disabled="!userHasWritePrivileges"
                          :endpointName="payrollTypeEndpointName"
                          v-validate="'required'"
                  >
                  </mau-form-input-select-dynamic>
              </div>
          </div>
          <payroll-payments
            :initialValues="initialValues[PayrollPropertiesReference.PAYROLL_PAYMENTS.name]"
            v-model="payroll.payrollPayments"
            :creditUsed="payroll.creditUsed > 0 ? payroll.creditUsed : 0"
            :infonavitUsed="payroll.infonavitUsed > 0 ? payroll.infonavitUsed : 0"
          >

          </payroll-payments>
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
  import PayrollPayments from 'renderer/api/components/m2m/PayrollPayments'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'PayrollForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        PayrollPropertiesReference: PayrollPropertiesReference,
        payroll: {
          startDateTime: '',
          endDateTime: '',
          payrollType: '',
          payrollPayments: [],
          creditUsed: '',
          infonavitUsed: ''
        },
        initialValues: {},
        payrollTypeEndpointName: EntityTypes.PAYROLL_TYPE.apiName,
        buttonDisabled: false
      }
    },
    components: {
      MauFormInputSelectDynamic,
      PayrollPayments
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
      },
      isInitialObjectDefined: function () {
        return this.initialObject && this.initialObject.id
      }
    },
    methods: {
      setInitialValues: function () {
        this.initialValues[PayrollPropertiesReference.START_DATE_TIME.name] = DefaultValuesHelper.simple(this.initialObject, PayrollPropertiesReference.START_DATE_TIME.name)
        this.initialValues[PayrollPropertiesReference.END_DATE_TIME.name] = DefaultValuesHelper.simple(this.initialObject, PayrollPropertiesReference.END_DATE_TIME.name)
        this.initialValues[PayrollPropertiesReference.PAYROLL_PAYMENTS.name] = DefaultValuesHelper.array(this.initialObject, PayrollPropertiesReference.PAYROLL_PAYMENTS.name)
        this.initialValues[PayrollPropertiesReference.CREDIT_USED.name] = DefaultValuesHelper.simple(this.initialObject, PayrollPropertiesReference.CREDIT_USED.name)
        this.initialValues[PayrollPropertiesReference.INFONAVIT_USED.name] = DefaultValuesHelper.simple(this.initialObject, PayrollPropertiesReference.INFONAVIT_USED.name)
        this.initialValues[PayrollPropertiesReference.PAYROLL_TYPE.name] = DefaultValuesHelper.object(this.initialObject, PayrollPropertiesReference.PAYROLL_TYPE.name)
      },
      save: function () {
        let directParams = {
          [PayrollPropertiesReference.START_DATE_TIME.name]: this.payroll.startDateTime,
          [PayrollPropertiesReference.END_DATE_TIME.name]: this.payroll.endDateTime,
          [PayrollPropertiesReference.CREDIT_USED.name]: this.payroll.creditUsed,
          [PayrollPropertiesReference.INFONAVIT_USED.name]: this.payroll.infonavitUsed,
          [PayrollPropertiesReference.PAYROLL_TYPE.relationship_id_name]: this.payroll.payrollType ? this.payroll.payrollType[GlobalEntityIdentifier] : (this.isInitialObjectDefined ? 'null' : null)
        }
        let relayObjects = []
        let expenseItemsM2mFilteredObject = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
          this.initialValues[PayrollPropertiesReference.PAYROLL_PAYMENTS.name],
          this.payroll.payrollPayments,
          'id'
        )
        let payrollPaymentsRelayObjects = ManyToManyHelper.createRelayObject(expenseItemsM2mFilteredObject, EntityTypes.PAYROLL_PAYMENT)
        relayObjects.push(payrollPaymentsRelayObjects)
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
