1<template>
  <div>
      <div>
          <div class="form-group">
              <div v-if="requestMode">
                  <mau-form-input-number
                          :initialValue="initialValues[OrderSalePropertiesReference.ORDER_CODE.name]"
                          v-model="salesOrder.orderCode"
                          :label="OrderSalePropertiesReference.ORDER_CODE.title"
                          :name="OrderSalePropertiesReference.ORDER_CODE.name"
                          :error="errors.first(OrderSalePropertiesReference.ORDER_CODE.name)"
                          v-validate="{
                            required: true,
                            remote_unique: {
                              entityType: entityType,
                              columnName: OrderSalePropertiesReference.ORDER_CODE.name,
                              initialValue: String(initialValues[OrderSalePropertiesReference.ORDER_CODE.name])
                            }
                           }"
                  >
                  </mau-form-input-number>
              </div>
              <div v-else>
                  <div class="form-group form-row">
                      <div class="col-sm-12">
                          <label><b>{{OrderSalePropertiesReference.ORDER_CODE.title}}</b></label>
                          <div>{{initialValues[OrderSalePropertiesReference.ORDER_CODE.name]}}</div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="form-group">
              <div v-if="requestMode">
                  <mau-form-input-date-time
                          :name="OrderSalePropertiesReference.DATE_REQUESTED.name"
                          :label="OrderSalePropertiesReference.DATE_REQUESTED.title"
                          v-model="salesOrder.date_requested"
                          :initialValue="initialValues[OrderSalePropertiesReference.DATE_REQUESTED.name]"
                          :error="errors.first(OrderSalePropertiesReference.DATE_REQUESTED.name)"
                          v-validate="'required'"
                  >
                  </mau-form-input-date-time>
              </div>
              <div v-else>
                  <div class="form-group form-row">
                      <div class="col-sm-12">
                          <label><b>{{OrderSalePropertiesReference.DATE_REQUESTED.title}}</b></label>
                          <div>{{initialValues[OrderSalePropertiesReference.DATE_REQUESTED.name]}}</div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="form-group">
              <div v-if="receiptMode">
                  <mau-form-input-date-time
                          :name="OrderSalePropertiesReference.DATE_GIVEN.name"
                          :label="OrderSalePropertiesReference.DATE_GIVEN.title"
                          v-model="salesOrder.date_given"
                          :initialValue="initialValues[OrderSalePropertiesReference.DATE_GIVEN.name]"
                          :error="errors.first(OrderSalePropertiesReference.DATE_GIVEN.name)"
                          v-validate="'required'"
                  >
                  </mau-form-input-date-time>
              </div>
          </div>
          <div class="form-group">
              <div v-if="requestMode">
                  <mau-form-input-select
                          :initialObject="initialValues[OrderSalePropertiesReference.CLIENT.name]"
                          :label="OrderSalePropertiesReference.CLIENT.title"
                          :displayProperty="'companyname'"
                          :entityType="clientEntityType"
                          v-model="salesOrder.client"
                          :name="OrderSalePropertiesReference.CLIENT.name"
                          :error="errors.first(OrderSalePropertiesReference.CLIENT.name)"
                          v-validate="'object_required'"
                  >
                  </mau-form-input-select>
              </div>
              <div v-else>
                  <div class="form-group form-row">
                      <div class="col-sm-12">
                          <label><b>{{OrderSalePropertiesReference.CLIENT.title}}</b></label>
                          <div>{{initialValues[OrderSalePropertiesReference.CLIENT.name].companyname}}</div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="form-group">
              <div v-if="requestMode">
                  <mau-form-input-select
                          :initialObject="initialValues[OrderSalePropertiesReference.RECEIPT_TYPE.name]"
                          :label="OrderSalePropertiesReference.RECEIPT_TYPE.title"
                          :displayProperty="'name'"
                          :entityType="orderSaleReceiptTypeEntityType"
                          v-model="salesOrder.receiptType"
                          :name="OrderSalePropertiesReference.RECEIPT_TYPE.name"
                          :error="errors.first(OrderSalePropertiesReference.RECEIPT_TYPE.name)"
                          v-validate="'object_required'"
                  >
                  </mau-form-input-select>
              </div>
              <div v-else>
                  <div class="form-group form-row">
                      <div class="col-sm-12">
                          <label><b>{{OrderSalePropertiesReference.RECEIPT_TYPE.title}}</b></label>
                          <div>{{initialValues[OrderSalePropertiesReference.RECEIPT_TYPE.name].name}}</div>
                      </div>
                  </div>
              </div>
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
                            v-validate="'array_required'"
                    >
                        <template slot-scope="params">
                            <order-sale-table
                                    :requestMode="requestMode"
                                    :receiptMode="receiptMode"
                                    :hasTax="isInvoiceSelected"
                                    :selectedProducts="salesOrder.products"
                                    v-model="salesOrder.saleProducts"
                                    :initialProducts="initialValues[OrderSalePropertiesReference.PRODUCTS.name]"
                            >
                            </order-sale-table>
                        </template>
                    </mau-form-input-select>
              </div>
          </div>
          <div class="container mb-2 text-right">
              <b-button :disabled="buttonDisabled" @click="save" type="button" variant="primary">Guardar</b-button>
          </div>
      </div>
  </div>
</template>

<script>
  import OrderSalePropertiesReference from 'renderer/api/propertiesReference/OrderSalePropertiesReference'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import MauFormInputText from 'renderer/api/components/inputs/MauFormInputText.vue'
  import MauFormInputNumber from 'renderer/api/components/inputs/MauFormInputNumber.vue'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauFormInputDateTime from 'renderer/api/components/inputs/MauFormInputDateTime.vue'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import OrderSaleTable from 'renderer/api/components/tables/OrderSaleTable.vue'
  import OrderTable from 'renderer/api/components/tables/OrderProductionTable.vue'
  import ApiOperations from 'renderer/api/functions/ApiOperations'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import {mapState} from 'vuex'
  export default {
    name: 'MauSimpleOrderForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        OrderSalePropertiesReference: OrderSalePropertiesReference,
        salesOrder: {
          orderCode: '',
          products: [],
          saleProducts: [],
          date_requested: '',
          date_given: '',
          client: {},
          receiptType: {}
        },
        initialValues: {},
        buttonDisabled: false,
        clientEntityType: EntityTypes.CLIENT,
        productEntityType: EntityTypes.PRODUCT,
        orderSaleReceiptTypeEntityType: EntityTypes.ORDER_SALE_RECEIPT_TYPE
      }
    },
    components: {
      MauFormInputSelect,
      MauFormInputDateTime,
      MauFormInputText,
      MauFormInputNumber,
      OrderSaleTable,
      OrderTable
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
      this.createDefaultInitialValues()
      if (this.initialObject) {
        this.setInitialValues()
      } else {
        ApiOperations.getMax(this.entityType, OrderSalePropertiesReference.ORDER_CODE.name).then(result => {
          this.salesOrder.orderCode = result + 1
        })
      }
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
      createDefaultInitialValues: function () {
        for (let propertyReference in OrderSalePropertiesReference) {
          if (OrderSalePropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[OrderSalePropertiesReference[propertyReference].name] = OrderSalePropertiesReference[propertyReference].defaultValue
          }
        }
        for (let propertyReference in OrderSalePropertiesReference) {
          if (OrderSalePropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[OrderSalePropertiesReference[propertyReference].name] = OrderSalePropertiesReference[propertyReference].defaultValue
          }
        }
      },
      setInitialValues: function () {
        this.initialValues[OrderSalePropertiesReference.ORDER_CODE.name] = this.initialObject[OrderSalePropertiesReference.ORDER_CODE.name]
        this.initialValues[OrderSalePropertiesReference.PRODUCTS.name] = this.initialObject[OrderSalePropertiesReference.PRODUCTS.name]
        this.initialValues[OrderSalePropertiesReference.DATE_REQUESTED.name] = this.initialObject[OrderSalePropertiesReference.DATE_REQUESTED.name]
        this.initialValues[OrderSalePropertiesReference.CLIENT.name] = this.initialObject[OrderSalePropertiesReference.CLIENT.name]
        this.initialValues[OrderSalePropertiesReference.RECEIPT_TYPE.name] = this.initialObject[OrderSalePropertiesReference.RECEIPT_TYPE.name]
        this.initialValues[OrderSalePropertiesReference.ORDER_SALE_TYPE.relationship_id_name] = this.initialObject[OrderSalePropertiesReference.ORDER_SALE_TYPE.relationship_id_name]
        this.initialValues[OrderSalePropertiesReference.DATE_GIVEN.name] = this.initialObject[OrderSalePropertiesReference.DATE_GIVEN.name]
      },
      save: function () {
        let directParams = {}
        if (this.requestMode) {
          let initialOrderStatusId = this.initialValues[OrderSalePropertiesReference.ORDER_SALE_TYPE.relationship_id_name]
          directParams[OrderSalePropertiesReference.ORDER_CODE.name] = this.salesOrder.orderCode
          directParams[OrderSalePropertiesReference.DATE_REQUESTED.name] = this.salesOrder.date_requested
          directParams[OrderSalePropertiesReference.CLIENT.relationship_id_name] = this.salesOrder.client ? this.salesOrder.client[GlobalEntityIdentifier] : 'null'
          directParams[OrderSalePropertiesReference.RECEIPT_TYPE.relationship_id_name] = this.salesOrder.receiptType ? this.salesOrder.receiptType[GlobalEntityIdentifier] : 'null'
          directParams[OrderSalePropertiesReference.ORDER_SALE_TYPE.relationship_id_name] = initialOrderStatusId && initialOrderStatusId > 1 ? initialOrderStatusId : 1
        }
        if (this.receiptMode) {
          directParams[OrderSalePropertiesReference.DATE_GIVEN.name] = this.salesOrder.date_given
          directParams[OrderSalePropertiesReference.ORDER_SALE_TYPE.relationship_id_name] = 2
        }
        let relayObjects = [
          ManyToManyHelper.createRelayObject(this.salesOrder.saleProducts, EntityTypes.ORDER_SALE_PRODUCT)
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
