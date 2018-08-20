<template>
    <div>
        <div class="form-group form-row">
            <div class="col-md-6 col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[PersonaPropertiesReference.FIRST_NAME.name]"
                        v-model="client.firstName"
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
                        v-model="client.lastName"
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
            <div class="col-md-6 col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[PersonaPropertiesReference.EMAIL.name]"
                        v-model="client.email"
                        :label="PersonaPropertiesReference.EMAIL.title"
                        :name="PersonaPropertiesReference.EMAIL.name"
                        :type="'email'"
                        :error="errors.first(PersonaPropertiesReference.EMAIL.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
            <div class="col-md-6 col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[PersonaPropertiesReference.CELLPHONE.name]"
                        v-model="client.cellphone"
                        :label="PersonaPropertiesReference.CELLPHONE.title"
                        :name="PersonaPropertiesReference.CELLPHONE.name"
                        :type="'cellphone'"
                        :error="errors.first(PersonaPropertiesReference.CELLPHONE.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
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
                        v-model="client.company"
                        :name="ClientPropertiesReference.COMPANY.name"
                        :error="errors.first(ClientPropertiesReference.COMPANY.name)"
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
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import MauFormInputText from 'renderer/api/components/inputs/MauFormInputText.vue'
  import MauFormInputNumber from 'renderer/api/components/inputs/MauFormInputNumber.vue'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import {mapState} from 'vuex'
  import EntityTypes from 'renderer/api/EntityTypes'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  export default {
    name: 'MauPersonaForm',
    data () {
      return {
        PersonaPropertiesReference: PersonaPropertiesReference,
        ClientPropertiesReference: ClientPropertiesReference,
        client: {
          lastName: '',
          firstName: '',
          email: '',
          cellphone: '',
          company: {}
        },
        initialValues: {},
        buttonDisabled: false,
        companyEntityType: EntityTypes.COMPANY
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
      userHasWritePrivileges: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      clientMode: {
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
      ...mapState({
      })
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      setInitialValues: function () {
        this.initialValues[PersonaPropertiesReference.FIRST_NAME.name] = DefaultValuesHelper.simple(this.initialObject, PersonaPropertiesReference.FIRST_NAME.name)
        this.initialValues[PersonaPropertiesReference.LAST_NAME.name] = DefaultValuesHelper.simple(this.initialObject, PersonaPropertiesReference.LAST_NAME.name)
        this.initialValues[PersonaPropertiesReference.EMAIL.name] = DefaultValuesHelper.simple(this.initialObject, PersonaPropertiesReference.EMAIL.name)
        this.initialValues[PersonaPropertiesReference.CELLPHONE.name] = DefaultValuesHelper.simple(this.initialObject, PersonaPropertiesReference.CELLPHONE.name)
        if (this.clientMode) {
          this.initialValues[ClientPropertiesReference.COMPANY.name] = DefaultValuesHelper.object(this.initialObject, ClientPropertiesReference.COMPANY.name)
        }
      },
      save: function () {
        let directParams = {
          [PersonaPropertiesReference.FIRST_NAME.name]: this.client.firstName,
          [PersonaPropertiesReference.LAST_NAME.name]: this.client.lastName,
          [PersonaPropertiesReference.EMAIL.name]: this.client.email,
          [PersonaPropertiesReference.CELLPHONE.name]: this.client.cellphone ? this.client.cellphone.replace(/\D+/g, '') : ''
        }
        if (this.clientMode) {
          directParams[ClientPropertiesReference.COMPANY.relationship_id_name] = this.client.company ? this.client.company[GlobalEntityIdentifier] : 'null'
        }
        let indirectParams = {
        }
        console.log(directParams)
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
