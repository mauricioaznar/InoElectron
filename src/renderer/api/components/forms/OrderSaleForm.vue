1<template>
  <div>
      <div>
          <div class="form-group">
              <mau-form-input-select-dynamic
                      :endpointName="orderSaleReceiptTypeEndpointName"
                      :initialObject="initialValues[OrderSalePropertiesReference.RECEIPT_TYPE.name]"
                      :label="OrderSalePropertiesReference.RECEIPT_TYPE.title"
                      :displayProperty="'name'"
                      v-model="salesOrder.receiptType"
                      :name="OrderSalePropertiesReference.RECEIPT_TYPE.name"
                      :error="errors.first(OrderSalePropertiesReference.RECEIPT_TYPE.name)"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group">
              <mau-form-input-number
                      :key="initialOrderCode"
                      :initialValue="initialOrderCode"
                      v-model="salesOrder.orderCode"
                      :label="OrderSalePropertiesReference.ORDER_CODE.title"
                      :name="OrderSalePropertiesReference.ORDER_CODE.name"
                      :error="errors.has(OrderSalePropertiesReference.ORDER_CODE.name) ? errors.first(OrderSalePropertiesReference.ORDER_CODE.name) : ''"
                      :disabled="!userHasWritePrivileges"
                      v-validate="{
                        required: true,
                        remote_unique: {
                          endpointName: orderSaleEndpointName,
                          columnName: OrderSalePropertiesReference.ORDER_CODE.name,
                          initialValue: initialOrderCode
                        }
                       }"
              >
              </mau-form-input-number>
          </div>
          <div class="form-group" v-if="salesOrder.receiptType && salesOrder.receiptType.id === 2">
              <mau-form-input-text
                      :initialValue="initialValues[OrderSalePropertiesReference.INVOICE_CODE.name]"
                      v-model="salesOrder.invoiceCode"
                      :label="OrderSalePropertiesReference.INVOICE_CODE.title"
                      :name="OrderSalePropertiesReference.INVOICE_CODE.name"
                      :error="errors.has(OrderSalePropertiesReference.INVOICE_CODE.name) ? errors.first(OrderSalePropertiesReference.INVOICE_CODE.name) : ''"
                      :disabled="!userHasWritePrivileges"
                      v-validate="{
                        required: true
                       }"
              >
              </mau-form-input-text>
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
              <mau-form-input-select-dynamic
                      :initialObject="initialValues[OrderRequestPropertiesReference.CLIENT.name]"
                      :label="OrderRequestPropertiesReference.CLIENT.title"
                      :displayProperty="'name'"
                      :endpointName="clientEndpointName"
                      v-model="salesOrder.client"
                      :name="OrderRequestPropertiesReference.CLIENT.name"
                      :error="errors.first(OrderRequestPropertiesReference.CLIENT.name)"
                      :disabled="true"
                      v-validate="'object_required'"
              >
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group">
              <mau-form-input-select-dynamic
                      :endpointName="clientContactEndpointName"
                      :apiOperationOptions="clientContactApiOperationsOptions"
                      :initialObject="initialValues[OrderSalePropertiesReference.CLIENT_CONTACT.name]"
                      :label="OrderSalePropertiesReference.CLIENT_CONTACT.title"
                      :displayProperty="'fullname'"
                      v-model="salesOrder.clientContact"
                      :name="OrderSalePropertiesReference.CLIENT_CONTACT.name"
                      :error="errors.first(OrderSalePropertiesReference.CLIENT_CONTACT.name)"
                      :disabled="!userHasWritePrivileges"
                      v-validate="'object_required'"
              >
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group">
              <mau-form-input-select-dynamic
                      :endpointName="orderSaleStatusEndpointName"
                      :key="initialOrderSaleStatus ? initialOrderSaleStatus[GlobalEntityIdentifier] : 0"
                      :initialObject="initialOrderSaleStatus"
                      :label="OrderSalePropertiesReference.ORDER_SALE_STATUS.title"
                      :displayProperty="'name'"
                      v-model="salesOrder.orderSaleStatus"
                      :name="OrderSalePropertiesReference.ORDER_SALE_STATUS.name"
                      :error="errors.first(OrderSalePropertiesReference.ORDER_SALE_STATUS.name)"
                      :disabled="!isAdminUser"
                      v-validate="'object_required'"
              >
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group">
              <div class="products">
                    <mau-form-input-select-dynamic
                            :key="'OrderSaleProducts' + (salesOrder.receiptType ? salesOrder.receiptType.id : 0) + '' "
                            :endpointName="productEndpointName"
                            :label="OrderSalePropertiesReference.PRODUCTS.title"
                            :initialObjects="initialValues[OrderSalePropertiesReference.PRODUCTS.name]"
                            v-model="salesOrder.products"
                            :displayProperty="'description'"
                            :name="OrderSalePropertiesReference.PRODUCTS.name"
                            :selectedPropertyName="'product_id'"
                            :data-vv-as="'Productos'"
                            :error="errors.first(OrderSalePropertiesReference.PRODUCTS.name)"
                            :multiselect="true"
                            :disabled="!userHasWritePrivileges"
                            v-validate="{
                              required: true,
                              in_array: {
                                array: requestedProducts
                              }
                            }"
                    >
                        <template slot-scope="params">
                            <order-sale-product-table
                                    :saleMode="!isReplacementStatusSelected"
                                    :hasTax="isInvoiceSelected"
                                    :selectedProducts="salesOrder.products"
                                    :requestedProducts="requestedProducts"
                                    v-model="salesOrder.saleProducts"
                                    :initialProducts="initialValues[OrderSalePropertiesReference.PRODUCTS.name]"
                                    :userHasWritePrivileges="userHasWritePrivileges"
                                    @total="handleProductsTotal"
                            >
                            </order-sale-product-table>
                        </template>
                    </mau-form-input-select-dynamic>
              </div>
          </div>
          <div class="form-group form-row"
            v-if="!isReplacementStatusSelected"
          >
            <div class="col-sm-12">
                <OrderSalePayments
                    :key="'Payments' + total"
                    :initialValues="initialValues[OrderSalePropertiesReference.ORDER_SALE_PAYMENTS.name]"
                    v-model="salesOrder.orderSalePayments"
                    :userHasWritePrivileges="userHasWritePrivileges"
                    :total="total"
                >

                </OrderSalePayments>
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
  import ClientPropertiesReference from 'renderer/api/propertiesReference/ClientContactPropertiesReference'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import OrderSaleProductTable from 'renderer/api/components/m2m/OrderSaleProductTable.vue'
  import OrderSalePayments from 'renderer/api/components/m2m/OrderSalePayments'
  import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
  import SpecificApiOperations from 'renderer/api/functions/SpecificApiOperations'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
  import DisplayFunctions from 'renderer/api/functions/DisplayFunctions'
  import {mapGetters} from 'vuex'
  export default {
    name: 'MauSimpleOrderForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        OrderSalePropertiesReference: OrderSalePropertiesReference,
        OrderRequestPropertiesReference: OrderRequestPropertiesReference,
        GlobalEntityIdentifier: GlobalEntityIdentifier,
        salesOrder: {
          orderCode: '',
          products: [],
          saleProducts: [],
          date: '',
          clientContact: {},
          client: {},
          orderSaleStatus: {},
          receiptType: {},
          invoiceCode: '',
          orderSalePayments: []
        },
        total: 0,
        initialOrderCode: '',
        initialValues: {},
        buttonDisabled: false,
        requestedProducts: [],
        clientContactEndpointName: EntityTypes.CLIENT_CONTACT.apiName,
        clientEndpointName: EntityTypes.CLIENT.apiName,
        orderSaleStatusEndpointName: EntityTypes.ORDER_SALE_STATUS.apiName,
        productEndpointName: EntityTypes.PRODUCT.apiName,
        orderSaleEndpointName: EntityTypes.ORDER_SALE.apiName,
        orderSaleReceiptTypeEndpointName: EntityTypes.ORDER_SALE_RECEIPT_TYPE.apiName,
        initialOrderSaleStatus: {}
      }
    },
    components: {
      MauFormInputSelectDynamic,
      OrderSaleProductTable,
      OrderSalePayments
    },
    props: {
      initialObject: {
        type: Object
      },
      saveFunction: {
        type: Function,
        required: true
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
        SpecificApiOperations.getMax(this.orderSaleEndpointName, OrderSalePropertiesReference.ORDER_CODE.name).then(result => {
          this.initialOrderCode = result + 1
        })
        GenericApiOperations.getById(this.orderSaleStatusEndpointName, 1).then(result => {
          this.initialOrderSaleStatus = result
        })
        this.overrideInitialValuesWithOrderRequest()
      }
    },
    computed: {
      ...mapGetters([
        'isAdminUser'
      ]),
      userHasWritePrivileges: function () {
        return this.isAdminUser || !this.initialObject
      },
      isInvoiceSelected: function () {
        let receiptId
        if (this.initialValues && this.initialValues[OrderSalePropertiesReference.RECEIPT_TYPE.name]) {
          receiptId = this.initialValues[OrderSalePropertiesReference.RECEIPT_TYPE.name][GlobalEntityIdentifier]
        }
        if (this.salesOrder.receiptType && this.salesOrder.receiptType[GlobalEntityIdentifier]) {
          receiptId = this.salesOrder.receiptType[GlobalEntityIdentifier]
        }
        return receiptId === 2
      },
      isReplacementStatusSelected: function () {
        let receiptId
        if (this.initialValues && this.initialValues[OrderSalePropertiesReference.RECEIPT_TYPE.name]) {
          receiptId = this.initialValues[OrderSalePropertiesReference.RECEIPT_TYPE.name][GlobalEntityIdentifier]
        }
        if (this.salesOrder.receiptType && this.salesOrder.receiptType[GlobalEntityIdentifier]) {
          receiptId = this.salesOrder.receiptType[GlobalEntityIdentifier]
        }
        return receiptId === 3
      },
      clientContactApiOperationsOptions: function () {
        let filterExacts = {[ClientPropertiesReference.CLIENT.relationship_id_name]: this.orderRequest[OrderRequestPropertiesReference.CLIENT.relationship_id_name]}
        return {filterExacts: filterExacts}
      }
    },
    methods: {
      handleProductsTotal: function (total) {
        this.total = total
      },
      getPersona: DisplayFunctions.getPersona,
      setInitialValues: function () {
        this.initialOrderCode = DefaultValuesHelper.simple(this.initialObject, OrderSalePropertiesReference.ORDER_CODE.name)
        this.initialValues[OrderSalePropertiesReference.INVOICE_CODE.name] = DefaultValuesHelper.simple(this.initialObject, OrderSalePropertiesReference.INVOICE_CODE.name)
        this.initialValues[OrderSalePropertiesReference.PRODUCTS.name] = DefaultValuesHelper.array(this.initialObject, OrderSalePropertiesReference.PRODUCTS.name)
        this.initialValues[OrderSalePropertiesReference.ORDER_SALE_PAYMENTS.name] = DefaultValuesHelper.array(this.initialObject, OrderSalePropertiesReference.ORDER_SALE_PAYMENTS.name)
        this.initialValues[OrderSalePropertiesReference.DATE.name] = DefaultValuesHelper.simple(this.initialObject, OrderSalePropertiesReference.DATE.name)
        this.initialValues[OrderSalePropertiesReference.CLIENT_CONTACT.name] = DefaultValuesHelper.object(this.initialObject, OrderSalePropertiesReference.CLIENT_CONTACT.name)
        this.initialValues[OrderRequestPropertiesReference.CLIENT.name] = DefaultValuesHelper.object(this.orderRequest, OrderRequestPropertiesReference.CLIENT.name)
        this.initialValues[OrderSalePropertiesReference.RECEIPT_TYPE.name] = DefaultValuesHelper.object(this.initialObject, OrderSalePropertiesReference.RECEIPT_TYPE.name)
        this.initialOrderSaleStatus = DefaultValuesHelper.object(this.initialObject, OrderSalePropertiesReference.ORDER_SALE_STATUS.name)
        this.requestedProducts = [...this.orderRequest.products]
          .map(requestProduct => {
            let kilosInSales = requestProduct.pivot.kilos
            let groupsInSales = requestProduct.pivot.groups
            this.orderRequest.order_sales.forEach(orderSale => {
              orderSale.products.forEach(saleProduct => {
                console.log(saleProduct)
                if (requestProduct.id === saleProduct.id) {
                  console.log('found')
                  kilosInSales -= saleProduct.pivot.kilos
                  groupsInSales -= saleProduct.pivot.groups
                }
              })
            })
            return {
              ...requestProduct,
              pivot: {
                ...requestProduct.pivot,
                kilos: kilosInSales,
                groups: groupsInSales
              }
            }
          })
          .filter(requestProduct => {
            return requestProduct.pivot.kilos > 0 && requestProduct.pivot.groups > 0
          })
      },
      overrideInitialValuesWithOrderRequest: function () {
        this.initialValues[OrderSalePropertiesReference.PRODUCTS.name] = this.requestedProducts
        this.initialValues[OrderSalePropertiesReference.CLIENT_CONTACT.name] = this.orderRequest[OrderRequestPropertiesReference.CLIENT_CONTACT.name]
        this.initialValues[OrderSalePropertiesReference.CLIENT.name] = this.orderRequest[OrderRequestPropertiesReference.CLIENT.name]
      },
      save: function () {
        let directParams = {}
        directParams[OrderSalePropertiesReference.ORDER_CODE.name] = this.salesOrder.orderCode
        directParams[OrderSalePropertiesReference.DATE.name] = this.salesOrder.date
        directParams[OrderSalePropertiesReference.CLIENT_CONTACT.relationship_id_name] = this.salesOrder.clientContact ? this.salesOrder.clientContact[GlobalEntityIdentifier] : null
        directParams[OrderSalePropertiesReference.RECEIPT_TYPE.relationship_id_name] = this.salesOrder.receiptType ? this.salesOrder.receiptType[GlobalEntityIdentifier] : null
        directParams[OrderSalePropertiesReference.ORDER_SALE_STATUS.relationship_id_name] = this.salesOrder.orderSaleStatus ? this.salesOrder.orderSaleStatus[GlobalEntityIdentifier] : null
        let initialOrderSaleProducts = ManyToManyHelper.createM2MStructuredObjects(this.initialValues[OrderSalePropertiesReference.PRODUCTS.name], 'product_id')
        let filteredOrderSaleProducts = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialOrderSaleProducts, this.salesOrder.saleProducts, 'product_id')
        if (directParams[OrderSalePropertiesReference.RECEIPT_TYPE.relationship_id_name] === 2) {
          directParams[OrderSalePropertiesReference.INVOICE_CODE.name] = this.salesOrder.invoiceCode
        } else {
          directParams[OrderSalePropertiesReference.INVOICE_CODE.name] = 0
        }
        let filteredOrderSalePayments =
          ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(
            this.initialValues[OrderSalePropertiesReference.ORDER_SALE_PAYMENTS.name],
            !this.isReplacementStatusSelected ? this.salesOrder.orderSalePayments : [],
            'id'
          )
        if (!this.initialObject) {
          directParams[OrderSalePropertiesReference.ORDER_REQUEST.relationship_id_name] = this.orderRequest ? this.orderRequest[GlobalEntityIdentifier] : null
          filteredOrderSaleProducts = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations([], this.salesOrder.saleProducts, 'product_id')
        }
        let relayObjects = [
          ManyToManyHelper.createRelayObject(filteredOrderSaleProducts, EntityTypes.ORDER_SALE_PRODUCT),
          ManyToManyHelper.createRelayObject(filteredOrderSalePayments, EntityTypes.ORDER_SALE_PAYMENT)
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
