1<template>
  <div>
      <div>
          <div class="form-group">
              <mau-form-input-number
                      :key="initialOrderCode"
                      :initialValue="initialOrderCode"
                      v-model="requestOrder.orderCode"
                      :label="OrderRequestPropertiesReference.ORDER_CODE.title"
                      :name="OrderRequestPropertiesReference.ORDER_CODE.name"
                      :error="errors.first(OrderRequestPropertiesReference.ORDER_CODE.name)"
                      :disabled="!userHasWritePrivileges"
                      v-validate="{
                        required: true,
                        remote_unique: {
                          entityType: orderRequestEntityType,
                          columnName: OrderRequestPropertiesReference.ORDER_CODE.name,
                          initialValue: initialOrderCode
                        }
                       }"
              >
              </mau-form-input-number>
          </div>
          <div class="form-group">
              <mau-form-input-date
                      :name="OrderRequestPropertiesReference.DATE.name"
                      :label="OrderRequestPropertiesReference.DATE.title"
                      v-model="requestOrder.date"
                      :initialValue="initialValues[OrderRequestPropertiesReference.DATE.name]"
                      :error="errors.first(OrderRequestPropertiesReference.DATE.name)"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'required'"
              >
              </mau-form-input-date>
          </div>
          <div class="form-group">
              <mau-form-input-select
                      :initialObject="initialValues[OrderRequestPropertiesReference.COMPANY.name]"
                      :label="OrderRequestPropertiesReference.COMPANY.title"
                      :displayProperty="'name'"
                      :entityType="companyEntityType"
                      v-model="requestOrder.company"
                      :name="OrderRequestPropertiesReference.COMPANY.name"
                      :error="errors.first(OrderRequestPropertiesReference.COMPANY.name)"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select>
          </div>
          <div class="form-group">
              <mau-form-input-select
                      :key="companyId"
                      :initialObject="initialClient"
                      :label="OrderRequestPropertiesReference.CLIENT.title"
                      :displayProperty="'full_name'"
                      :searchedProperties="['first_name', 'last_name']"
                      :entityType="clientEntityType"
                      :filterExact="clientFilterExact"
                      v-model="requestOrder.client"
                      :name="OrderRequestPropertiesReference.CLIENT.name"
                      :error="errors.first(OrderRequestPropertiesReference.CLIENT.name)"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select>
          </div>
          <div class="form-group">
              <mau-form-input-select
                      :initialObject="initialValues[OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.name]"
                      :label="OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.title"
                      :displayProperty="'name'"
                      :entityType="orderRequestStatusEntityType"
                      v-model="requestOrder.orderRequestStatus"
                      :name="OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.name"
                      :error="errors.first(OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.name)"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select>
          </div>
          <div class="form-group">
              <div class="products">
                    <mau-form-input-select
                            :label="OrderRequestPropertiesReference.PRODUCTS.title"
                            :initialObjects="initialValues[OrderRequestPropertiesReference.PRODUCTS.name]"
                            v-model="requestOrder.products"
                            :displayProperty="'code'"
                            :name="OrderRequestPropertiesReference.PRODUCTS.name"
                            :data-vv-as="'Productos'"
                            :error="errors.first(OrderRequestPropertiesReference.PRODUCTS.name)"
                            :entityType="productEntityType"
                            :multi="true"
                            :disabled="receiptMode || !userHasWritePrivileges"
                            v-validate="'array_required'"
                    >
                        <template slot-scope="params">
                            <order-sale-product-table
                                    :selectedProducts="requestOrder.products"
                                    v-model="requestOrder.requestProducts"
                                    :initialProducts="initialValues[OrderRequestPropertiesReference.PRODUCTS.name]"
                                    :userHasWritePrivileges="userHasWritePrivileges"
                            >
                            </order-sale-product-table>
                        </template>
                    </mau-form-input-select>
              </div>
          </div>
          <div class="container mb-2 text-right">
              <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
          </div>
      </div>
  </div>
</template>

<script>
  import OrderRequestPropertiesReference from 'renderer/api/propertiesReference/OrderRequestPropertiesReference'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import MauFormInputText from 'renderer/api/components/inputs/MauFormInputText.vue'
  import MauFormInputNumber from 'renderer/api/components/inputs/MauFormInputNumber.vue'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauFormInputDate from 'renderer/api/components/inputs/MauFormInputDate.vue'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import OrderSaleProductTable from 'renderer/api/components/m2m/OrderSaleProductTable.vue'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import ApiOperations from 'renderer/api/functions/ApiOperations'
  import {mapState} from 'vuex'
  export default {
    name: 'MauSimpleOrderForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        OrderRequestPropertiesReference: OrderRequestPropertiesReference,
        requestOrder: {
          orderCode: '',
          products: [],
          requestProducts: [],
          date: '',
          client: {},
          company: {},
          orderRequestStatus: {}
        },
        initialOrderCode: '',
        initialValues: {},
        buttonDisabled: false,
        companyId: '',
        initialClient: {},
        clientFilterExact: {[OrderRequestPropertiesReference.COMPANY.relationship_id_name]: 0},
        clientEntityType: EntityTypes.CLIENT,
        companyEntityType: EntityTypes.COMPANY,
        orderRequestStatusEntityType: EntityTypes.ORDER_REQUEST_STATUS,
        productEntityType: EntityTypes.PRODUCT,
        orderRequestEntityType: EntityTypes.ORDER_REQUEST,
        orderSaleReceiptTypeEntityType: EntityTypes.ORDER_SALE_RECEIPT_TYPE
      }
    },
    components: {
      MauFormInputSelect,
      MauFormInputDate,
      MauFormInputText,
      MauFormInputNumber,
      OrderSaleProductTable
    },
    props: {
      initialObject: {
        type: Object
      },
      saveFunction: {
        type: Function,
        required: true
      },
      entityType: {
        type: Object,
        required: true
      },
      userHasWritePrivileges: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      requestMode: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      receiptMode: {
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
      this.createDefaultInitialValues()
      if (this.initialObject) {
        this.setInitialValues()
      } else {
        ApiOperations.getMax(this.orderRequestEntityType, OrderRequestPropertiesReference.ORDER_CODE.name).then(result => {
          this.initialOrderCode = result + 1
        })
      }
    },
    computed: {
      ...mapState({
      })
    },
    methods: {
      getPersona: DisplayFunctions.getPersona,
      createDefaultInitialValues: function () {
        for (let propertyReference in OrderRequestPropertiesReference) {
          if (OrderRequestPropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[OrderRequestPropertiesReference[propertyReference].name] = OrderRequestPropertiesReference[propertyReference].defaultValue
          }
        }
        for (let propertyReference in OrderRequestPropertiesReference) {
          if (OrderRequestPropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[OrderRequestPropertiesReference[propertyReference].name] = OrderRequestPropertiesReference[propertyReference].defaultValue
          }
        }
      },
      setInitialValues: function () {
        this.initialOrderCode = this.initialObject[OrderRequestPropertiesReference.ORDER_CODE.name]
        this.initialClient = this.initialObject[OrderRequestPropertiesReference.CLIENT.name]
        this.initialValues[OrderRequestPropertiesReference.PRODUCTS.name] = this.initialObject[OrderRequestPropertiesReference.PRODUCTS.name]
        this.initialValues[OrderRequestPropertiesReference.DATE.name] = this.initialObject[OrderRequestPropertiesReference.DATE.name]
        this.initialValues[OrderRequestPropertiesReference.COMPANY.name] = this.initialObject[OrderRequestPropertiesReference.COMPANY.name]
        this.initialValues[OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.name] = this.initialObject[OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.name]
      },
      save: function () {
        let directParams = {}
        directParams[OrderRequestPropertiesReference.ORDER_CODE.name] = this.requestOrder.orderCode
        directParams[OrderRequestPropertiesReference.DATE.name] = this.requestOrder.date
        directParams[OrderRequestPropertiesReference.CLIENT.relationship_id_name] = this.requestOrder.client ? this.requestOrder.client[GlobalEntityIdentifier] : 'null'
        directParams[OrderRequestPropertiesReference.COMPANY.relationship_id_name] = this.requestOrder.company ? this.requestOrder.company[GlobalEntityIdentifier] : 'null'
        directParams[OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.relationship_id_name] = this.requestOrder.orderRequestStatus ? this.requestOrder.orderRequestStatus[GlobalEntityIdentifier] : 'null'
        let initialOrderRequestProducts = ManyToManyHelper.createM2MStructuredObjects(this.initialValues[OrderRequestPropertiesReference.PRODUCTS.name], 'product_id')
        let filteredOrderRequestProducts = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialOrderRequestProducts, this.requestOrder.requestProducts, 'product_id')
        let relayObjects = [
          ManyToManyHelper.createRelayObject(filteredOrderRequestProducts, EntityTypes.ORDER_REQUEST_PRODUCT)
        ]
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
      },
      'requestOrder.company': function (company) {
        let initialClientFound
        if (company && this.initialObject) {
          let initialClient = this.initialObject[OrderRequestPropertiesReference.CLIENT.name]
          if (company[GlobalEntityIdentifier] === initialClient['company_id']) {
            initialClientFound = initialClient
          }
        }
        this.initialClient = initialClientFound || {}
        this.requestOrder.client = initialClientFound || {}
        this.companyId = company[GlobalEntityIdentifier]
        this.clientFilterExact = {[OrderRequestPropertiesReference.COMPANY.relationship_id_name]: company[GlobalEntityIdentifier]}
      }
    }
  }

</script>
