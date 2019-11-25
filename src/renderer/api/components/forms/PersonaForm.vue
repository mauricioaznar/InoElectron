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
                        v-validate="'required'"
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
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
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
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group">
            <div v-if="employeeMode">
                <mau-form-input-select-dynamic
                        :initialObject="initialValues[EmployeePropertiesReference.BRANCH.name]"
                        :label="EmployeePropertiesReference.BRANCH.title"
                        :displayProperty="'name'"
                        :endpointName="branchEndpointName"
                        v-model="persona.branch"
                        :name="EmployeePropertiesReference.BRANCH.name"
                        :error="errors.has(EmployeePropertiesReference.BRANCH.name) ? errors.first(EmployeePropertiesReference.BRANCH.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="form-group">
            <div v-if="employeeMode">
                <mau-form-input-number
                        :initialValue="initialValues[EmployeePropertiesReference.HOURS_SHOULD_WORK.name]"
                        :label="EmployeePropertiesReference.HOURS_SHOULD_WORK.title"
                        v-model="persona.hoursShouldWork"
                        :name="EmployeePropertiesReference.HOURS_SHOULD_WORK.name"
                        :error="errors.has(EmployeePropertiesReference.HOURS_SHOULD_WORK.name) ? errors.first(EmployeePropertiesReference.HOURS_SHOULD_WORK.name) : ''"
                        :type="'float'"
                        v-validate="'required'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group">
            <div v-if="employeeMode">
                <mau-form-input-number
                        :initialValue="initialValues[EmployeePropertiesReference.BASE_SALARY.name]"
                        :label="EmployeePropertiesReference.BASE_SALARY.title"
                        v-model="persona.baseSalary"
                        :name="EmployeePropertiesReference.BASE_SALARY.name"
                        :error="errors.has(EmployeePropertiesReference.BASE_SALARY.name) ? errors.first(EmployeePropertiesReference.BASE_SALARY.name) : ''"
                        :type="'float'"
                        v-validate="'required'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group">
            <div v-if="employeeMode" class="d-flex flex-column">
                <label>Require credito?</label>
                <mau-form-input-check-box
                    :initialValue="initialValues[EmployeePropertiesReference.CREDIT_REQUIRED.name]"
                    v-model="persona.creditRequired"
                >

                </mau-form-input-check-box>
            </div>
        </div>
        <div class="form-group">
            <div v-if="employeeMode && persona.creditRequired === 1">
                <mau-form-input-number
                        :initialValue="initialValues[EmployeePropertiesReference.INFONAVIT.name]"
                        :label="EmployeePropertiesReference.INFONAVIT.title"
                        v-model="persona.infonavit"
                        :name="EmployeePropertiesReference.INFONAVIT.name"
                        :error="errors.has(EmployeePropertiesReference.INFONAVIT.name) ? errors.first(EmployeePropertiesReference.INFONAVIT.name) : ''"
                        :type="'float'"
                        v-validate="{
                          required: true,
                          max_value: persona.credit > 0 ? persona.credit : 0
                        }"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group">
            <div v-if="employeeMode && persona.creditRequired === 1">
                <mau-form-input-number
                        :initialValue="initialValues[EmployeePropertiesReference.CREDIT.name]"
                        :label="EmployeePropertiesReference.CREDIT.title"
                        v-model="persona.credit"
                        :name="EmployeePropertiesReference.CREDIT.name"
                        :error="errors.has(EmployeePropertiesReference.CREDIT.name) ? errors.first(EmployeePropertiesReference.CREDIT.name) : ''"
                        :type="'float'"
                        v-validate="'required'"
                >
                </mau-form-input-number>
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
          credit: '',
          creditRequired: 0,
          hoursShouldWork: '',
          baseSalary: '',
          branch: {},
          employeeType: {},
          employeeStatus: {}
        },
        initialValues: {},
        buttonDisabled: false,
        clientEndpointName: EntityTypes.CLIENT.apiName,
        employeeTypeEndpointName: EntityTypes.EMPLOYEE_TYPE.apiName,
        branchEndpointName: EntityTypes.BRANCH.apiName,
        employeeStatusEndpointName: EntityTypes.EMPLOYEE_STATUS.apiName
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
          this.initialValues[EmployeePropertiesReference.BRANCH.name] = DefaultValuesHelper.simple(this.initialObject, EmployeePropertiesReference.BRANCH.name)
          this.initialValues[EmployeePropertiesReference.INFONAVIT.name] = DefaultValuesHelper.simple(this.initialObject, EmployeePropertiesReference.INFONAVIT.name)
          this.initialValues[EmployeePropertiesReference.HOURS_SHOULD_WORK.name] = DefaultValuesHelper.simple(this.initialObject, EmployeePropertiesReference.HOURS_SHOULD_WORK.name)
          this.initialValues[EmployeePropertiesReference.BASE_SALARY.name] = DefaultValuesHelper.simple(this.initialObject, EmployeePropertiesReference.BASE_SALARY.name)
          this.initialValues[EmployeePropertiesReference.EMPLOYEE_TYPE.name] = DefaultValuesHelper.object(this.initialObject, EmployeePropertiesReference.EMPLOYEE_TYPE.name)
          this.initialValues[EmployeePropertiesReference.EMPLOYEE_STATUS.name] = DefaultValuesHelper.object(this.initialObject, EmployeePropertiesReference.EMPLOYEE_STATUS.name)
          this.initialValues[EmployeePropertiesReference.CREDIT.name] = DefaultValuesHelper.simple(this.initialObject, EmployeePropertiesReference.CREDIT.name)
          this.initialValues[EmployeePropertiesReference.CREDIT_REQUIRED.name] = DefaultValuesHelper.boolean(this.initialObject, EmployeePropertiesReference.CREDIT_REQUIRED.name)
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
          directParams[EmployeePropertiesReference.CREDIT_REQUIRED.name] = this.persona.creditRequired
          directParams[EmployeePropertiesReference.INFONAVIT.name] = this.persona.creditRequired === 1 ? this.persona.infonavit : 0
          directParams[EmployeePropertiesReference.BASE_SALARY.name] = this.persona.baseSalary
          directParams[EmployeePropertiesReference.HOURS_SHOULD_WORK.name] = this.persona.hoursShouldWork
          directParams[EmployeePropertiesReference.CREDIT.name] = this.persona.creditRequired === 1 ? this.persona.credit : 0
          directParams[EmployeePropertiesReference.EMPLOYEE_STATUS.relationship_id_name] = this.persona.employeeStatus ? this.persona.employeeStatus[GlobalEntityIdentifier] : null
          directParams[EmployeePropertiesReference.BRANCH.relationship_id_name] = this.persona.branch ? this.persona.branch[GlobalEntityIdentifier] : null
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
