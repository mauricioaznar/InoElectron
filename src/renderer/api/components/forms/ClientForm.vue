<template>
    <div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[ClientPropertiesReference.NAME.name]"
                        v-model="client.name"
                        :label="ClientPropertiesReference.NAME.title"
                        :name="ClientPropertiesReference.NAME.name"
                        :error="errors.has(ClientPropertiesReference.NAME.name) ? errors.first(ClientPropertiesReference.NAME.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[ClientPropertiesReference.ABBREVIATION.name]"
                        v-model="client.abbreviation"
                        :label="ClientPropertiesReference.ABBREVIATION.title"
                        :name="ClientPropertiesReference.ABBREVIATION.name"
                        :error="errors.has(ClientPropertiesReference.ABBREVIATION.name) ? errors.first(ClientPropertiesReference.ABBREVIATION.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[ClientPropertiesReference.HOUSE_PHONE.name]"
                        v-model="client.house_phone"
                        :label="ClientPropertiesReference.HOUSE_PHONE.title"
                        :name="ClientPropertiesReference.HOUSE_PHONE.name"
                        :type="'house_phone'"
                        :error="errors.has(ClientPropertiesReference.HOUSE_PHONE.name) ? errors.first(ClientPropertiesReference.HOUSE_PHONE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12 col-md-4">
                <mau-form-input-text
                        :initialValue="initialValues[ClientPropertiesReference.CITY.name]"
                        v-model="client.city"
                        :label="ClientPropertiesReference.CITY.title"
                        :name="ClientPropertiesReference.CITY.name"
                        :error="errors.has(ClientPropertiesReference.CITY.name) ? errors.first(ClientPropertiesReference.CITY.name) : ''"
                        :disabled="!userHasWritePrivileges"
                >
                </mau-form-input-text>
            </div>
            <div class="col-sm-12 col-md-4">
                <mau-form-input-text
                        :initialValue="initialValues[ClientPropertiesReference.COUNTRY.name]"
                        v-model="client.country"
                        :label="ClientPropertiesReference.COUNTRY.title"
                        :name="ClientPropertiesReference.COUNTRY.name"
                        :error="errors.has(ClientPropertiesReference.COUNTRY.name) ? errors.first(ClientPropertiesReference.COUNTRY.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
            <div class="col-sm-12 col-md-4">
                <mau-form-input-number
                        :label="ClientPropertiesReference.ZIP_CODE.title"
                        :name="ClientPropertiesReference.ZIP_CODE.name"
                        :initialValue="initialValues[ClientPropertiesReference.ZIP_CODE.name]"
                        v-model="client.zip_code"
                        :error="errors.has(ClientPropertiesReference.ZIP_CODE.name) ? errors.first(ClientPropertiesReference.ZIP_CODE.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required|min_value:1'"
                >
                </mau-form-input-number>
            </div>
        </div>
        <div class="form-group form-row">
            <div class="col-sm-12">
                <mau-form-input-text
                        :initialValue="initialValues[ClientPropertiesReference.ADDRESS1.name]"
                        v-model="client.address1"
                        :label="ClientPropertiesReference.ADDRESS1.title"
                        :name="ClientPropertiesReference.ADDRESS1.name"
                        :error="errors.has(ClientPropertiesReference.ADDRESS1.name) ? errors.first(ClientPropertiesReference.ADDRESS1.name) : ''"
                        :disabled="!userHasWritePrivileges"
                        v-validate="'required'"
                >
                </mau-form-input-text>
            </div>
        </div>
        <div class="form-group form-row" v-if="initialValues['_contacts'].length > 0">
            <div class="col-sm-12">
                <client-contact-table
                    :initialValues="initialValue"
                    v-model=""
                >
                </client-contact-table>
            </div>
        </div>
        <div class="container mb-2 text-right">
            <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
        </div>
    </div>
</template>

<script>
  import ClientPropertiesReference from 'renderer/api/propertiesReference/ClientPropertiesReference'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  export default {
    name: 'ClientForm',
    data () {
      return {
        ClientPropertiesReference: ClientPropertiesReference,
        client: {
          name: '',
          abbreviation: '',
          address1: '',
          city: '',
          country: '',
          zip_code: '',
          house_phone: '',
          contacts: []
        },
        initialValues: {},
        buttonDisabled: false
      }
    },
    components: {
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
      setInitialValues: function () {
        this.initialValues[ClientPropertiesReference.NAME.name] = DefaultValuesHelper.simple(this.initialObject, ClientPropertiesReference.NAME.name)
        this.initialValues[ClientPropertiesReference.ABBREVIATION.name] = DefaultValuesHelper.simple(this.initialObject, ClientPropertiesReference.ABBREVIATION.name)
        this.initialValues[ClientPropertiesReference.ADDRESS1.name] = DefaultValuesHelper.simple(this.initialObject, ClientPropertiesReference.ADDRESS1.name)
        this.initialValues[ClientPropertiesReference.HOUSE_PHONE.name] = DefaultValuesHelper.simple(this.initialObject, ClientPropertiesReference.HOUSE_PHONE.name)
        this.initialValues[ClientPropertiesReference.COUNTRY.name] = DefaultValuesHelper.simple(this.initialObject, ClientPropertiesReference.COUNTRY.name)
        this.initialValues[ClientPropertiesReference.CITY.name] = DefaultValuesHelper.simple(this.initialObject, ClientPropertiesReference.CITY.name)
        this.initialValues[ClientPropertiesReference.ZIP_CODE.name] = DefaultValuesHelper.simple(this.initialObject, ClientPropertiesReference.ZIP_CODE.name)
        this.initialValues[ClientPropertiesReference.CONTACTS.name] = DefaultValuesHelper.array(this.initialObject, ClientPropertiesReference.CONTACTS.name)
      },
      save: function () {
        let directParams = {
          [ClientPropertiesReference.NAME.name]: this.client.name,
          [ClientPropertiesReference.ABBREVIATION.name]: this.client.abbreviation,
          [ClientPropertiesReference.ADDRESS1.name]: this.client.address1,
          [ClientPropertiesReference.HOUSE_PHONE.name]: this.client.house_phone ? this.client.house_phone.replace(/\D+/g, '') : '',
          [ClientPropertiesReference.COUNTRY.name]: this.client.country,
          [ClientPropertiesReference.CITY.name]: this.client.city,
          [ClientPropertiesReference.ZIP_CODE.name]: this.client.zip_code
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
