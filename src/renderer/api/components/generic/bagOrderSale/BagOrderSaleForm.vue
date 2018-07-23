1<template>
  <div>
      <div>
          <div class="form-group">
              <div v-if="requestMode">
                  <mau-form-input-number
                          :initialValue="initialValues[OrderSalePropertiesReference.ORDER_CODE.name]"
                          v-model="productionOrder.orderCode"
                          :label="OrderSalePropertiesReference.ORDER_CODE.title"
                          :name="OrderSalePropertiesReference.ORDER_CODE.name"
                          :error="errors.first(OrderSalePropertiesReference.ORDER_CODE.name)"
                          v-validate="{
                        required: true,
                        remote_unique: {
                          entityType: entityType,
                          columnName: OrderSalePropertiesReference.ORDER_CODE.name,
                          initialValue: initialValues[OrderSalePropertiesReference.ORDER_CODE.name]
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
                          :name="OrderSalePropertiesReference.DATE.name"
                          :label="OrderSalePropertiesReference.DATE.title"
                          v-model="productionOrder.date"
                          :initialValue="initialValues[OrderSalePropertiesReference.DATE.name]"
                          :error="errors.first(OrderSalePropertiesReference.DATE.name)"
                          v-validate="'required'"
                  >
                  </mau-form-input-date-time>
              </div>
              <div v-else>
                  <div class="form-group form-row">
                      <div class="col-sm-12">
                          <label><b>{{OrderSalePropertiesReference.DATE.title}}</b></label>
                          <div>{{initialValues[OrderSalePropertiesReference.DATE.name]}}</div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="form-group">
              <div v-if="requestMode">
                  <mau-form-input-select
                          :initialObject="initialValues[OrderSalePropertiesReference.CLIENT.name]"
                          :label="OrderSalePropertiesReference.CLIENT.title"
                          :displayProperty="'companyname'"
                          :entityType="clientEntityType"
                          v-model="productionOrder.client"
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
              <div class="bags">
                    <mau-many-to-many-selector
                            :label="OrderSalePropertiesReference.BAGS.title"
                            :initialObjects="initialValues[OrderSalePropertiesReference.BAGS.name]"
                            v-model="productionOrder.bags"
                            :selectedEntityIdentifierName="'bag_id'"
                            :availableObjects="availableBags"
                            :name="OrderSalePropertiesReference.BAGS.name"
                    >
                        <template slot-scope="params">
                            <order-sale-table
                                    :requestMode="requestMode"
                                    :receiptMode="receiptMode"
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
  import OrderSalePropertiesReference from 'renderer/api/propertiesReference/BagOrderSaleRequestPropertiesReference'
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
        OrderSalePropertiesReference: OrderSalePropertiesReference,
        productionOrder: {
          orderCode: '',
          bags: [],
          date: '',
          client: {}
        },
        initialValues: {},
        buttonDisabled: false,
        clientEntityType: EntityTypes.CLIENT
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
        this.setInitialValues(this.initialObject)
      } else {
        ApiOperations.getMax(this.entityType, OrderSalePropertiesReference.ORDER_CODE.name).then(result => {
          this.productionOrder.orderCode = result + 1
        })
      }
    },
    computed: {
      ...mapState({
        availableBags: state => {
          return state.api.entity.bags
        }
      })
    },
    methods: {
      createDefaultInitialValues: function () {
        for (let propertyReference in OrderSalePropertiesReference) {
          if (OrderSalePropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[OrderSalePropertiesReference[propertyReference].name] = OrderSalePropertiesReference[propertyReference].defaultValue
          }
        }
      },
      setInitialValues: function () {
        this.initialValues[OrderSalePropertiesReference.ORDER_CODE.name] = this.initialObject[OrderSalePropertiesReference.ORDER_CODE.name]
        this.initialValues[OrderSalePropertiesReference.BAGS.name] = this.initialObject[OrderSalePropertiesReference.BAGS.name]
        this.initialValues[OrderSalePropertiesReference.DATE.name] = this.initialObject[OrderSalePropertiesReference.DATE.name]
        this.initialValues[OrderSalePropertiesReference.CLIENT.name] = this.initialObject[OrderSalePropertiesReference.CLIENT.name]
      },
      save: function () {
        let directParams = {}
        if (this.requestMode) {
          directParams[OrderSalePropertiesReference.ORDER_CODE.name] = this.productionOrder.orderCode
          directParams[OrderSalePropertiesReference.DATE.name] = this.productionOrder.date
          directParams[OrderSalePropertiesReference.CLIENT.relationship_id_name] = this.productionOrder.client ? this.productionOrder.client[GlobalEntityIdentifier] : 'null'
          directParams[OrderSalePropertiesReference.ORDER_STATUS_TYPE.relationship_id_name] = 1
        }
        if (this.receiptMode) {
          directParams[OrderSalePropertiesReference.ORDER_STATUS_TYPE.relationship_id_name] = 2
        }
        let bagOrderEntityType = EntityTypes.BAG_ORDER_SALE_PRODUCT
        let relayObjects = [
          ManyToManyHelper.createRelayObject(this.productionOrder.bags, bagOrderEntityType)
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
