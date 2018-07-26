1<template>
  <div>
      <div>
          <div class="form-group">
              <div v-if="requestMode">
                  <mau-form-input-number
                          :initialValue="initialValues[OrderSaleRequestPropertiesReference.ORDER_CODE.name]"
                          v-model="salesOrder.orderCode"
                          :label="OrderSaleRequestPropertiesReference.ORDER_CODE.title"
                          :name="OrderSaleRequestPropertiesReference.ORDER_CODE.name"
                          :error="errors.first(OrderSaleRequestPropertiesReference.ORDER_CODE.name)"
                          v-validate="{
                        required: true,
                        remote_unique: {
                          entityType: entityType,
                          columnName: OrderSaleRequestPropertiesReference.ORDER_CODE.name,
                          initialValue: initialValues[OrderSaleRequestPropertiesReference.ORDER_CODE.name]
                        }
                      }"
                  >
                  </mau-form-input-number>
              </div>
              <div v-else>
                  <div class="form-group form-row">
                      <div class="col-sm-12">
                          <label><b>{{OrderSaleRequestPropertiesReference.ORDER_CODE.title}}</b></label>
                          <div>{{initialValues[OrderSaleRequestPropertiesReference.ORDER_CODE.name]}}</div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="form-group">
              <div v-if="requestMode">
                  <mau-form-input-date-time
                          :name="OrderSaleRequestPropertiesReference.DATE_REQUESTED.name"
                          :label="OrderSaleRequestPropertiesReference.DATE_REQUESTED.title"
                          v-model="salesOrder.date_requested"
                          :initialValue="initialValues[OrderSaleRequestPropertiesReference.DATE_REQUESTED.name]"
                          :error="errors.first(OrderSaleRequestPropertiesReference.DATE_REQUESTED.name)"
                          v-validate="'required'"
                  >
                  </mau-form-input-date-time>
              </div>
              <div v-else>
                  <div class="form-group form-row">
                      <div class="col-sm-12">
                          <label><b>{{OrderSaleRequestPropertiesReference.DATE_REQUESTED.title}}</b></label>
                          <div>{{initialValues[OrderSaleRequestPropertiesReference.DATE_REQUESTED.name]}}</div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="form-group">
              <div v-if="receiptMode">
                  <mau-form-input-date-time
                          :name="OrderSaleReceiptPropertiesReference.DATE_GIVEN.name"
                          :label="OrderSaleReceiptPropertiesReference.DATE_GIVEN.title"
                          v-model="salesOrder.date_given"
                          :initialValue="initialValues[OrderSaleReceiptPropertiesReference.DATE_GIVEN.name]"
                          :error="errors.first(OrderSaleReceiptPropertiesReference.DATE_GIVEN.name)"
                          v-validate="'required'"
                  >
                  </mau-form-input-date-time>
              </div>
          </div>
          <div class="form-group">
              <div v-if="requestMode">
                  <mau-form-input-select
                          :initialObject="initialValues[OrderSaleRequestPropertiesReference.CLIENT.name]"
                          :label="OrderSaleRequestPropertiesReference.CLIENT.title"
                          :displayProperty="'companyname'"
                          :entityType="clientEntityType"
                          v-model="salesOrder.client"
                          :name="OrderSaleRequestPropertiesReference.CLIENT.name"
                          :error="errors.first(OrderSaleRequestPropertiesReference.CLIENT.name)"
                          v-validate="'object_required'"
                  >
                  </mau-form-input-select>
              </div>
              <div v-else>
                  <div class="form-group form-row">
                      <div class="col-sm-12">
                          <label><b>{{OrderSaleRequestPropertiesReference.CLIENT.title}}</b></label>
                          <div>{{initialValues[OrderSaleRequestPropertiesReference.CLIENT.name].companyname}}</div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="form-group">
              <div v-if="receiptMode">
                  <mau-form-input-select
                          :initialObject="initialValues[OrderSaleReceiptPropertiesReference.RECEIPT_TYPE.name]"
                          :label="OrderSaleReceiptPropertiesReference.RECEIPT_TYPE.title"
                          :displayProperty="'name'"
                          :entityType="orderSaleReceiptTypeEntityType"
                          v-model="salesOrder.receiptType"
                          :name="OrderSaleReceiptPropertiesReference.RECEIPT_TYPE.name"
                          :error="errors.first(OrderSaleReceiptPropertiesReference.RECEIPT_TYPE.name)"
                          v-validate="'object_required'"
                  >
                  </mau-form-input-select>
              </div>
          </div>
          <div class="form-group">
              <div class="bags">
                    <mau-many-to-many-selector
                            :label="OrderSaleRequestPropertiesReference.BAGS.title"
                            :initialObjects="initialValues[OrderSaleRequestPropertiesReference.BAGS.name]"
                            v-model="salesOrder.bags"
                            :selectedEntityIdentifierName="'bag_id'"
                            :availableObjects="availableBags"
                            :name="OrderSaleRequestPropertiesReference.BAGS.name"
                    >
                        <template slot-scope="params">
                            <order-sale-table
                                    :requestMode="requestMode"
                                    :receiptMode="receiptMode"
                                    :hasTax="isInvoiceSelected"
                                    :structuredObjects="params.structuredObjects"
                                    @structuredObjectsChange="params.onTableChange"
                                    :hostEntityIdentifierName="'bag_id'"
                            >
                            </order-sale-table>
                        </template>
                    </mau-many-to-many-selector>
              </div>
          </div>
          <div class="container mb-2 text-right">
              <b-button :disabled="buttonDisabled" @click="save" type="button" variant="primary">Guardar</b-button>
          </div>
      </div>
  </div>
</template>

<script>
  import OrderSaleRequestPropertiesReference from 'renderer/api/propertiesReference/BagOrderSaleRequestPropertiesReference'
  import OrderSaleReceiptPropertiesReference from 'renderer/api/propertiesReference/BagOrderSaleReceiptPropertiesReference'
  import ValidatorHelper from 'renderer/services/form/ValidatorHelper'
  import MauFormInputText from 'renderer/components/mau-components/mau-form-inputs/MauFormInputText.vue'
  import MauFormInputNumber from 'renderer/components/mau-components/mau-form-inputs/MauFormInputNumber.vue'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import MauFormInputSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  import ManyToManyHelper from 'renderer/services/form/ManyToManyHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauFormInputDateTime from 'renderer/components/mau-components/mau-form-inputs/MauFormInputDateTime.vue'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  import OrderSaleTable from 'renderer/api/components/generic/bagOrder/components/BagOrderSaleTable.vue'
  import OrderTable from 'renderer/api/components/generic/bagOrder/components/BagOrderTable.vue'
  import ApiOperations from 'renderer/services/api/ApiOperations'
  import {mapState} from 'vuex'
  export default {
    name: 'MauSimpleOrderForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        OrderSaleRequestPropertiesReference: OrderSaleRequestPropertiesReference,
        OrderSaleReceiptPropertiesReference: OrderSaleReceiptPropertiesReference,
        salesOrder: {
          orderCode: '',
          bags: [],
          date_requested: '',
          date_given: '',
          client: {},
          receiptType: {}
        },
        initialValues: {},
        buttonDisabled: false,
        clientEntityType: EntityTypes.CLIENT,
        orderSaleReceiptTypeEntityType: EntityTypes.BAG_ORDER_SALE_RECEIPT_TYPE
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
        ApiOperations.getMax(this.entityType, OrderSaleRequestPropertiesReference.ORDER_CODE.name).then(result => {
          this.salesOrder.orderCode = result + 1
        })
      }
    },
    computed: {
      ...mapState({
        availableBags: state => {
          return state.api.entity.bags
        }
      }),
      isInvoiceSelected: function () {
        let receiptId = this.salesOrder.receiptType ? this.salesOrder.receiptType[GlobalEntityIdentifier] : 0
        return receiptId === 2
      }
    },
    methods: {
      createDefaultInitialValues: function () {
        for (let propertyReference in OrderSaleRequestPropertiesReference) {
          if (OrderSaleRequestPropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[OrderSaleRequestPropertiesReference[propertyReference].name] = OrderSaleRequestPropertiesReference[propertyReference].defaultValue
          }
        }
        for (let propertyReference in OrderSaleReceiptPropertiesReference) {
          if (OrderSaleReceiptPropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[OrderSaleReceiptPropertiesReference[propertyReference].name] = OrderSaleReceiptPropertiesReference[propertyReference].defaultValue
          }
        }
      },
      setInitialValues: function () {
        this.initialValues[OrderSaleRequestPropertiesReference.ORDER_CODE.name] = this.initialObject[OrderSaleRequestPropertiesReference.ORDER_CODE.name]
        this.initialValues[OrderSaleRequestPropertiesReference.BAGS.name] = this.initialObject[OrderSaleRequestPropertiesReference.BAGS.name]
        this.initialValues[OrderSaleRequestPropertiesReference.DATE_REQUESTED.name] = this.initialObject[OrderSaleRequestPropertiesReference.DATE_REQUESTED.name]
        this.initialValues[OrderSaleRequestPropertiesReference.CLIENT.name] = this.initialObject[OrderSaleRequestPropertiesReference.CLIENT.name]
        this.initialValues[OrderSaleReceiptPropertiesReference.RECEIPT_TYPE.name] = this.initialObject[OrderSaleReceiptPropertiesReference.RECEIPT_TYPE.name]
        this.initialValues[OrderSaleRequestPropertiesReference.ORDER_STATUS_TYPE.relationship_id_name] = this.initialObject[OrderSaleRequestPropertiesReference.ORDER_STATUS_TYPE.relationship_id_name]
        this.initialValues[OrderSaleReceiptPropertiesReference.DATE_GIVEN.name] = this.initialObject[OrderSaleReceiptPropertiesReference.DATE_GIVEN.name]
      },
      save: function () {
        let directParams = {}
        if (this.requestMode) {
          let initialOrderStatusId = this.initialValues[OrderSaleRequestPropertiesReference.ORDER_STATUS_TYPE.relationship_id_name]
          directParams[OrderSaleRequestPropertiesReference.ORDER_CODE.name] = this.salesOrder.orderCode
          directParams[OrderSaleRequestPropertiesReference.DATE_REQUESTED.name] = this.salesOrder.date_requested
          directParams[OrderSaleRequestPropertiesReference.CLIENT.relationship_id_name] = this.salesOrder.client ? this.salesOrder.client[GlobalEntityIdentifier] : 'null'
          directParams[OrderSaleRequestPropertiesReference.ORDER_STATUS_TYPE.relationship_id_name] = initialOrderStatusId && initialOrderStatusId > 1 ? initialOrderStatusId : 1
        }
        if (this.receiptMode) {
          directParams[OrderSaleReceiptPropertiesReference.DATE_GIVEN.name] = this.salesOrder.date_given
          directParams[OrderSaleReceiptPropertiesReference.RECEIPT_TYPE.relationship_id_name] = this.salesOrder.receiptType ? this.salesOrder.receiptType[GlobalEntityIdentifier] : 'null'
          directParams[OrderSaleRequestPropertiesReference.ORDER_STATUS_TYPE.relationship_id_name] = 2
        }
        let bagOrderEntityType = EntityTypes.BAG_ORDER_SALE_PRODUCT
        let relayObjects = [
          ManyToManyHelper.createRelayObject(this.salesOrder.bags, bagOrderEntityType)
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
