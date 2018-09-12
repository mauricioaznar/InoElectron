1<template>
  <div>
      <div>
          <div class="form-group">
              <mau-form-input-number
                      :key="initialOrderCode"
                      :initialValue="initialOrderCode"
                      v-model="salesOrder.orderCode"
                      :label="OrderSalePropertiesReference.ORDER_CODE.title"
                      :name="OrderSalePropertiesReference.ORDER_CODE.name"
                      :error="errors.first(OrderSalePropertiesReference.ORDER_CODE.name)"
                      :disabled="!userHasWritePrivileges"
                      v-validate="{
                        required: true,
                        remote_unique: {
                          entityType: orderSaleEntityType,
                          columnName: OrderSalePropertiesReference.ORDER_CODE.name,
                          initialValue: initialOrderCode
                        }
                       }"
              >
              </mau-form-input-number>
          </div>
          <div class="form-group">
              <mau-form-input-date
                      :name="OrderSalePropertiesReference.DATE.name"
                      :label="OrderSalePropertiesReference.DATE.title"
                      v-model="salesOrder.date"
                      :initialValue="initialValues[OrderSalePropertiesReference.DATE.name]"
                      :error="errors.first(OrderSalePropertiesReference.DATE.name)"
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
                      v-model="salesOrder.company"
                      :name="OrderRequestPropertiesReference.COMPANY.name"
                      :error="errors.first(OrderRequestPropertiesReference.COMPANY.name)"
                      :disabled="true"
                      v-validate="'object_required'"
              >
              </mau-form-input-select>
          </div>
          <div class="form-group">
              <mau-form-input-select
                      :initialObject="initialValues[OrderSalePropertiesReference.CLIENT.name]"
                      :label="OrderSalePropertiesReference.CLIENT.title"
                      :displayProperty="'full_name'"
                      :searchedProperties="['first_name', 'last_name']"
                      :entityType="clientEntityType"
                      v-model="salesOrder.client"
                      :filterExact="clientFilterExact"
                      :name="OrderSalePropertiesReference.CLIENT.name"
                      :error="errors.first(OrderSalePropertiesReference.CLIENT.name)"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select>
          </div>
          <div class="form-group">
              <mau-form-input-select
                      :initialObject="initialValues[OrderSalePropertiesReference.ORDER_SALE_STATUS.name]"
                      :label="OrderSalePropertiesReference.ORDER_SALE_STATUS.title"
                      :displayProperty="'name'"
                      :entityType="orderSaleStatusEntityType"
                      v-model="salesOrder.orderSaleStatus"
                      :name="OrderSalePropertiesReference.ORDER_SALE_STATUS.name"
                      :error="errors.first(OrderSalePropertiesReference.ORDER_SALE_STATUS.name)"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select>
          </div>
          <div class="form-group">
              <mau-form-input-select
                      :initialObject="initialValues[OrderSalePropertiesReference.RECEIPT_TYPE.name]"
                      :label="OrderSalePropertiesReference.RECEIPT_TYPE.title"
                      :displayProperty="'name'"
                      :entityType="orderSaleReceiptTypeEntityType"
                      v-model="salesOrder.receiptType"
                      :name="OrderSalePropertiesReference.RECEIPT_TYPE.name"
                      :error="errors.first(OrderSalePropertiesReference.RECEIPT_TYPE.name)"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select>
          </div>
          <div class="form-group">
              <div class="products">
                    <mau-form-input-select
                            :label="OrderSalePropertiesReference.PRODUCTS.title"
                            :initialObjects="initialValues[OrderSalePropertiesReference.PRODUCTS.name]"
                            v-model="salesOrder.products"
                            :displayProperty="'code'"
                            :name="OrderSalePropertiesReference.PRODUCTS.name"
                            :selectedPropertyName="'product_id'"
                            :data-vv-as="'Productos'"
                            :error="errors.first(OrderSalePropertiesReference.PRODUCTS.name)"
                            :entityType="productEntityType"
                            :multi="true"
                            :disabled="!userHasWritePrivileges"
                            v-validate="'array_required'"
                    >
                        <template slot-scope="params">
                            <order-sale-product-table
                                    :saleMode="true"
                                    :hasTax="isInvoiceSelected"
                                    :selectedProducts="salesOrder.products"
                                    v-model="salesOrder.saleProducts"
                                    :initialProducts="initialValues[OrderSalePropertiesReference.PRODUCTS.name]"
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
  import OrderSalePropertiesReference from 'renderer/api/propertiesReference/OrderSalePropertiesReference'
  import OrderRequestPropertiesReference from 'renderer/api/propertiesReference/OrderRequestPropertiesReference'
  import ClientPropertiesReference from 'renderer/api/propertiesReference/ClientPropertiesReference'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import MauFormInputText from 'renderer/api/components/inputs/MauFormInputText.vue'
  import MauFormInputNumber from 'renderer/api/components/inputs/MauFormInputNumber.vue'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauFormInputDate from 'renderer/api/components/inputs/MauFormInputDate.vue'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import OrderSaleProductTable from 'renderer/api/components/m2m/OrderSaleProductTable.vue'
  import ApiOperations from 'renderer/api/functions/ApiOperations'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import {mapState} from 'vuex'
  export default {
    name: 'MauSimpleOrderForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        OrderSalePropertiesReference: OrderSalePropertiesReference,
        OrderRequestPropertiesReference: OrderRequestPropertiesReference,
        salesOrder: {
          orderCode: '',
          products: [],
          saleProducts: [],
          date: '',
          client: {},
          company: {},
          orderSaleStatus: {},
          receiptType: {}
        },
        initialOrderCode: '',
        initialValues: {},
        buttonDisabled: false,
        clientFilterExact: {},
        clientEntityType: EntityTypes.CLIENT,
        companyEntityType: EntityTypes.COMPANY,
        orderSaleStatusEntityType: EntityTypes.ORDER_SALE_STATUS,
        productEntityType: EntityTypes.PRODUCT,
        orderSaleEntityType: EntityTypes.ORDER_SALE,
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
      userHasWritePrivileges: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      orderRequest: {
        type: Object,
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
      if (!this.initialObject) {
        ApiOperations.getMax(this.orderSaleEntityType, OrderSalePropertiesReference.ORDER_CODE.name).then(result => {
          this.initialOrderCode = result + 1
        })
        this.overrideInitialValuesWithOrderRequest()
      }
      this.clientFilterExact = {[ClientPropertiesReference.COMPANY.relationship_id_name]: this.orderRequest[OrderRequestPropertiesReference.COMPANY.relationship_id_name]}
    },
    computed: {
      ...mapState({
        availableProducts: state => {
          return state.api.entity.products
        }
      }),
      isInvoiceSelected: function () {
        let receiptId
        if (this.initialValues && this.initialValues[OrderSalePropertiesReference.RECEIPT_TYPE.name]) {
          receiptId = this.initialValues[OrderSalePropertiesReference.RECEIPT_TYPE.name][GlobalEntityIdentifier]
        }
        if (this.salesOrder.receiptType && this.salesOrder.receiptType[GlobalEntityIdentifier]) {
          receiptId = this.salesOrder.receiptType[GlobalEntityIdentifier]
        }
        return receiptId === 2
      }
    },
    methods: {
      getPersona: DisplayFunctions.getPersona,
      setInitialValues: function () {
        this.initialOrderCode = DefaultValuesHelper.simple(this.initialObject, OrderSalePropertiesReference.ORDER_CODE.name)
        this.initialValues[OrderSalePropertiesReference.PRODUCTS.name] = DefaultValuesHelper.array(this.initialObject, OrderSalePropertiesReference.PRODUCTS.name)
        this.initialValues[OrderSalePropertiesReference.DATE.name] = DefaultValuesHelper.simple(this.initialObject, OrderSalePropertiesReference.DATE.name)
        this.initialValues[OrderSalePropertiesReference.CLIENT.name] = DefaultValuesHelper.object(this.initialObject, OrderSalePropertiesReference.CLIENT.name)
        this.initialValues[OrderRequestPropertiesReference.COMPANY.name] = DefaultValuesHelper.object(this.orderRequest, OrderRequestPropertiesReference.COMPANY.name)
        this.initialValues[OrderSalePropertiesReference.RECEIPT_TYPE.name] = DefaultValuesHelper.object(this.initialObject, OrderSalePropertiesReference.RECEIPT_TYPE.name)
        this.initialValues[OrderSalePropertiesReference.ORDER_SALE_STATUS.name] = DefaultValuesHelper.object(this.initialObject, OrderSalePropertiesReference.ORDER_SALE_STATUS.name)
      },
      overrideInitialValuesWithOrderRequest: function () {
        this.initialValues[OrderSalePropertiesReference.PRODUCTS.name] = this.orderRequest[OrderRequestPropertiesReference.PRODUCTS.name]
        this.initialValues[OrderSalePropertiesReference.CLIENT.name] = this.orderRequest[OrderRequestPropertiesReference.CLIENT.name]
        this.initialValues[OrderSalePropertiesReference.COMPANY.name] = this.orderRequest[OrderRequestPropertiesReference.COMPANY.name]
      },
      save: function () {
        let directParams = {}
        directParams[OrderSalePropertiesReference.ORDER_CODE.name] = this.salesOrder.orderCode
        directParams[OrderSalePropertiesReference.DATE.name] = this.salesOrder.date
        directParams[OrderSalePropertiesReference.CLIENT.relationship_id_name] = this.salesOrder.client ? this.salesOrder.client[GlobalEntityIdentifier] : 'null'
        directParams[OrderSalePropertiesReference.RECEIPT_TYPE.relationship_id_name] = this.salesOrder.receiptType ? this.salesOrder.receiptType[GlobalEntityIdentifier] : 'null'
        directParams[OrderSalePropertiesReference.ORDER_SALE_STATUS.relationship_id_name] = this.salesOrder.orderSaleStatus ? this.salesOrder.orderSaleStatus[GlobalEntityIdentifier] : 'null'
        let initialOrderSaleProducts = ManyToManyHelper.createM2MStructuredObjects(this.initialValues[OrderSalePropertiesReference.PRODUCTS.name], 'product_id')
        let filteredOrderSaleProducts = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialOrderSaleProducts, this.salesOrder.saleProducts, 'product_id')
        if (!this.initialObject) {
          directParams[OrderSalePropertiesReference.ORDER_REQUEST.relationship_id_name] = this.orderRequest ? this.orderRequest[GlobalEntityIdentifier] : 'null'
          filteredOrderSaleProducts = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations([], this.salesOrder.saleProducts, 'product_id')
        }
        let relayObjects = [
          ManyToManyHelper.createRelayObject(filteredOrderSaleProducts, EntityTypes.ORDER_SALE_PRODUCT)
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
      }
    }
  }

</script>
