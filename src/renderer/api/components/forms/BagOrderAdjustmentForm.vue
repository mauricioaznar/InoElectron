1<template>
  <div>
      <div>
          <div class="form-group">
              <div class="date">
                  <mau-form-input-date-time
                          :name="BagOrderAdjustmentPropertiesReference.DATE.name"
                          :label="BagOrderAdjustmentPropertiesReference.DATE.title"
                          v-model="productionOrder.date"
                          :initialValue="initialValues[BagOrderAdjustmentPropertiesReference.DATE.name]"
                          :error="errors.first(BagOrderAdjustmentPropertiesReference.DATE.name)"
                          v-validate="'required'"
                  >
                  </mau-form-input-date-time>
              </div>
          </div>
          <div class="form-group">
              <div class="expenseType">
                  <mau-form-input-select
                          :initialObject="initialValues[BagOrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.name]"
                          :label="BagOrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.title"
                          :displayProperty="'name'"
                          v-model="productionOrder.adjustmentType"
                          :name="BagOrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.name"
                          :data-vv-as="BagOrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.title"
                          :error="errors.first(BagOrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.name)"
                          :entityType="adjustmentTypeEntityType"
                          v-validate="'object_required'"
                  >
                  </mau-form-input-select>
              </div>
          </div>
          <div class="form-group">
              <div class="bags">
                    <mau-many-to-many-selector
                            :label="BagOrderAdjustmentPropertiesReference.BAGS.title"
                            :initialObjects="initialValues[BagOrderAdjustmentPropertiesReference.BAGS.name]"
                            v-model="productionOrder.bags"
                            :selectedPropertyName="'bag_id'"
                            :availableObjects="availableBags"
                            :name="BagOrderAdjustmentPropertiesReference.BAGS.name"
                    >
                        <template slot-scope="params">
                            <order-table
                                :selectedBags="params.selectedObjects"
                                :initialBags="initialValues[BagOrderAdjustmentPropertiesReference.BAGS.name]"
                                v-model="productionOrder.adjustmentBags"
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
  import BagOrderAdjustmentPropertiesReference from 'renderer/api/propertiesReference/BagOrderAdjustmentPropertiesReference'
  import ValidatorHelper from 'renderer/api/functions/ValidatorHelper'
  import MauFormInputText from 'renderer/api/components/inputs/MauFormInputText.vue'
  import MauFormInputNumber from 'renderer/api/components/inputs/MauFormInputNumber.vue'
  import FormSubmitEventBus from 'renderer/api/functions/FormSubmitEventBus'
  import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
  import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import MauFormInputDateTime from 'renderer/api/components/inputs/MauFormInputDateTime.vue'
  import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
  import OrderSaleTable from 'renderer/api/components/tables/BagOrderSaleTable.vue'
  import OrderTable from 'renderer/api/components/tables/BagOrderTable.vue'
  import MauManyToManySelector from 'renderer/components/mau-components/mau-many-to-many-selector/MauManyToManySelector.vue'
  import {mapState} from 'vuex'
  export default {
    name: 'MauSimpleOrderForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        BagOrderAdjustmentPropertiesReference: BagOrderAdjustmentPropertiesReference,
        productionOrder: {
          bags: [],
          adjustmentBags: [],
          date: '',
          adjustmentType: {}
        },
        initialValues: {},
        buttonDisabled: false,
        adjustmentTypeEntityType: EntityTypes.BAG_ORDER_ADJUSTMENT_ORDER_TYPE
      }
    },
    components: {
      MauFormInputSelect,
      MauFormInputDateTime,
      MauFormInputText,
      MauFormInputNumber,
      MauManyToManySelector,
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
        availableBags: state => {
          return state.api.entity.bags
        }
      })
    },
    methods: {
      createDefaultInitialValues: function () {
        for (let propertyReference in BagOrderAdjustmentPropertiesReference) {
          if (BagOrderAdjustmentPropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[BagOrderAdjustmentPropertiesReference[propertyReference].name] = BagOrderAdjustmentPropertiesReference[propertyReference].defaultValue
          }
        }
      },
      setInitialValues: function () {
        this.initialValues[BagOrderAdjustmentPropertiesReference.BAGS.name] = this.initialObject[BagOrderAdjustmentPropertiesReference.BAGS.name]
        this.initialValues[BagOrderAdjustmentPropertiesReference.DATE.name] = this.initialObject[BagOrderAdjustmentPropertiesReference.DATE.name]
        this.initialValues[BagOrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.name] = this.initialObject[BagOrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.name]
      },
      save: function () {
        let directParams = {
          [BagOrderAdjustmentPropertiesReference.DATE.name]: this.productionOrder.date
        }
        directParams[BagOrderAdjustmentPropertiesReference.ADJUSTMENT_ORDER_TYPE.relationship_id_name] = this.productionOrder.adjustmentType ? this.productionOrder.adjustmentType[GlobalEntityIdentifier] : 'null'
        let relayObjects = [
          ManyToManyHelper.createRelayObject(this.productionOrder.adjustmentBags, EntityTypes.BAG_ORDER_ADJUSTMENT_PRODUCT)
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
