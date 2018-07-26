<template>
    <div class="x-overflow">
        <table class="mau-table table table-striped">
            <thead>
                <tr>
                    <th class="mau-text-center">Producto</th>
                    <th class="mau-text-center">Descripción</th>
                    <th class="mau-text-center">Cantidad en kilos</th>
                    <th class="mau-text-center">Precio unitario</th>
                    <th class="mau-text-center">Bultos</th>
                    <th v-if="hasTax" class="mau-text-center">IVA</th>
                    <th class="mau-text-center">Costo Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(currentStructuredObj, index) in currentStructuredObjects" :key="index">
                    <td class="mau-text-center">{{getProductName(currentStructuredObj)}}</td>
                    <td class="mau-text-center">{{getProductDescription(currentStructuredObj)}}</td>
                    <td class="mau-text-center">
                        <mau-form-input-regular-number
                                v-if="requestMode"
                                :name="OrderProductSalePropertiesReference.UNITS_REQUESTED.name"
                                v-model="currentStructuredObj.units_requested"
                                @input="unitsRequestedHasChanged(currentStructuredObj)"
                        >
                        </mau-form-input-regular-number>
                        <mau-form-input-regular-number
                                v-if="receiptMode"
                                :name="OrderProductSalePropertiesReference.UNITS_REQUESTED.name"
                                v-model="currentStructuredObj.units_given"
                                @input="unitsGivenHasChanged(currentStructuredObj)"
                        >
                        </mau-form-input-regular-number>
                    </td>
                    <td class="mau-text-center">
                        <mau-form-input-number
                                v-if="requestMode"
                                :name="OrderProductSalePropertiesReference.UNIT_PRICE_REQUESTED.name"
                                v-model="currentStructuredObj.unit_price_requested"
                                :initialValue="getProductInitialUnitPriceRequested(currentStructuredObj)"
                                :type="'float'"
                                @input="unitsRequestedHasChanged(currentStructuredObj)"
                        >
                        </mau-form-input-number>
                        <mau-form-input-number
                                v-if="receiptMode"
                                :name="OrderProductSalePropertiesReference.UNIT_PRICE_GIVEN.name"
                                v-model="currentStructuredObj.unit_price_given"
                                :initialValue="getProductInitialUnitPriceGiven(currentStructuredObj)"
                                :type="'float'"
                                @input="unitsGivenHasChanged(currentStructuredObj)"
                        >
                        </mau-form-input-number>
                    </td>
                    <td class="mau-text-center">
                        <div v-if="requestMode">
                            {{currentStructuredObj.groups_requested}}
                        </div>
                        <div v-if="receiptMode">
                            {{currentStructuredObj.groups_given}}
                        </div>
                    </td>
                    <td v-if="hasTax" class="mau-text-center">
                        {{currentStructuredObj.tax}}
                    </td>
                    <td class="mau-text-center">
                        <div v-if="requestMode">
                            {{currentStructuredObj.total_cost_requested}}
                        </div>
                        <div v-if="receiptMode">
                            {{currentStructuredObj.total_cost_given}}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td v-if="hasTax"></td>
                    <td></td>
                    <td class="text-right"><b>TOTAL:</b></td>
                    <td>
                        {{total}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import OrderProductSalePropertiesReference from 'renderer/api/propertiesReference/BagOrderProductSalePropertiesReference'
    import ProductPropertiesReference from 'renderer/api/propertiesReference/BagPropertiesReference'
    import MauFormInputRegularNumber from 'renderer/components/mau-components/mau-form-inputs/MauFormInputRegularNumber.vue'
    import MauFormInputNumber from 'renderer/components/mau-components/mau-form-inputs/MauFormInputNumber.vue'
    import {mapGetters} from 'vuex'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    export default {
      name: 'OrderSaleTable',
      data () {
        return {
          currentStructuredObjects: [],
          OrderProductSalePropertiesReference: OrderProductSalePropertiesReference,
          total: 0
        }
      },
      components: {
        MauFormInputRegularNumber,
        MauFormInputNumber
      },
      created () {
      },
      computed: {
        ...mapGetters([
          'getBagById'
        ])
      },
      props: {
        structuredObjects: {
          type: Array,
          required: true
        },
        hostEntityIdentifierName: {
          type: String,
          required: true
        },
        requestMode: {
          type: Boolean
        },
        receiptMode: {
          type: Boolean
        },
        hasTax: {
          type: Boolean
        }
      },
      methods: {
        hasGroupWeight: function (structuredObject) {
          let bag = this.getBagById(structuredObject[this.hostEntityIdentifierName])
          return !!bag[ProductPropertiesReference.CURRENT_GROUP_WEIGHT.name]
        },
        emitStructureChangeEvent: function () {
          this.$emit('structuredObjectsChange', this.currentStructuredObjects)
        },
        getProductName: function (structuredObject) {
          return this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.NAME.name]
        },
        getProductDescription: function (structuredObject) {
          return this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.DESCRIPTION.name]
        },
        getProductInitialUnitPriceRequested: function (structuredObject) {
          let currentUnitPrice = this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.CURRENT_UNIT_PRICE.name]
          if (structuredObject[OrderProductSalePropertiesReference.UNIT_PRICE_REQUESTED.name]) {
            currentUnitPrice = structuredObject[OrderProductSalePropertiesReference.UNIT_PRICE_REQUESTED.name]
          }
          return currentUnitPrice
        },
        getProductInitialUnitPriceGiven: function (structuredObject) {
          let currentUnitPrice = this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.CURRENT_UNIT_PRICE.name]
          if (structuredObject[OrderProductSalePropertiesReference.UNIT_PRICE_GIVEN.name]) {
            currentUnitPrice = structuredObject[OrderProductSalePropertiesReference.UNIT_PRICE_GIVEN.name]
          }
          return currentUnitPrice
        },
        getProductInitialGroupWeightRequested: function (structuredObject) {
          let currentGroupWeight = this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.CURRENT_GROUP_WEIGHT.name]
          if (structuredObject[OrderProductSalePropertiesReference.GROUP_WEIGHT_REQUESTED.name]) {
            currentGroupWeight = structuredObject[OrderProductSalePropertiesReference.GROUP_WEIGHT_REQUESTED.name]
          }
          return currentGroupWeight
        },
        getProductInitialGroupWeightGiven: function (structuredObject) {
          let currentGroupWeight = this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.CURRENT_GROUP_WEIGHT.name]
          if (structuredObject[OrderProductSalePropertiesReference.GROUP_WEIGHT_GIVEN.name]) {
            currentGroupWeight = structuredObject[OrderProductSalePropertiesReference.GROUP_WEIGHT_GIVEN.name]
          }
          return currentGroupWeight
        },
        unitsRequestedHasChanged: function (currentStructuredObj) {
          this.setCurrentStructuredObjectsRequested(currentStructuredObj)
          this.emitStructureChangeEvent()
        },
        unitsGivenHasChanged: function (currentStructuredObj) {
          this.setCurrentStructuredObjectsGiven(currentStructuredObj)
          this.emitStructureChangeEvent()
        },
        setCurrentStructuredObjectsRequested: function (currentStructuredObj) {
          let currentObjUnitCost = currentStructuredObj[OrderProductSalePropertiesReference.UNIT_PRICE_REQUESTED.name] || 0
          let currentObjQuantity = currentStructuredObj[OrderProductSalePropertiesReference.UNITS_REQUESTED.name] || 0
          currentStructuredObj[OrderProductSalePropertiesReference.TOTAL_COST_REQUESTED.name] = (currentObjUnitCost * currentObjQuantity)
          let units = currentStructuredObj[OrderProductSalePropertiesReference.UNITS_REQUESTED.name] ? currentStructuredObj[OrderProductSalePropertiesReference.UNITS_REQUESTED.name] : 0
          let groupWeight = this.getProductInitialGroupWeightRequested(currentStructuredObj) ? this.getProductInitialGroupWeightRequested(currentStructuredObj) : 0
          if (units && groupWeight) {
            currentStructuredObj.groups_requested = (units / groupWeight).toFixed(2)
            currentStructuredObj.group_weight_requested = groupWeight || 'null'
          }
          this.calculateTotalRequest()
        },
        setCurrentStructuredObjectsGiven: function (currentStructuredObj) {
          let currentObjUnitCost = currentStructuredObj[OrderProductSalePropertiesReference.UNIT_PRICE_GIVEN.name] || 0
          let currentObjQuantity = currentStructuredObj[OrderProductSalePropertiesReference.UNITS_GIVEN.name] || 0
          let totalCostWithoutTax = (currentObjUnitCost * currentObjQuantity)
          let totalCost = totalCostWithoutTax
          if (this.hasTax) {
            let tax = totalCostWithoutTax * 0.16
            currentStructuredObj[OrderProductSalePropertiesReference.TAX.name] = tax
            totalCost = totalCostWithoutTax + tax
          }
          currentStructuredObj[OrderProductSalePropertiesReference.TOTAL_COST_GIVEN.name] = totalCost
          let units = currentStructuredObj[OrderProductSalePropertiesReference.UNITS_GIVEN.name] ? currentStructuredObj[OrderProductSalePropertiesReference.UNITS_GIVEN.name] : 0
          let groupWeight = this.getProductInitialGroupWeightGiven(currentStructuredObj) ? this.getProductInitialGroupWeightGiven(currentStructuredObj) : 0
          if (units && groupWeight) {
            currentStructuredObj.groups_given = (units / groupWeight).toFixed(2)
            currentStructuredObj.group_weight_given = groupWeight || 'null'
          }
          this.calculateTotalGiven()
        },
        calculateTotalRequest: function () {
          let total = 0
          this.currentStructuredObjects.forEach((currentStructuredObjLoop, index) => {
            let cost = currentStructuredObjLoop[OrderProductSalePropertiesReference.TOTAL_COST_REQUESTED.name] || 0
            total += cost
          })
          this.total = total.toFixed(2)
        },
        calculateTotalGiven: function () {
          let total = 0
          this.currentStructuredObjects.forEach((currentStructuredObjLoop, index) => {
            let cost = currentStructuredObjLoop[OrderProductSalePropertiesReference.TOTAL_COST_GIVEN.name] || 0
            total += cost
          })
          this.total = total.toFixed(2)
        }
      },
      watch: {
        structuredObjects: function () {
          let tempCurrentStructuredObjects = []
          for (let i = 0; i < this.structuredObjects.length; i++) {
            let structuredObj = this.structuredObjects[i]
            let currentStructuredObjFound = this.currentStructuredObjects.find(currentStructuredObj => {
              return currentStructuredObj[this.hostEntityIdentifierName] === structuredObj[this.hostEntityIdentifierName]
            })
            if (currentStructuredObjFound) {
              tempCurrentStructuredObjects.push(cloneDeep(currentStructuredObjFound))
            } else {
              tempCurrentStructuredObjects.push(cloneDeep(structuredObj))
            }
          }
          this.currentStructuredObjects = tempCurrentStructuredObjects
          if (this.requestMode) {
            this.calculateTotalRequest()
          }
          if (this.receiptMode) {
            this.calculateTotalGiven()
          }
        },
        hasTax: function () {
          if (this.receiptMode) {
            this.currentStructuredObjects.forEach(currentStructuredObject => {
              this.setCurrentStructuredObjectsGiven(currentStructuredObject)
            })
            this.calculateTotalGiven()
            this.emitStructureChangeEvent()
          }
        }
      }
    }
</script>