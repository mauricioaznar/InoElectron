<template>
    <div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[PropertiesReference.COMPANYNAME.name]"
                        v-model="client.companyname"
                        :label="PropertiesReference.COMPANYNAME.title"
                        :name="PropertiesReference.COMPANYNAME.name"
                        :error="errors.first(PropertiesReference.COMPANYNAME.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-md-6 col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[PropertiesReference.FIRSTNAME.name]"
                        v-model="client.firstname"
                        :label="PropertiesReference.FIRSTNAME.title"
                        :name="PropertiesReference.FIRSTNAME.name"
                        :type="'text'"
                        :error="errors.first(PropertiesReference.FIRSTNAME.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
            <div class="col-md-6 col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[PropertiesReference.LASTNAME.name]"
                        v-model="client.lastname"
                        :label="PropertiesReference.LASTNAME.title"
                        :name="PropertiesReference.LASTNAME.name"
                        :type="'housephone'"
                        :error="errors.first(PropertiesReference.LASTNAME.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-md-4 col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[PropertiesReference.EMAIL.name]"
                        v-model="client.email"
                        :label="PropertiesReference.EMAIL.title"
                        :name="PropertiesReference.EMAIL.name"
                        :type="'email'"
                        :error="errors.first(PropertiesReference.EMAIL.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
            <div class="col-md-4 col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[PropertiesReference.HOUSEPHONE.name]"
                        v-model="client.housephone"
                        :label="PropertiesReference.HOUSEPHONE.title"
                        :name="PropertiesReference.HOUSEPHONE.name"
                        :type="'housephone'"
                        :error="errors.first(PropertiesReference.HOUSEPHONE.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
            <div class="col-md-4 col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[PropertiesReference.CELLPHONE.name]"
                        v-model="client.cellphone"
                        :label="PropertiesReference.CELLPHONE.title"
                        :name="PropertiesReference.CELLPHONE.name"
                        :type="'cellphone'"
                        :error="errors.first(PropertiesReference.CELLPHONE.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12 col-md-4">
                <mau-form-input-text
                        :initialValue="initialValues[PropertiesReference.CITY.name]"
                        v-model="client.city"
                        :label="PropertiesReference.CITY.title"
                        :name="PropertiesReference.CITY.name"
                        :error="errors.first(PropertiesReference.CITY.name)"
                        :disabled="!userHasWritePrivileges"
                >
                </mau-form-input-text>
            </div>
            <div class="col-sm-12 col-md-4">
                <mau-form-input-text
                        :initialValue="initialValues[PropertiesReference.COUNTRY.name]"
                        v-model="client.country"
                        :label="PropertiesReference.COUNTRY.title"
                        :name="PropertiesReference.COUNTRY.name"
                        :error="errors.first(PropertiesReference.COUNTRY.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
            <div class="col-sm-12 col-md-4">
                <mau-form-input-number
                        :label="PropertiesReference.ZIPCODE.title"
                        :name="PropertiesReference.ZIPCODE.name"
                        :initialValue="initialValues[PropertiesReference.ZIPCODE.name]"
                        v-model="client.zipcode"
                        :error="errors.first(PropertiesReference.ZIPCODE.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required|min_value:1'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[PropertiesReference.ADDRESS1.name]"
                        v-model="client.address1"
                        :label="PropertiesReference.ADDRESS1.title"
                        :name="PropertiesReference.ADDRESS1.name"
                        :error="errors.first(PropertiesReference.ADDRESS1.name)"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="container mb-2 text-right">
            <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
        </div>
    </div>
</template>

<script>
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import PropertiesReference from 'renderer/api/propertiesReference/PersonaPropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import MauFormInputText from 'renderer/api/components/inputs/MauFormInputText.vue'
  import MauFormInputNumber from 'renderer/api/components/inputs/MauFormInputNumber.vue'
  import {mapState} from 'vuex'
  export default {
    name: 'MauPersonaForm',
    data () {
      return {
        PropertiesReference: PropertiesReference,
        client: {
          name: '',
          lastname: '',
          companyname: '',
          firstname: '',
          email: '',
          address1: '',
          city: '',
          country: '',
          zipcode: '',
          housephone: '',
          cellphone: ''
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
      },
      userHasWritePrivileges: {
        type: Boolean,
        default: function () {
          return true
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
        this.initialValues[PropertiesReference.COMPANYNAME.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.COMPANYNAME.name)
        this.initialValues[PropertiesReference.FIRSTNAME.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.FIRSTNAME.name)
        this.initialValues[PropertiesReference.LASTNAME.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.LASTNAME.name)
        this.initialValues[PropertiesReference.ADDRESS1.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.ADDRESS1.name)
        this.initialValues[PropertiesReference.EMAIL.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.EMAIL.name)
        this.initialValues[PropertiesReference.CITY.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.CITY.name)
        this.initialValues[PropertiesReference.COUNTRY.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.COUNTRY.name)
        this.initialValues[PropertiesReference.ZIPCODE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.ZIPCODE.name)
        this.initialValues[PropertiesReference.HOUSEPHONE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.HOUSEPHONE.name)
        this.initialValues[PropertiesReference.CELLPHONE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.CELLPHONE.name)
      },
      save: function () {
        let directParams = {
          [PropertiesReference.COMPANYNAME.name]: this.client.companyname,
          [PropertiesReference.FIRSTNAME.name]: this.client.firstname,
          [PropertiesReference.LASTNAME.name]: this.client.lastname,
          [PropertiesReference.EMAIL.name]: this.client.email,
          [PropertiesReference.ADDRESS1.name]: this.client.address1,
          [PropertiesReference.CITY.name]: this.client.city,
          [PropertiesReference.COUNTRY.name]: this.client.country,
          [PropertiesReference.ZIPCODE.name]: this.client.zipcode,
          [PropertiesReference.HOUSEPHONE.name]: this.client.housephone ? this.client.housephone.replace(/\D+/g, '') : '',
          [PropertiesReference.CELLPHONE.name]: this.client.cellphone ? this.client.cellphone.replace(/\D+/g, '') : ''
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
