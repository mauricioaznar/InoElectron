<template>
    <div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[CompanyPropertiesReference.NAME.name]"
                        v-model="client.name"
                        :label="CompanyPropertiesReference.NAME.title"
                        :name="CompanyPropertiesReference.NAME.name"
                        :error="errors.first(CompanyPropertiesReference.NAME.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[CompanyPropertiesReference.ABBREVIATION.name]"
                        v-model="client.abbreviation"
                        :label="CompanyPropertiesReference.ABBREVIATION.title"
                        :name="CompanyPropertiesReference.ABBREVIATION.name"
                        :error="errors.first(CompanyPropertiesReference.ABBREVIATION.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[CompanyPropertiesReference.HOUSE_PHONE.name]"
                        v-model="client.house_phone"
                        :label="CompanyPropertiesReference.HOUSE_PHONE.title"
                        :name="CompanyPropertiesReference.HOUSE_PHONE.name"
                        :type="'house_phone'"
                        :error="errors.first(CompanyPropertiesReference.HOUSE_PHONE.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12 col-md-4">
                <mau-form-input-text
                        :initialValue="initialValues[CompanyPropertiesReference.CITY.name]"
                        v-model="client.city"
                        :label="CompanyPropertiesReference.CITY.title"
                        :name="CompanyPropertiesReference.CITY.name"
                        :error="errors.first(CompanyPropertiesReference.CITY.name)"
                        :disabled="!userHasWritePrivileges"
                >
                </mau-form-input-text>
            </div>
            <div class="col-sm-12 col-md-4">
                <mau-form-input-text
                        :initialValue="initialValues[CompanyPropertiesReference.COUNTRY.name]"
                        v-model="client.country"
                        :label="CompanyPropertiesReference.COUNTRY.title"
                        :name="CompanyPropertiesReference.COUNTRY.name"
                        :error="errors.first(CompanyPropertiesReference.COUNTRY.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
            <div class="col-sm-12 col-md-4">
                <mau-form-input-number
                        :label="CompanyPropertiesReference.ZIP_CODE.title"
                        :name="CompanyPropertiesReference.ZIP_CODE.name"
                        :initialValue="initialValues[CompanyPropertiesReference.ZIP_CODE.name]"
                        v-model="client.zip_code"
                        :error="errors.first(CompanyPropertiesReference.ZIP_CODE.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required|min_value:1'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[CompanyPropertiesReference.ADDRESS1.name]"
                        v-model="client.address1"
                        :label="CompanyPropertiesReference.ADDRESS1.title"
                        :name="CompanyPropertiesReference.ADDRESS1.name"
                        :error="errors.first(CompanyPropertiesReference.ADDRESS1.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row" v-if="initialValues['_clients'].length > 0">
            <div class="col-sm-12">
                <label>Clientes</label>
                <div v-html="getPersonaArray(initialValues['_clients'])">
                </div>
            </div>
        </div>
        <div class="container mb-2 text-right">
            <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
        </div>
    </div>
</template>

<script>
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import CompanyPropertiesReference from 'renderer/api/propertiesReference/CompanyPropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import MauFormInputText from 'renderer/api/components/inputs/MauFormInputText.vue'
  import MauFormInputNumber from 'renderer/api/components/inputs/MauFormInputNumber.vue'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'CompanyForm',
    data () {
      return {
        CompanyPropertiesReference: CompanyPropertiesReference,
        client: {
          name: '',
          abbreviation: '',
          address1: '',
          city: '',
          country: '',
          zip_code: '',
          house_phone: ''
        },
        initialValues: {},
        buttonDisabled: false
      }
    },
    components: {
      MauFormInputText,
      MauFormInputNumber
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
      getPersonaArray: DisplayFunctions.getPersonaArray,
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      setInitialValues: function () {
        this.initialValues[CompanyPropertiesReference.NAME.name] = DefaultValuesHelper.simple(this.initialObject, CompanyPropertiesReference.NAME.name)
        this.initialValues[CompanyPropertiesReference.ABBREVIATION.name] = DefaultValuesHelper.simple(this.initialObject, CompanyPropertiesReference.ABBREVIATION.name)
        this.initialValues[CompanyPropertiesReference.ADDRESS1.name] = DefaultValuesHelper.simple(this.initialObject, CompanyPropertiesReference.ADDRESS1.name)
        this.initialValues[CompanyPropertiesReference.HOUSE_PHONE.name] = DefaultValuesHelper.simple(this.initialObject, CompanyPropertiesReference.HOUSE_PHONE.name)
        this.initialValues[CompanyPropertiesReference.COUNTRY.name] = DefaultValuesHelper.simple(this.initialObject, CompanyPropertiesReference.COUNTRY.name)
        this.initialValues[CompanyPropertiesReference.CITY.name] = DefaultValuesHelper.simple(this.initialObject, CompanyPropertiesReference.CITY.name)
        this.initialValues[CompanyPropertiesReference.ZIP_CODE.name] = DefaultValuesHelper.simple(this.initialObject, CompanyPropertiesReference.ZIP_CODE.name)
        this.initialValues['_clients'] = DefaultValuesHelper.array(this.initialObject, CompanyPropertiesReference.CLIENTS.name)
      },
      save: function () {
        let directParams = {
          [CompanyPropertiesReference.NAME.name]: this.client.name,
          [CompanyPropertiesReference.ABBREVIATION.name]: this.client.abbreviation,
          [CompanyPropertiesReference.ADDRESS1.name]: this.client.address1,
          [CompanyPropertiesReference.HOUSE_PHONE.name]: this.client.house_phone ? this.client.house_phone.replace(/\D+/g, '') : '',
          [CompanyPropertiesReference.COUNTRY.name]: this.client.country,
          [CompanyPropertiesReference.CITY.name]: this.client.city,
          [CompanyPropertiesReference.ZIP_CODE.name]: this.client.zip_code
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
