1<template>
  <div>
      <div>
          <div class="form-group">
              <div class="date">
                  <mau-form-input-date
                          :name="OrderAdjustmentPropertiesReference.DATE.name"
                          :label="OrderAdjustmentPropertiesReference.DATE.title"
                          v-model="productionOrder.date"
                          :initialValue="initialValues[OrderAdjustmentPropertiesReference.DATE.name]"
                          :error="errors.first(OrderAdjustmentPropertiesReference.DATE.name)"
                          :disabled="!userHasWritePrivileges"
                          v-validate="'required'"
                  >
                  </mau-form-input-date>
              </div>
          </div>
          <div class="form-group">
              <div class="expenseType">
                  <mau-form-input-select-dynamic
                          :initialObject="initialValues[OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.name]"
                          :label="OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.title"
                          :displayProperty="'name'"
                          v-model="productionOrder.adjustmentType"
                          :name="OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.name"
                          :data-vv-as="OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.title"
                          :error="errors.first(OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.name)"
                          :endpointName="adjustmentTypeEndpointName"
                          :disabled="!userHasWritePrivileges"
                          v-validate="'object_required'"
                  >
                  </mau-form-input-select-dynamic>
              </div>
          </div>
          <div class="form-group">
                    <mau-form-input-select-dynamic
                            :label="OrderAdjustmentPropertiesReference.PRODUCTS.title"
                            :initialObjects="initialValues[OrderAdjustmentPropertiesReference.PRODUCTS.name]"
                            v-model="productionOrder.products"
                            :displayProperty="'description'"
                            :name="OrderAdjustmentPropertiesReference.PRODUCTS.name"
                            :error="errors.first(OrderAdjustmentPropertiesReference.PRODUCTS.name)"
                            :data-vv-as="OrderAdjustmentPropertiesReference.PRODUCTS.title"
                            :endpointName="productEndpointName"
                            :multiselect="true"
                            :disabled="!userHasWritePrivileges"
                            v-validate="'required'"
                    >
                        <order-production-product-table
                            :allowNegative="true"
                            :bagMode="true"
                            :selectedProducts="productionOrder.products"
                            :initialProducts="initialValues[OrderAdjustmentPropertiesReference.PRODUCTS.name]"
                            :userHasWritePrivileges="userHasWritePrivileges"
                            v-model="productionOrder.adjustmentProducts"
                        >
                        </order-production-product-table>
                    </mau-form-input-select-dynamic>
          </div>
          <div class="container mb-2 text-right">
              <b-button :disabled="buttonDisabled || !userHasWritePrivileges" @click="save" type="button" variant="primary">Guardar</b-button>
          </div>
      </div>
  </div>
</template>

<script>
  import OrderAdjustmentPropertiesReference from 'renderer/api/propertiesReference/OrderAdjustmentPropertiesReference'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import OrderProductionProductTable from 'renderer/api/components/m2m/OrderProductionProductTable.vue'
  import DefaultValuesHelper from 'renderer/api/functions/DefaultValuesHelper'
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
        adjustmentTypeEndpointName: EntityTypes.ORDER_ADJUSTMENT_TYPE.apiName,
        productEndpointName: EntityTypes.PRODUCT.apiName
      }
    },
    components: {
      MauFormInputSelectDynamic,
      OrderProductionProductTable
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
      this.setInitialValues()
    },
    computed: {
      userHasWritePrivileges: function () {
        return true
      }
    },
    methods: {
      setInitialValues: function () {
        this.initialValues[OrderAdjustmentPropertiesReference.PRODUCTS.name] = DefaultValuesHelper.array(this.initialObject, OrderAdjustmentPropertiesReference.PRODUCTS.name)
        this.initialValues[OrderAdjustmentPropertiesReference.DATE.name] = DefaultValuesHelper.simple(this.initialObject, OrderAdjustmentPropertiesReference.DATE.name)
        this.initialValues[OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.name] = DefaultValuesHelper.object(this.initialObject, OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.name)
      },
      save: function () {
        let directParams = {
          [OrderAdjustmentPropertiesReference.DATE.name]: this.productionOrder.date
        }
        directParams[OrderAdjustmentPropertiesReference.ORDER_ADJUSTMENT_TYPE.relationship_id_name] = this.productionOrder.adjustmentType ? this.productionOrder.adjustmentType[GlobalEntityIdentifier] : null
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
