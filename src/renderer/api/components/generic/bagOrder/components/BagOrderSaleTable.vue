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
                    <!--<th class="mau-text-center">Descuento</th>-->
                    <th class="mau-text-center">Costo Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(currentStructuredObj, index) in currentStructuredObjects" :key="index">
                    <td class="mau-text-center">{{getProductName(currentStructuredObj)}}</td>
                    <td class="mau-text-center">{{getProductDescription(currentStructuredObj)}}</td>
                    <td class="mau-text-center">
                        <mau-form-input-regular-number
                                :name="OrderProductPropertiesReference.UNITS.name"
                                v-model="currentStructuredObj.units"
                                @input="unitsHasChanged(currentStructuredObj)"
                        >
                        </mau-form-input-regular-number>
                    </td>
                    <td class="mau-text-center">
                        <mau-form-input-number
                                :name="OrderProductSalePropertiesReference.UNIT_PRICE.name"
                                v-model="currentStructuredObj.unit_price"
                                :initialValue="getProductInitialUnitPrice(currentStructuredObj)"
                                :type="'float'"
                                @input="unitPriceHasChanged(currentStructuredObj)"
                        >
                        </mau-form-input-number>
                    </td>
                    <td class="mau-text-center">
                        <div>
                            {{currentStructuredObj.groups}}
                        </div>
                    </td>
                    <!--<td class="mau-text-center">-->
                        <!--<mau-form-input-regular-number-->
                                <!--:name="OrderProductSalePropertiesReference.DISCOUNT.name"-->
                                <!--v-model="currentStructuredObj.discount"-->
                                <!--@input="discountHasChanged(currentStructuredObj)"-->
                        <!--&gt;-->
                        <!--</mau-form-input-regular-number>-->
                    <!--</td>-->
                    <td class="mau-text-center">
                        <!--<mau-form-input-regular-number-->
                                <!--:name="OrderProductSalePropertiesReference.TOTAL_COST.name"-->
                                <!--v-model="currentStructuredObj.total_cost"-->
                                <!--@input="unitsHasChanged(currentStructuredObj)"-->
                        <!--&gt;-->
                        <!--</mau-form-input-regular-number>-->
                        {{currentStructuredObj.total_cost}}
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
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
    import OrderProductPropertiesReference from 'renderer/api/propertiesReference/BagOrderProductPropertiesReference'
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
          OrderProductPropertiesReference: OrderProductPropertiesReference,
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
        getProductInitialUnitPrice: function (structuredObject) {
          let currentUnitPrice = this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.CURRENT_UNIT_PRICE.name]
          if (structuredObject[OrderProductSalePropertiesReference.UNIT_PRICE.name]) {
            currentUnitPrice = structuredObject[OrderProductSalePropertiesReference.UNIT_PRICE.name]
          }
          return currentUnitPrice
        },
        getProductInitialGroupWeight: function (structuredObject) {
          let currentGroupWeight = this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.CURRENT_GROUP_WEIGHT.name]
          if (structuredObject[OrderProductSalePropertiesReference.GROUP_WEIGHT.name]) {
            currentGroupWeight = structuredObject[OrderProductSalePropertiesReference.GROUP_WEIGHT.name]
          }
          return currentGroupWeight
        },
        unitsHasChanged: function (currentStructuredObj) {
          this.setCurrentStructuredObjectGroup(currentStructuredObj)
          this.setCurrentStructuredObjectCost(currentStructuredObj)
          this.emitStructureChangeEvent()
        },
        unitPriceHasChanged: function (currentStructuredObj) {
          this.setCurrentStructuredObjectGroup(currentStructuredObj)
          this.setCurrentStructuredObjectCost(currentStructuredObj)
          this.emitStructureChangeEvent()
        },
        discountHasChanged: function (currentStructuredObj) {
          this.setCurrentStructuredObjectCost(currentStructuredObj)
          this.emitStructureChangeEvent()
        },
        setCurrentStructuredObjectGroup: function (currentStructuredObj) {
          let units = currentStructuredObj[OrderProductSalePropertiesReference.UNITS.name] ? currentStructuredObj[OrderProductSalePropertiesReference.UNITS.name] : 0
          let groupWeight = this.getProductInitialGroupWeight(currentStructuredObj) ? this.getProductInitialGroupWeight(currentStructuredObj) : 0
          if (units && groupWeight) {
            currentStructuredObj.groups = (units / groupWeight).toFixed(2)
            currentStructuredObj.group_weight = groupWeight || 'null'
          }
        },
        setCurrentStructuredObjectCost: function (currentStructuredObj) {
          let currentObjUnitCost = currentStructuredObj[OrderProductSalePropertiesReference.UNIT_PRICE.name] || 0
          let currentObjQuantity = currentStructuredObj[OrderProductPropertiesReference.UNITS.name] || 0
          // let currentObjDiscount = currentStructuredObj[OrderProductSalePropertiesReference.DISCOUNT.name] || 0
          let currentObjTotalCost = (currentObjUnitCost * currentObjQuantity)
          currentStructuredObj[OrderProductSalePropertiesReference.TOTAL_COST.name] = currentObjTotalCost
          this.calculateTotal()
        },
        calculateTotal: function () {
          let total = 0
          this.currentStructuredObjects.forEach((currentStructuredObjLoop, index) => {
            let cost = currentStructuredObjLoop[OrderProductSalePropertiesReference.TOTAL_COST.name] || 0
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
          this.calculateTotal()
        }
      }
    }
</script>