<template>
    <div>
        <div class="form-group form-row">
            <div class="col-md-6 col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[PersonaPropertiesReference.FIRST_NAME.name]"
                        v-model="persona.firstName"
                        :label="PersonaPropertiesReference.FIRST_NAME.title"
                        :name="PersonaPropertiesReference.FIRST_NAME.name"
                        :error="errors.has(PersonaPropertiesReference.FIRST_NAME.name) ? errors.first(PersonaPropertiesReference.FIRST_NAME.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
            <div class="col-md-6 col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[PersonaPropertiesReference.LAST_NAME.name]"
                        v-model="persona.lastName"
                        :label="PersonaPropertiesReference.LAST_NAME.title"
                        :name="PersonaPropertiesReference.LAST_NAME.name"
                        :error="errors.has(PersonaPropertiesReference.LAST_NAME.name) ? errors.first(PersonaPropertiesReference.LAST_NAME.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-md-6 col-sm-12" v-if="clientContactMode">
                <mau-form-input-text
                        :initialValue="initialValues[PersonaPropertiesReference.EMAIL.name]"
                        v-model="persona.email"
                        :label="PersonaPropertiesReference.EMAIL.title"
                        :name="PersonaPropertiesReference.EMAIL.name"
                        :type="'email'"
                        :error="errors.has(PersonaPropertiesReference.EMAIL.name) ? errors.first(PersonaPropertiesReference.EMAIL.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
            <div class="col-sm-12" :class="clientContactMode ? 'col-md-6' : ''">
                <mau-form-input-text
                        :initialValue="initialValues[PersonaPropertiesReference.CELLPHONE.name]"
                        v-model="persona.cellphone"
                        :label="PersonaPropertiesReference.CELLPHONE.title"
                        :name="PersonaPropertiesReference.CELLPHONE.name"
                        :type="'cellphone'"
                        :error="errors.has(PersonaPropertiesReference.CELLPHONE.name) ? errors.first(PersonaPropertiesReference.CELLPHONE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="clientContactMode ? 'required' : ''"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group">
            <div v-if="clientContactMode">
                <mau-form-input-select-dynamic
                        :initialObject="initialValues[ClientContactPropertiesReference.CLIENT.name]"
                        :label="ClientContactPropertiesReference.CLIENT.title"
                        :displayProperty="'name'"
                        :endpointName="clientEndpointName"
                        v-model="persona.client"
                        :name="ClientContactPropertiesReference.CLIENT.name"
                        :error="errors.first(ClientContactPropertiesReference.CLIENT.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group">
            <div v-if="employeeMode">
                <mau-form-input-select-dynamic
                        :initialObject="initialValues[EmployeePropertiesReference.EMPLOYEE_TYPE.name]"
                        :label="EmployeePropertiesReference.EMPLOYEE_TYPE.title"
                        :displayProperty="'name'"
                        :endpointName="employeeTypeEndpointName"
                        v-model="persona.employeeType"
                        :name="EmployeePropertiesReference.EMPLOYEE_TYPE.name"
                        :error="errors.has(EmployeePropertiesReference.EMPLOYEE_TYPE.name) ? errors.first(EmployeePropertiesReference.EMPLOYEE_TYPE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group">
           <div v-if="employeeMode">
               <mau-form-input-number
                       :initialValue="initialValues[EmployeePropertiesReference.INFONAVIT.name]"
                       :label="EmployeePropertiesReference.INFONAVIT.title"
                       v-model="persona.infonavit"
                       :name="EmployeePropertiesReference.INFONAVIT.name"
                       :error="errors.has(EmployeePropertiesReference.INFONAVIT.name) ? errors.first(EmployeePropertiesReference.INFONAVIT.name) : ''"
                       :type="'float'"
                       v-validate="'required'"
               >
               </mau-form-input-number>
           </div>
        </div>
        <div class="form-group">
            <div v-if="employeeMode">
                <mau-form-input-select-dynamic
                        :initialObject="initialValues[EmployeePropertiesReference.EMPLOYEE_STATUS.name]"
                        :label="EmployeePropertiesReference.EMPLOYEE_STATUS.title"
                        :displayProperty="'name'"
                        :endpointName="employeeStatusEndpointName"
                        v-model="persona.employeeStatus"
                        :name="EmployeePropertiesReference.EMPLOYEE_STATUS.name"
                        :error="errors.has(EmployeePropertiesReference.EMPLOYEE_STATUS.name) ? errors.first(EmployeePropertiesReference.EMPLOYEE_STATUS.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group">
            <div v-if="employeeMode">
                <mau-form-input-select-dynamic
                        :initialObject="initialValues[EmployeePropertiesReference.PAYROLL_PAYMENT_TYPE.name]"
                        :label="EmployeePropertiesReference.PAYROLL_PAYMENT_TYPE.title"
                        :displayProperty="'name'"
                        :endpointName="payrollPaymentTypeEndpointName"
                        v-model="persona.payrollPaymentType"
                        :name="EmployeePropertiesReference.PAYROLL_PAYMENT_TYPE.name"
                        :error="errors.has(EmployeePropertiesReference.PAYROLL_PAYMENT_TYPE.name) ? errors.first(EmployeePropertiesReference.PAYROLL_PAYMENT_TYPE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="container mb-2 text-right">
            <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
        </div>
    </div>
</template>

<script>
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import PersonaPropertiesReference from 'renderer/api/propertiesReference/PersonaPropertiesReference'
  import ClientContactPropertiesReference from 'renderer/api/propertiesReference/ClientContactPropertiesReference'
  import EmployeePropertiesReference from 'renderer/api/propertiesReference/EmployeePropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import {mapGetters} from 'vuex'
  import EntityTypes from 'renderer/api/EntityTypes'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'MauPersonaForm',
    data () {
      return {
        PersonaPropertiesReference: PersonaPropertiesReference,
        ClientContactPropertiesReference: ClientContactPropertiesReference,
        EmployeePropertiesReference: EmployeePropertiesReference,
        persona: {
          lastName: '',
          firstName: '',
          email: '',
          cellphone: '',
          infonavit: '',
          client: {},
          employeeType: {},
          employeeStatus: {},
          payrollPaymentType: {}
        },
        initialValues: {},
        buttonDisabled: false,
        clientEndpointName: EntityTypes.CLIENT.apiName,
        employeeTypeEndpointName: EntityTypes.EMPLOYEE_TYPE.apiName,
        employeeStatusEndpointName: EntityTypes.EMPLOYEE_STATUS.apiName,
        payrollPaymentTypeEndpointName: EntityTypes.PAYROLL_PAYMENT_TYPE.apiName
      }
    },
    components: {
      MauFormInputSelectDynamic
    },
    props: {
      initialObject: {
        type: Object
      },
      saveFunction: {
        type: Function,
        required: true
      },
      clientContactMode: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      employeeMode: {
        type: Boolean,
        default: function () {
          return false
        }
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
      ...mapGetters([
        'isAdminUser'
      ]),
      userHasWritePrivileges: function () {
        return true
      }
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      setInitialValues: function () {
        this.initialValues[PersonaPropertiesReference.FIRST_NAME.name] = DefaultValuesHelper.simple(this.initialObject, PersonaPropertiesReference.FIRST_NAME.name)
        this.initialValues[PersonaPropertiesReference.LAST_NAME.name] = DefaultValuesHelper.simple(this.initialObject, PersonaPropertiesReference.LAST_NAME.name)
        this.initialValues[PersonaPropertiesReference.CELLPHONE.name] = DefaultValuesHelper.simple(this.initialObject, PersonaPropertiesReference.CELLPHONE.name)
        if (this.clientContactMode) {
          this.initialValues[PersonaPropertiesReference.EMAIL.name] = DefaultValuesHelper.simple(this.initialObject, PersonaPropertiesReference.EMAIL.name)
          this.initialValues[ClientContactPropertiesReference.CLIENT.name] = DefaultValuesHelper.object(this.initialObject, ClientContactPropertiesReference.CLIENT.name)
        }
        if (this.employeeMode) {
          this.initialValues[EmployeePropertiesReference.INFONAVIT.name] = DefaultValuesHelper.simple(this.initialObject, EmployeePropertiesReference.INFONAVIT.name)
          this.initialValues[EmployeePropertiesReference.PAYROLL_PAYMENT_TYPE.name] = DefaultValuesHelper.simple(this.initialObject, EmployeePropertiesReference.PAYROLL_PAYMENT_TYPE.name)
          this.initialValues[EmployeePropertiesReference.EMPLOYEE_TYPE.name] = DefaultValuesHelper.object(this.initialObject, EmployeePropertiesReference.EMPLOYEE_TYPE.name)
          this.initialValues[EmployeePropertiesReference.EMPLOYEE_STATUS.name] = DefaultValuesHelper.object(this.initialObject, EmployeePropertiesReference.EMPLOYEE_STATUS.name)
        }
      },
      save: function () {
        let directParams = {
          [PersonaPropertiesReference.FIRST_NAME.name]: this.persona.firstName,
          [PersonaPropertiesReference.LAST_NAME.name]: this.persona.lastName,
          [PersonaPropertiesReference.CELLPHONE.name]: this.persona.cellphone ? this.persona.cellphone.replace(/\D+/g, '') : ''
        }
        if (this.clientContactMode) {
          directParams[ClientContactPropertiesReference.CLIENT.relationship_id_name] = this.persona.client ? this.persona.client[GlobalEntityIdentifier] : null
          directParams[ClientContactPropertiesReference.EMAIL.name] = this.persona.email
        }
        if (this.employeeMode) {
          directParams[EmployeePropertiesReference.EMPLOYEE_TYPE.relationship_id_name] = this.persona.employeeType ? this.persona.employeeType[GlobalEntityIdentifier] : null
          directParams[EmployeePropertiesReference.INFONAVIT.relationship_id_name] = this.persona.infonavit
          directParams[EmployeePropertiesReference.EMPLOYEE_STATUS.relationship_id_name] = this.persona.employeeStatus ? this.persona.employeeStatus[GlobalEntityIdentifier] : null
          directParams[EmployeePropertiesReference.PAYROLL_PAYMENT_TYPE.relationship_id_name] = this.persona.payrollPaymentType ? this.persona.payrollPaymentType[GlobalEntityIdentifier] : null
        }
        let indirectParams = {
        }
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.buttonDisabled = true
            this.saveFunction(directParams, indirectParams)
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
