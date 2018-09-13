<template>
    <div>
        <div class="form-group form-row">
            <div class="col-md-6 col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[PersonaPropertiesReference.FIRST_NAME.name]"
                        v-model="persona.firstName"
                        :label="PersonaPropertiesReference.FIRST_NAME.title"
                        :name="PersonaPropertiesReference.FIRST_NAME.name"
                        :type="'text'"
                        :error="errors.first(PersonaPropertiesReference.FIRST_NAME.name)"
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
                        :error="errors.first(PersonaPropertiesReference.LAST_NAME.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-md-6 col-sm-12" v-if="clientMode">
                <mau-form-input-text
                        :initialValue="initialValues[PersonaPropertiesReference.EMAIL.name]"
                        v-model="persona.email"
                        :label="PersonaPropertiesReference.EMAIL.title"
                        :name="PersonaPropertiesReference.EMAIL.name"
                        :type="'email'"
                        :error="errors.first(PersonaPropertiesReference.EMAIL.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
            <div class="col-sm-12" :class="clientMode ? 'col-md-6' : ''">
                    <mau-form-input-text
                            :initialValue="initialValues[PersonaPropertiesReference.CELLPHONE.name]"
                            v-model="persona.cellphone"
                            :label="PersonaPropertiesReference.CELLPHONE.title"
                            :name="PersonaPropertiesReference.CELLPHONE.name"
                            :type="'cellphone'"
                            :error="errors.first(PersonaPropertiesReference.CELLPHONE.name)"
                            :disabled="!userHasWritePrivileges"
                            v-validate="clientMode ? 'required' : ''"
                    >
                    </mau-form-input-text>
            </div>
        </div>
        <div class="form-group">
            <div v-if="clientMode">
                <mau-form-input-select
                        :initialObject="initialValues[ClientPropertiesReference.COMPANY.name]"
                        :label="ClientPropertiesReference.COMPANY.title"
                        :displayProperty="'name'"
                        :entityType="companyEntityType"
                        v-model="persona.company"
                        :name="ClientPropertiesReference.COMPANY.name"
                        :error="errors.first(ClientPropertiesReference.COMPANY.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select>
            </div>
        </div>
        <div class="form-group">
            <div v-if="employeeMode">
                <mau-form-input-select
                        :initialObject="initialValues[EmployeePropertiesReference.EMPLOYEE_TYPE.name]"
                        :label="EmployeePropertiesReference.EMPLOYEE_TYPE.title"
                        :displayProperty="'name'"
                        :entityType="employeeTypeEntityType"
                        v-model="persona.employeeType"
                        :name="EmployeePropertiesReference.EMPLOYEE_TYPE.name"
                        :error="errors.first(EmployeePropertiesReference.EMPLOYEE_TYPE.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'object_required'"
                >
                </mau-form-input-select>
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
  import ClientPropertiesReference from 'renderer/api/propertiesReference/ClientPropertiesReference'
  import EmployeePropertiesReference from 'renderer/api/propertiesReference/EmployeePropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import MauFormInputText from 'renderer/api/components/inputs/MauFormInputText.vue'
  import MauFormInputNumber from 'renderer/api/components/inputs/MauFormInputNumber.vue'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import {mapGetters} from 'vuex'
  import EntityTypes from 'renderer/api/EntityTypes'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'MauPersonaForm',
    data () {
      return {
        PersonaPropertiesReference: PersonaPropertiesReference,
        ClientPropertiesReference: ClientPropertiesReference,
        EmployeePropertiesReference: EmployeePropertiesReference,
        persona: {
          lastName: '',
          firstName: '',
          email: '',
          cellphone: '',
          company: {},
          employeeType: {}
        },
        initialValues: {},
        buttonDisabled: false,
        companyEntityType: EntityTypes.COMPANY,
        employeeTypeEntityType: EntityTypes.EMPLOYEE_TYPE
      }
    },
    components: {
      MauFormInputText,
      MauFormInputNumber,
      MauFormInputSelect
    },
    props: {
      initialObject: {
        type: Object
      },
      saveFunction: {
        type: Function,
        required: true
      },
      clientMode: {
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
        if (this.clientMode) {
          this.initialValues[PersonaPropertiesReference.EMAIL.name] = DefaultValuesHelper.simple(this.initialObject, PersonaPropertiesReference.EMAIL.name)
          this.initialValues[ClientPropertiesReference.COMPANY.name] = DefaultValuesHelper.object(this.initialObject, ClientPropertiesReference.COMPANY.name)
        }
        if (this.employeeMode) {
          this.initialValues[EmployeePropertiesReference.EMPLOYEE_TYPE.name] = DefaultValuesHelper.object(this.initialObject, EmployeePropertiesReference.EMPLOYEE_TYPE.name)
        }
      },
      save: function () {
        let directParams = {
          [PersonaPropertiesReference.FIRST_NAME.name]: this.persona.firstName,
          [PersonaPropertiesReference.LAST_NAME.name]: this.persona.lastName,
          [PersonaPropertiesReference.CELLPHONE.name]: this.persona.cellphone ? this.persona.cellphone.replace(/\D+/g, '') : ''
        }
        if (this.clientMode) {
          directParams[ClientPropertiesReference.COMPANY.relationship_id_name] = this.persona.company ? this.persona.company[GlobalEntityIdentifier] : 'null'
          directParams[ClientPropertiesReference.EMAIL.name] = this.persona.email
        }
        if (this.employeeMode) {
          directParams[EmployeePropertiesReference.EMPLOYEE_TYPE.relationship_id_name] = this.persona.employeeType ? this.persona.employeeType[GlobalEntityIdentifier] : 'null'
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
