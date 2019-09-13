1<template>
  <div>
      <div>
          <div class="form-group">
              <mau-form-input-date
                      :name="OrderReturnPropertiesReference.DATE.name"
                      :label="OrderReturnPropertiesReference.DATE.title"
                      v-model="returnOrder.date"
                      :initialValue="initialValues[OrderReturnPropertiesReference.DATE.name]"
                      :error="errors.has(OrderReturnPropertiesReference.DATE.name) ? errors.first(OrderReturnPropertiesReference.DATE.name) : ''"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'required'"
              >
              </mau-form-input-date>
          </div>
          <div class="form-group">
              <mau-form-input-select-dynamic
                      :endpointName="orderReturnTypeEndpointName"
                      :initialObject="initialValues[OrderReturnPropertiesReference.ORDER_RETURN_TYPE.name]"
                      :label="OrderReturnPropertiesReference.ORDER_RETURN_TYPE.title"
                      :displayProperty="'name'"
                      v-model="returnOrder.orderReturnType"
                      :name="OrderReturnPropertiesReference.ORDER_RETURN_TYPE.name"
                      :error="errors.has(OrderReturnPropertiesReference.ORDER_RETURN_TYPE.name) ? errors.first(OrderReturnPropertiesReference.ORDER_RETURN_TYPE.name) : ''"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group">
              <mau-form-input-number
                      :name="OrderReturnPropertiesReference.QUANTITY.name"
                      :label="OrderReturnPropertiesReference.QUANTITY.title"
                      v-model="returnOrder.quantity"
                      :type="'float'"
                      :initialValue="initialValues[OrderReturnPropertiesReference.QUANTITY.name]"
                      :error="errors.has(OrderReturnPropertiesReference.QUANTITY.name) ? errors.first(OrderReturnPropertiesReference.QUANTITY.name) : ''"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'required'"
              >
              </mau-form-input-number>
          </div>
          <div class="container mb-2 text-right">
              <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
          </div>
      </div>
  </div>
</template>

<script>
  import OrderReturnPropertiesReference from 'renderer/api/propertiesReference/OrderReturnPropertiesReference'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import {mapGetters} from 'vuex'
  export default {
    name: 'MauSimpleOrderForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        OrderReturnPropertiesReference: OrderReturnPropertiesReference,
        GlobalEntityIdentifier: GlobalEntityIdentifier,
        returnOrder: {
          orderReturnType: '',
          date: '',
          quantity: ''
        },
        initialValues: {},
        buttonDisabled: false,
        orderReturnTypeEndpointName: EntityTypes.ORDER_RETURN_TYPE.apiName
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
      setInitialValues: function () {
        this.initialValues[OrderReturnPropertiesReference.DATE.name] = DefaultValuesHelper.simple(this.initialObject, OrderReturnPropertiesReference.DATE.name)
        this.initialValues[OrderReturnPropertiesReference.ORDER_RETURN_TYPE.name] = DefaultValuesHelper.object(this.initialObject, OrderReturnPropertiesReference.ORDER_RETURN_TYPE.name)
        this.initialValues[OrderReturnPropertiesReference.QUANTITY.name] = DefaultValuesHelper.simple(this.initialObject, OrderReturnPropertiesReference.QUANTITY.name)
      },
      save: function () {
        let directParams = {}
        directParams[OrderReturnPropertiesReference.DATE.name] = this.returnOrder.date
        directParams[OrderReturnPropertiesReference.ORDER_RETURN_TYPE.relationship_id_name] = this.returnOrder.orderReturnType ? this.returnOrder.orderReturnType[GlobalEntityIdentifier] : null
        directParams[OrderReturnPropertiesReference.QUANTITY.name] = this.returnOrder.quantity
        let relayObjects = []
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
