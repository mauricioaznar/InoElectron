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
                      :error="errors.has(OrderRequestPropertiesReference.ORDER_CODE.name) ? errors.first(OrderRequestPropertiesReference.ORDER_CODE.name) : ''"
                      :disabled="!userHasWritePrivileges"
                      v-validate="{
                        required: true,
                        remote_unique: {
                          endpointName: orderRequestEndpointName,
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
                      :error="errors.has(OrderRequestPropertiesReference.DATE.name) ? errors.first(OrderRequestPropertiesReference.DATE.name) : ''"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'required'"
              >
              </mau-form-input-date>
          </div>
          <div class="form-group">
              <mau-form-input-date
                      :name="OrderRequestPropertiesReference.ESTIMATED_DELIVERY_DATE.name"
                      :label="OrderRequestPropertiesReference.ESTIMATED_DELIVERY_DATE.title"
                      v-model="requestOrder.estimatedDeliveryDate"
                      :initialValue="initialValues[OrderRequestPropertiesReference.ESTIMATED_DELIVERY_DATE.name]"
                      :error="errors.has(OrderRequestPropertiesReference.ESTIMATED_DELIVERY_DATE.name) ? errors.first(OrderRequestPropertiesReference.ESTIMATED_DELIVERY_DATE.name) : ''"
                      :disabled="!userHasWritePrivileges"
              >
              </mau-form-input-date>
          </div>
          <div class="form-group">
              <mau-form-input-select-dynamic
                      :initialObject="initialValues[OrderRequestPropertiesReference.CLIENT.name]"
                      :label="OrderRequestPropertiesReference.CLIENT.title"
                      :displayProperty="'name'"
                      :endpointName="clientEndpointName"
                      v-model="requestOrder.client"
                      :name="OrderRequestPropertiesReference.CLIENT.name"
                      :error="errors.has(OrderRequestPropertiesReference.CLIENT.name) ? errors.first(OrderRequestPropertiesReference.CLIENT.name) : ''"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group">
              <mau-form-input-select-dynamic
                      :key="requestOrder ? requestOrder.client['id'] : 0"
                      :apiOperationOptions="clientContactApiOperationsOptions"
                      :endpointName="clientContactEndpointName"
                      :initialObject="initialClientContact"
                      :label="OrderRequestPropertiesReference.CLIENT_CONTACT.title"
                      :displayProperty="'fullname'"
                      v-model="requestOrder.clientContact"
                      :name="OrderRequestPropertiesReference.CLIENT_CONTACT.name"
                      :error="errors.has(OrderRequestPropertiesReference.CLIENT_CONTACT.name) ? errors.first(OrderRequestPropertiesReference.CLIENT_CONTACT.name) : ''"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group">
              <mau-form-input-select-dynamic
                      :key="initialOrderRequestStatus ? initialOrderRequestStatus[GlobalEntityIdentifier] : 0"
                      :endpointName="orderRequestStatusEndpointName"
                      :initialObject="initialOrderRequestStatus"
                      :label="OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.title"
                      :displayProperty="'name'"
                      v-model="requestOrder.orderRequestStatus"
                      :name="OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.name"
                      :error="errors.has(OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.name) ? errors.first(OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.name) : ''"
                      :disabled="!isAdminUser"
                      v-validate="'object_required'"
              >
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group">
              <div class="products">
                    <mau-form-input-select-dynamic
                            :label="OrderRequestPropertiesReference.PRODUCTS.title"
                            :initialObjects="initialValues[OrderRequestPropertiesReference.PRODUCTS.name]"
                            v-model="requestOrder.products"
                            :displayProperty="'description'"
                            :name="OrderRequestPropertiesReference.PRODUCTS.name"
                            :data-vv-as="'Productos'"
                            :error="errors.has(OrderRequestPropertiesReference.PRODUCTS.name) ? errors.first(OrderRequestPropertiesReference.PRODUCTS.name) : ''"
                            :endpointName="productEndpointName"
                            :multiselect="true"
                            :disabled="receiptMode || !userHasWritePrivileges"
                            v-validate="'required'"
                    >
                        <template slot-scope="params">
                            <order-sale-product-table
                                    :saleMode="true"
                                    :selectedProducts="requestOrder.products"
                                    v-model="requestOrder.requestProducts"
                                    :initialProducts="initialValues[OrderRequestPropertiesReference.PRODUCTS.name]"
                                    :userHasWritePrivileges="userHasWritePrivileges"
                            >
                            </order-sale-product-table>
                        </template>
                    </mau-form-input-select-dynamic>
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
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import OrderSaleProductTable from 'renderer/api/components/m2m/OrderSaleProductTable.vue'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
  import SpecificApiOperations from 'renderer/api/functions/SpecificApiOperations'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import {mapGetters} from 'vuex'
  export default {
    name: 'MauSimpleOrderForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        OrderRequestPropertiesReference: OrderRequestPropertiesReference,
        GlobalEntityIdentifier: GlobalEntityIdentifier,
        requestOrder: {
          orderCode: '',
          products: [],
          requestProducts: [],
          date: '',
          estimatedDeliveryDate: '',
          clientContact: {},
          client: {},
          orderRequestStatus: {}
        },
        initialValues: {},
        buttonDisabled: false,
        initialOrderCode: '',
        initialOrderRequestStatus: {},
        initialClientContact: {},
        clientEndpointName: EntityTypes.CLIENT.apiName,
        clientContactEndpointName: EntityTypes.CLIENT_CONTACT.apiName,
        orderRequestStatusEndpointName: EntityTypes.ORDER_REQUEST_STATUS.apiName,
        productEndpointName: EntityTypes.PRODUCT.apiName,
        orderRequestEndpointName: EntityTypes.ORDER_REQUEST.apiName,
        orderSaleReceiptTypeEndpointName: EntityTypes.ORDER_SALE_RECEIPT_TYPE.apiName
      }
    },
    components: {
      MauFormInputSelectDynamic,
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
      this.setInitialValues()
      if (!this.initialObject) {
        SpecificApiOperations.getMax(EntityTypes.ORDER_REQUEST.apiName, OrderRequestPropertiesReference.ORDER_CODE.name).then(result => {
          this.initialOrderCode = result + 1
        })
        GenericApiOperations.getById(this.orderRequestStatusEndpointName, 1).then(result => {
          this.initialOrderRequestStatus = result
        })
      }
    },
    computed: {
      userHasWritePrivileges: function () {
        let isOrderPending = this.initialValues[OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.relationship_id_name] ? this.initialValues[OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.relationship_id_name] === 1 : true
        return this.isAdminUser || isOrderPending
      },
      ...mapGetters([
        'isAdminUser'
      ]),
      clientContactApiOperationsOptions: function () {
        let clientId = this.requestOrder.client ? this.requestOrder.client[GlobalEntityIdentifier] : ''
        let filterExacts = {[OrderRequestPropertiesReference.CLIENT.relationship_id_name]: clientId}
        return {filterExacts: filterExacts}
      }
    },
    methods: {
      getPersona: DisplayFunctions.getPersona,
      setInitialValues: function () {
        this.initialOrderCode = DefaultValuesHelper.simple(this.initialObject, OrderRequestPropertiesReference.ORDER_CODE.name)
        this.initialOrderRequestStatus = DefaultValuesHelper.object(this.initialObject, OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.name)
        this.initialClientContact = DefaultValuesHelper.object(this.initialObject, OrderRequestPropertiesReference.CLIENT_CONTACT.name)
        this.initialValues[OrderRequestPropertiesReference.CLIENT.name] = DefaultValuesHelper.object(this.initialObject, OrderRequestPropertiesReference.CLIENT.name)
        this.initialValues[OrderRequestPropertiesReference.PRODUCTS.name] = DefaultValuesHelper.array(this.initialObject, OrderRequestPropertiesReference.PRODUCTS.name)
        this.initialValues[OrderRequestPropertiesReference.DATE.name] = DefaultValuesHelper.simple(this.initialObject, OrderRequestPropertiesReference.DATE.name)
        this.initialValues[OrderRequestPropertiesReference.ESTIMATED_DELIVERY_DATE.name] = DefaultValuesHelper.simple(this.initialObject, OrderRequestPropertiesReference.ESTIMATED_DELIVERY_DATE.name)
      },
      save: function () {
        let directParams = {}
        directParams[OrderRequestPropertiesReference.ORDER_CODE.name] = this.requestOrder.orderCode
        directParams[OrderRequestPropertiesReference.DATE.name] = this.requestOrder.date
        directParams[OrderRequestPropertiesReference.ESTIMATED_DELIVERY_DATE.name] = this.requestOrder.estimatedDeliveryDate
        directParams[OrderRequestPropertiesReference.CLIENT_CONTACT.relationship_id_name] = this.requestOrder.clientContact ? this.requestOrder.clientContact[GlobalEntityIdentifier] : null
        directParams[OrderRequestPropertiesReference.CLIENT.relationship_id_name] = this.requestOrder.client ? this.requestOrder.client[GlobalEntityIdentifier] : null
        directParams[OrderRequestPropertiesReference.ORDER_REQUEST_STATUS.relationship_id_name] = this.requestOrder.orderRequestStatus ? this.requestOrder.orderRequestStatus[GlobalEntityIdentifier] : null
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
      'requestOrder.client': function (client) {
        let initialClientContactFound
        if (client && this.initialObject) {
          let initialClientContact = this.initialObject[OrderRequestPropertiesReference.CLIENT_CONTACT.name]
          if (client[GlobalEntityIdentifier] === initialClientContact['client_id']) {
            initialClientContactFound = initialClientContact
          }
        }
        this.initialClientContact = initialClientContactFound || {}
        this.requestOrder.clientContact = initialClientContactFound || {}
      }
    }
  }

</script>
