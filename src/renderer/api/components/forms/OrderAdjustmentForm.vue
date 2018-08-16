1<template>
  <div>
      <div>
          <div class="form-group">
              <div class="date">
                  <mau-form-input-date-time
                          :name="OrderAdjustmentPropertiesReference.DATE.name"
                          :label="OrderAdjustmentPropertiesReference.DATE.title"
                          v-model="productionOrder.date"
                          :initialValue="initialValues[OrderAdjustmentPropertiesReference.DATE.name]"
                          :error="errors.first(OrderAdjustmentPropertiesReference.DATE.name)"
                          v-validate="'required'"
                  >
                  </mau-form-input-date-time>
              </div>
          </div>
          <div class="form-group">
              <div class="expenseType">
                  <mau-form-input-select
                          :initialObject="initialValues[OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.name]"
                          :label="OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.title"
                          :displayProperty="'name'"
                          v-model="productionOrder.adjustmentType"
                          :name="OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.name"
                          :data-vv-as="OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.title"
                          :error="errors.first(OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.name)"
                          :entityType="adjustmentTypeEntityType"
                          v-validate="'object_required'"
                  >
                  </mau-form-input-select>
              </div>
          </div>
          <div class="form-group">
                    <mau-form-input-select
                            :label="OrderAdjustmentPropertiesReference.PRODUCTS.title"
                            :initialObjects="initialValues[OrderAdjustmentPropertiesReference.PRODUCTS.name]"
                            v-model="productionOrder.products"
                            :displayProperty="'code'"
                            :name="OrderAdjustmentPropertiesReference.PRODUCTS.name"
                            :error="errors.first(OrderAdjustmentPropertiesReference.PRODUCTS.name)"
                            :data-vv-as="OrderAdjustmentPropertiesReference.PRODUCTS.title"
                            :entityType="productEntityType"
                            :multi="true"
                            v-validate="'array_required'"
                    >
                        <order-production-table
                            :allowNegative="true"
                            :selectedProducts="productionOrder.products"
                            :initialProducts="initialValues[OrderAdjustmentPropertiesReference.PRODUCTS.name]"
                            v-model="productionOrder.adjustmentProducts"
                        >
                        </order-production-table>
                    </mau-form-input-select>
          </div>
          <div class="container mb-2 text-right">
              <b-button :disabled="buttonDisabled" @click="save" type="button" variant="primary">Guardar</b-button>
          </div>
      </div>
  </div>
</template>

<script>
  import OrderAdjustmentPropertiesReference from 'renderer/api/propertiesReference/OrderAdjustmentPropertiesReference'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import MauFormInputText from 'renderer/api/components/inputs/MauFormInputText.vue'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauFormInputDateTime from 'renderer/api/components/inputs/MauFormInputDateTime.vue'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import OrderSaleTable from 'renderer/api/components/tables/OrderSaleTable.vue'
  import OrderProductionTable from 'renderer/api/components/tables/OrderProductionTable.vue'
  import {mapState} from 'vuex'
  export default {
    name: 'OrderAdjustmentForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        OrderAdjustmentPropertiesReference: OrderAdjustmentPropertiesReference,
        productionOrder: {
          products: [],
          adjustmentProducts: [],
          date: '',
          adjustmentType: {}
        },
        initialValues: {},
        buttonDisabled: false,
        adjustmentTypeEntityType: EntityTypes.ORDER_ADJUSTMENT_TYPE,
        productEntityType: EntityTypes.PRODUCT
      }
    },
    components: {
      MauFormInputSelect,
      MauFormInputDateTime,
      MauFormInputText,
      OrderSaleTable,
      OrderProductionTable
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
      }
    },
    computed: {
      ...mapState({
        availableProducts: state => {
          return state.api.entity.products
        }
      })
    },
    methods: {
      createDefaultInitialValues: function () {
        for (let propertyReference in OrderAdjustmentPropertiesReference) {
          if (OrderAdjustmentPropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[OrderAdjustmentPropertiesReference[propertyReference].name] = OrderAdjustmentPropertiesReference[propertyReference].defaultValue
          }
        }
      },
      setInitialValues: function () {
        this.initialValues[OrderAdjustmentPropertiesReference.PRODUCTS.name] = this.initialObject[OrderAdjustmentPropertiesReference.PRODUCTS.name]
        this.initialValues[OrderAdjustmentPropertiesReference.DATE.name] = this.initialObject[OrderAdjustmentPropertiesReference.DATE.name]
        this.initialValues[OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.name] = this.initialObject[OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.name]
      },
      save: function () {
        let directParams = {
          [OrderAdjustmentPropertiesReference.DATE.name]: this.productionOrder.date
        }
        directParams[OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.relationship_id_name] = this.productionOrder.adjustmentType ? this.productionOrder.adjustmentType[GlobalEntityIdentifier] : 'null'
        let filteredAdjustmentProducts = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(this.initialValues[OrderAdjustmentPropertiesReference.PRODUCTS.name].map(initialProductionObj => initialProductionObj.pivot), this.productionOrder.adjustmentProducts, 'id')
        let relayObjects = [
          ManyToManyHelper.createRelayObject(filteredAdjustmentProducts, EntityTypes.ORDER_ADJUSTMENT_PRODUCT)
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
