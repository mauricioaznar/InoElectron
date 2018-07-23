1<template>
  <div>
      <div>
          <div class="form-group">
              <mau-form-input-number
                      :initialValue="initialValues[OrderPropertiesReference.ORDER_CODE.name]"
                      v-model="productionOrder.orderCode"
                      :label="OrderPropertiesReference.ORDER_CODE.title"
                      :name="OrderPropertiesReference.ORDER_CODE.name"
                      :error="errors.first(OrderPropertiesReference.ORDER_CODE.name)"
                      v-validate="{
                        required: true,
                        remote_unique: {
                          entityType: entityType,
                          columnName: OrderPropertiesReference.ORDER_CODE.name,
                          initialValue: initialValues[OrderPropertiesReference.ORDER_CODE.name]
                        }
                      }"
              >
              </mau-form-input-number>
          </div>
          <div class="form-group">
              <div class="date">
                  <mau-form-input-date-time
                          :name="OrderPropertiesReference.DATE.name"
                          :label="OrderPropertiesReference.DATE.title"
                          v-model="productionOrder.date"
                          :initialValue="initialValues[OrderPropertiesReference.DATE.name]"
                          :error="errors.first(OrderPropertiesReference.DATE.name)"
                          v-validate="'required'"
                  >
                  </mau-form-input-date-time>
              </div>
          </div>
          <div class="form-group" v-if="adjustmentsMode">
              <div class="expenseType">
                  <mau-form-input-select
                          :initialObject="initialValues[OrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.name]"
                          :label="OrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.title"
                          :displayProperty="'name'"
                          v-model="productionOrder.adjustmentType"
                          :name="OrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.name"
                          :data-vv-as="OrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.title"
                          :error="errors.first(OrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.name)"
                          :entityType="adjustmentTypeEntityType"
                          v-validate="'object_required'"
                  >
                  </mau-form-input-select>
              </div>
          </div>
          <div class="form-group">
              <div class="bags">
                    <mau-many-to-many-selector
                            :label="OrderPropertiesReference.BAGS.title"
                            :initialObjects="initialValues[OrderPropertiesReference.BAGS.name]"
                            v-model="productionOrder.bags"
                            :selectedEntityIdentifierName="'bag_id'"
                            :availableObjects="availableBags"
                            :name="OrderPropertiesReference.BAGS.name"
                    >
                        <template slot-scope="params">
                            <order-table
                                :structuredObjects="params.structuredObjects"
                                @structuredObjectsChange="params.onTableChange"
                                :hostEntityIdentifierName="'bag_id'"
                            >
                            </order-table>
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
  import OrderPropertiesReference from 'renderer/api/propertiesReference/BagOrderPropertiesReference'
  import OrderAdjustmentPropertiesReference from 'renderer/api/propertiesReference/BagOrderAdjustmentPropertiesReference'
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
        OrderPropertiesReference: OrderPropertiesReference,
        OrderAdjustmentPropertiesReference: OrderAdjustmentPropertiesReference,
        productionOrder: {
          orderCode: '',
          bags: [],
          date: '',
          adjustmentType: {},
          client: {}
        },
        initialValues: {},
        buttonDisabled: false,
        clientEntityType: EntityTypes.CLIENT,
        adjustmentTypeEntityType: EntityTypes.BAG_ORDER_ADJUSTMENT_ORDER_TYPE
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
      adjustmentsMode: {
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
        ApiOperations.getMax(this.entityType, OrderPropertiesReference.ORDER_CODE.name).then(result => {
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
        for (let propertyReference in OrderPropertiesReference) {
          if (OrderPropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[OrderPropertiesReference[propertyReference].name] = OrderPropertiesReference[propertyReference].defaultValue
          }
        }
        if (this.adjustmentsMode) {
          for (let propertyReference in OrderAdjustmentPropertiesReference) {
            if (OrderAdjustmentPropertiesReference.hasOwnProperty(propertyReference)) {
              this.initialValues[OrderAdjustmentPropertiesReference[propertyReference].name] = OrderAdjustmentPropertiesReference[propertyReference].defaultValue
            }
          }
        }
      },
      setInitialValues: function () {
        this.initialValues[OrderPropertiesReference.ORDER_CODE.name] = this.initialObject[OrderPropertiesReference.ORDER_CODE.name]
        this.initialValues[OrderPropertiesReference.BAGS.name] = this.initialObject[OrderPropertiesReference.BAGS.name]
        this.initialValues[OrderPropertiesReference.DATE.name] = this.initialObject[OrderPropertiesReference.DATE.name]
        if (this.adjustmentsMode) {
          this.initialValues[OrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.name] = this.initialObject[OrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.name]
        }
      },
      save: function () {
        let directParams = {
          [OrderPropertiesReference.ORDER_CODE.name]: this.productionOrder.orderCode,
          [OrderPropertiesReference.DATE.name]: this.productionOrder.date
        }
        let bagOrderEntityType = EntityTypes.BAG_ORDER_PRODUCTION_PRODUCT
        if (this.adjustmentsMode) {
          directParams[OrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.relationship_id_name] = this.productionOrder.adjustmentType ? this.productionOrder.adjustmentType[GlobalEntityIdentifier] : 'null'
          bagOrderEntityType = EntityTypes.BAG_ORDER_ADJUSTMENT_PRODUCT
        }
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
