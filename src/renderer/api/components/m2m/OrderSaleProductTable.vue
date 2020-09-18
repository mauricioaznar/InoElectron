<template>
    <div class="x-overflow">
        <table class="mau-table table table-striped">
            <thead>
                <tr>
                    <th class="mau-text-center">Producto</th>
                    <th class="mau-text-center">Descripción</th>
                    <th class="mau-text-center">Cantidad</th>
                    <th class="mau-text-center">Unidad</th>
                    <th v-if="saleMode" class="mau-text-center">Precio unitario en kilos</th>
                    <th class="mau-text-center">Cantidad en kilos</th>
                    <th class="mau-text-center">Peso en kilos por bulto</th>
                    <th class="mau-text-center">Cantidad en bultos</th>
                    <th v-if="saleMode && hasTax" class="mau-text-center">IVA</th>
                    <th v-if="saleMode" class="mau-text-center">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(currentStructuredObj, index) in currentStructuredObjects" :key="currentStructuredObj['product_id']">
                    <td class="mau-text-center">{{getProductCode(currentStructuredObj)}}</td>
                    <td class="mau-text-center">{{getProductDescription(currentStructuredObj)}}</td>
                    <td class="mau-text-center">
                        <mau-form-input-number
                                v-if="getCurrentObjCalculationType(currentStructuredObj) === 0 && getCurrentObjGroupWeight(currentStructuredObj)"
                                :name="'_quantity_kilo' + currentStructuredObj['product_id']"
                                :initialValue="getCurrentObjInitialKilos(currentStructuredObj)"
                                v-model="currentStructuredObj._quantity"
                                :type="'float'"
                                :key="'_quantity_kilo' + currentStructuredObj['product_id']"
                                :error="errors.has('_quantity_kilo' + currentStructuredObj['product_id']) ? errors.first('_quantity_kilo' + currentStructuredObj['product_id']) : ''"
                                @input="setCurrentObjCalculationProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                v-validate="{
                                    required: true,
                                    kilo_to_group: {
                                        groupWeight: getCurrentObjGroupWeight(currentStructuredObj),
                                        isGroupWeightStrict: getProductGroupWeightStrict(currentStructuredObj)
                                    },
                                    max_value: getRequestedProductUnits(currentStructuredObj, 'kilos')
                                }"
                        >
                        </mau-form-input-number>
                        <mau-form-input-number
                                v-if="getCurrentObjCalculationType(currentStructuredObj) === 1 && getCurrentObjGroupWeight(currentStructuredObj)"
                                :name="'_quantity_group' + currentStructuredObj['product_id']"
                                :initialValue="getCurrentObjInitialGroups(currentStructuredObj)"
                                v-model="currentStructuredObj._quantity"
                                :type="getProductGroupWeightStrict(currentStructuredObj) ? 'regular' : 'float'"
                                :key="'_quantity_group' + currentStructuredObj['product_id']"
                                :error="errors.has('_quantity_group' + currentStructuredObj['product_id']) ? errors.first('_quantity_group' + currentStructuredObj['product_id']) : ''"
                                @input="setCurrentObjCalculationProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                v-validate="{
                                  required: true,
                                  max_value: getRequestedProductUnits(currentStructuredObj, 'groups')
                                }"
                        >
                        </mau-form-input-number>
                    </td>
                    <td class="mau-text-center extra-select-width">
                        <mau-form-input-select-static
                                v-if="!(!getCurrentObjGroupWeight(currentStructuredObj))"
                                v-model="currentStructuredObj._calculation_type"
                                :initialObject="getCurrentObjInitialCalculationType(currentStructuredObj)"
                                @input="setCurrentObjCalculationProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                :availableObjects="complexCalculationTypeObjects"
                                :displayProperty="'text'"
                                :trackBy="'value'"
                                :hasClear="false"
                                :name="'calculationType' + currentStructuredObj['product_id']"
                                :v-validate="'required'"
                                :multiselect="false"
                                :error="errors.has('calculationType' + currentStructuredObj['product_id']) ? errors.first('calculationType' + currentStructuredObj['product_id']) : ''"
                        >
                        </mau-form-input-select-static>
                        <mau-form-input-select-static
                                v-if="!(getCurrentObjGroupWeight(currentStructuredObj))"
                                v-model="currentStructuredObj._calculation_type"
                                :initialObject="getCurrentObjInitialCalculationType(currentStructuredObj)"
                                @input="setCurrentObjCalculationProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                :availableObjects="simpleCalculationTypeObjects"
                                :displayProperty="'text'"
                                :trackBy="'value'"
                                :hasClear="false"
                                :multiselect="false"
                                :name="'calculationType' + currentStructuredObj['product_id']"
                                :v-validate="{
                                  required: true
                                }"
                                :error="errors.has('calculationType' + currentStructuredObj['product_id']) ? errors.first('calculationType' + currentStructuredObj['product_id']) : ''"
                        >
                        </mau-form-input-select-static>
                    </td>
                    <td v-if="saleMode" class="mau-text-center">
                        <mau-form-input-number
                                :name="'kilo_price' + currentStructuredObj['product_id']"
                                :error="errors.has('kilo_price' + currentStructuredObj['product_id']) ? errors.first('kilo_price' + currentStructuredObj['product_id']) : ''"
                                v-model="currentStructuredObj._kilo_price"
                                :initialValue="getCurrentObjKiloPrice(currentStructuredObj)"
                                :type="'float'"
                                @input="setCurrentObjCalculationProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                v-validate="'required'"
                        >
                        </mau-form-input-number>
                    </td>
                    <td>
                        <div v-if="getCurrentObjGroupWeight(currentStructuredObj)">
                            {{currentStructuredObj.kilos}}
                        </div>
                        <mau-form-input-number
                                v-else
                                :name="'_manual_kilos' + currentStructuredObj['product_id']"
                                :initialValue="getCurrentObjInitialKilos(currentStructuredObj)"
                                v-model="currentStructuredObj._manual_kilos"
                                :type="'float'"
                                :key="'_manual_kilos' + currentStructuredObj['product_id']"
                                :error="errors.has('_manual_kilos' + currentStructuredObj['product_id']) ? errors.first('_manual_kilos' + currentStructuredObj['product_id']) : ''"
                                @input="setCurrentObjManualProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                :v-validate="{
                                  required: true,
                                  max_value: getRequestedProductUnits(currentStructuredObj, 'kilos')
                                }"
                        >
                        </mau-form-input-number>
                    </td>
                    <td class="mau-text-center">
                        {{getCurrentObjGroupWeight(currentStructuredObj)}}
                    </td>
                    <td class="mau-text-center">
                        <div v-if="getCurrentObjGroupWeight(currentStructuredObj)">
                            {{currentStructuredObj.groups}}
                        </div>
                        <mau-form-input-number
                                v-if="(!getCurrentObjGroupWeight(currentStructuredObj))"
                                :name="'_manual_groups' + currentStructuredObj['product_id']"
                                :initialValue="getCurrentObjInitialGroups(currentStructuredObj)"
                                v-model="currentStructuredObj._manual_groups"
                                :type="'regular'"
                                :key="'_manual_groups' + currentStructuredObj['product_id']"
                                :error="errors.has('_manual_groups' + currentStructuredObj['product_id']) ? errors.first('_manual_groups' + currentStructuredObj['product_id']) : ''"
                                @input="setCurrentObjManualProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                :v-validate="{
                                  required: true,
                                  max_value: getRequestedProductUnits(currentStructuredObj, 'groups')
                                }"
                        >
                        </mau-form-input-number>
                    </td>
                    <td v-if="saleMode && hasTax" class="mau-text-center">
                        {{getCurrentObjTax(currentStructuredObj)}}
                    </td>
                    <td v-if="saleMode" class="mau-text-center">
                        <div v-if="hasTax">
                            {{getCurrentObjTotalCost(currentStructuredObj)}}
                        </div>
                        <div v-else>
                            {{getCurrentObjTotalCostWithoutTax(currentStructuredObj)}}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td v-if="saleMode && hasTax"></td>
                    <td v-if="saleMode" class="text-right"><b>TOTAL:</b></td>
                    <td v-if="saleMode">
                        {{getOrderTotalCost(currentStructuredObjects)}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import OrderSaleProductPropertiesReference from 'renderer/api/propertiesReference/OrderSaleProductPropertiesReference'
    import OrderRequestProductPropertiesReference from 'renderer/api/propertiesReference/OrderRequestProductPropertiesReference'
    import ProductPropertiesReference from 'renderer/api/propertiesReference/ProductPropertiesReference'
    import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
    import {mapGetters} from 'vuex'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    export default {
      name: 'OrderSaleTable',
      inject: ['$validator'],
      data () {
        return {
          simpleCalculationTypeObjects: [{value: 0, text: 'Kilo'}],
          complexCalculationTypeObjects: [{value: 0, text: 'Kilo'}, {value: 1, text: 'Bulto'}],
          currentStructuredObjects: [],
          OrderSaleProductPropertiesReference: OrderSaleProductPropertiesReference,
          total: 0
        }
      },
      components: {
      },
      created () {
      },
      computed: {
        ...mapGetters([
          'getProductById'
        ])
      },
      props: {
        selectedProducts: {
          type: Array,
          required: true
        },
        requestedProducts: {
          type: Array,
          required: true
        },
        initialProducts: {
          type: Array,
          default: function () {
            return []
          }
        },
        saleMode: {
          type: Boolean
        },
        hasTax: {
          type: Boolean
        },
        userHasWritePrivileges: {
          type: Boolean,
          default: function () {
            return true
          }
        }
      },
      methods: {
        emitStructureChangeEvent: function () {
          this.$emit('input', this.currentStructuredObjects)
        },
        getRequestedProductUnits: function (structuredObject, type) {
          let requestedProduct = this.requestedProducts
            .find(product => {
              return product.id === structuredObject['product_id']
            })
          return requestedProduct ? (type === 'kilos' ? requestedProduct.pivot.kilos : requestedProduct.pivot.groups) : 1000000
        },
        getProductCode: function (structuredObject) {
          return this.getProductById(structuredObject['product_id'])[ProductPropertiesReference.CODE.name]
        },
        getProductDescription: function (structuredObject) {
          return this.getProductById(structuredObject['product_id'])[ProductPropertiesReference.DESCRIPTION.name]
        },
        getProductCurrentGroupWeight: function (structuredObject) {
          return this.getProductById(structuredObject['product_id'])[ProductPropertiesReference.CURRENT_GROUP_WEIGHT.name]
        },
        getProductGroupWeightStrict: function (structuredObject) {
          return this.getProductById(structuredObject['product_id'])[ProductPropertiesReference.GROUP_WEIGHT_STRICT.name]
        },
        getInitialOrderProduct: function (productId) {
          let initialProduct = this.initialProducts.find(product => {
            return product[GlobalEntityIdentifier] === productId
          })
          return initialProduct ? initialProduct.pivot : null
        },
        getCurrentObjKiloPrice: function (structuredObject) {
          let currentKiloPrice = this.getProductById(structuredObject['product_id'])[ProductPropertiesReference.CURRENT_KILO_PRICE.name]
          if (structuredObject[OrderRequestProductPropertiesReference.KILO_PRICE.name] >= 0) {
            currentKiloPrice = structuredObject[OrderRequestProductPropertiesReference.KILO_PRICE.name]
          }
          return currentKiloPrice
        },
        isProductBag: function (structuredObject) {
          let product = this.getProductById(structuredObject['product_id'])
          return product ? product[ProductPropertiesReference.PRODUCT_TYPE.relationship_id_name] === 1 : false
        },
        isProductRoll: function (structuredObject) {
          let product = this.getProductById(structuredObject['product_id'])
          return product ? product[ProductPropertiesReference.PRODUCT_TYPE.relationship_id_name] === 2 : false
        },
        isProductOthers: function (structuredObject) {
          let product = this.getProductById(structuredObject['product_id'])
          return product ? product[ProductPropertiesReference.PRODUCT_TYPE.relationship_id_name] === 4 : false
        },
        getCurrentObjInitialKilos: function (currentStructuredObj) {
          let quantity = 0
          let initialSaleProduct = this.getInitialOrderProduct(currentStructuredObj['product_id'])
          if (initialSaleProduct) {
            quantity = initialSaleProduct[OrderSaleProductPropertiesReference.KILOS.name]
          }
          return quantity
        },
        getCurrentObjInitialGroups: function (currentStructuredObj) {
          let quantity = 0
          let initialSaleProduct = this.getInitialOrderProduct(currentStructuredObj['product_id'])
          if (initialSaleProduct) {
            quantity = initialSaleProduct[OrderSaleProductPropertiesReference.GROUPS.name]
          }
          return quantity
        },
        getCurrentObjInitialCalculationType: function (currentStructuredObj) {
          let calculationType = currentStructuredObj['_calculation_type'] ? currentStructuredObj['_calculation_type'] : ''
          let currentObjGroupWeight = this.getCurrentObjGroupWeight(currentStructuredObj)
          if (!calculationType) {
            if (currentObjGroupWeight) {
              calculationType = this.complexCalculationTypeObjects[1]
            } else {
              calculationType = this.simpleCalculationTypeObjects[0]
            }
          }
          return calculationType
        },
        getCurrentObjCalculationType: function (currentStructuredObj) {
          return currentStructuredObj['_calculation_type'] ? currentStructuredObj['_calculation_type'].value : ''
        },
        getCurrentObjGroupWeight: function (currentStructuredObj) {
          let orderProductGroupWeight = null
          let initialOrderProduct = this.getInitialOrderProduct(currentStructuredObj['product_id'])
          if (initialOrderProduct) {
            orderProductGroupWeight = initialOrderProduct[OrderSaleProductPropertiesReference.GROUP_WEIGHT.name]
          } else {
            orderProductGroupWeight = this.getProductCurrentGroupWeight(currentStructuredObj)
          }
          return orderProductGroupWeight
        },
        getCurrentObjTax: function (currentStructuredObj) {
          let totalCostWithoutTax = this.getCurrentObjTotalCostWithoutTax(currentStructuredObj)
          return totalCostWithoutTax * 0.16
        },
        getCurrentObjTotalCostWithoutTax: function (currentStructuredObj) {
          let kilos = currentStructuredObj[OrderSaleProductPropertiesReference.KILOS.name] || 0
          let kiloPrice = this.getCurrentObjKiloPrice(currentStructuredObj)
          return kilos * kiloPrice
        },
        getCurrentObjTotalCost: function (currentStructuredObj) {
          return this.getCurrentObjTax(currentStructuredObj) + this.getCurrentObjTotalCostWithoutTax(currentStructuredObj)
        },
        getOrderTotalCost: function (currentStructuredObjects) {
          let total = 0
          for (let i = 0; i < currentStructuredObjects.length; i++) {
            if (this.hasTax) {
              total += this.getCurrentObjTotalCost(currentStructuredObjects[i])
            } else {
              total += this.getCurrentObjTotalCostWithoutTax(currentStructuredObjects[i])
            }
          }
          total = Math.round(total * 100) / 100
          this.$emit('total', total)
          return total
        },
        setCurrentObjCalculationProperties: function (currentStructuredObj) {
          let kiloPrice = (this.saleMode && currentStructuredObj['_kilo_price']) ? currentStructuredObj['_kilo_price'] : 0
          let productGroupWeight = this.getCurrentObjGroupWeight(currentStructuredObj)
          if (!currentStructuredObj[OrderSaleProductPropertiesReference.GROUP_WEIGHT.name] && productGroupWeight) {
            currentStructuredObj[OrderSaleProductPropertiesReference.GROUP_WEIGHT.name] = productGroupWeight
          }
          currentStructuredObj[OrderSaleProductPropertiesReference.KILO_PRICE.name] = kiloPrice
          if (this.getCurrentObjGroupWeight(currentStructuredObj)) {
            let quantity = currentStructuredObj['_quantity']
            if (this.getCurrentObjCalculationType(currentStructuredObj) === 0) {
              currentStructuredObj[OrderSaleProductPropertiesReference.KILOS.name] = quantity % 1 === 0 ? quantity : quantity
              if (productGroupWeight) {
                currentStructuredObj[OrderSaleProductPropertiesReference.GROUPS.name] = (quantity % 1 === 0 ? quantity : quantity) / productGroupWeight
              }
            }
            if (this.getCurrentObjCalculationType(currentStructuredObj) === 1) {
              if (productGroupWeight) {
                currentStructuredObj[OrderSaleProductPropertiesReference.GROUPS.name] = quantity % 1 === 0 ? quantity : quantity
                currentStructuredObj[OrderSaleProductPropertiesReference.KILOS.name] = (quantity % 1 === 0 ? quantity : quantity) * productGroupWeight
              }
            }
          } else {
            let manualKilos = currentStructuredObj['_manual_kilos']
            let manualGroups = currentStructuredObj['_manual_groups']
            currentStructuredObj[OrderSaleProductPropertiesReference.KILOS.name] = manualKilos
            currentStructuredObj[OrderSaleProductPropertiesReference.GROUPS.name] = manualGroups
          }
          this.emitStructureChangeEvent()
        },
        setCurrentObjManualProperties: function (currentStructuredObj) {
          let kiloPrice = (this.saleMode && currentStructuredObj['_kilo_price']) ? currentStructuredObj['_kilo_price'] : 0
          let manualGroups = currentStructuredObj['_manual_groups'] || 0
          let manualKilos = currentStructuredObj['_manual_kilos'] || 0
          currentStructuredObj[OrderSaleProductPropertiesReference.GROUPS.name] = manualGroups
          currentStructuredObj[OrderSaleProductPropertiesReference.KILOS.name] = manualKilos
          currentStructuredObj[OrderSaleProductPropertiesReference.KILO_PRICE.name] = kiloPrice
          this.emitStructureChangeEvent()
        }
      },
      watch: {
        selectedProducts: function () {
          let tempCurrentStructuredObjects = []
          for (let i = 0; i < this.selectedProducts.length; i++) {
            let selectedProduct = this.selectedProducts[i]
            let currentStructuredObjFound = this.currentStructuredObjects.find(currentStructuredObj => {
              return currentStructuredObj['product_id'] === selectedProduct[GlobalEntityIdentifier]
            })
            if (currentStructuredObjFound) {
              tempCurrentStructuredObjects.push(currentStructuredObjFound)
            } else {
              let saleProduct = this.getInitialOrderProduct(selectedProduct[GlobalEntityIdentifier])
              if (saleProduct) {
                saleProduct = cloneDeep(saleProduct)
              } else {
                saleProduct = {}
                saleProduct['product_id'] = selectedProduct[GlobalEntityIdentifier]
              }
              tempCurrentStructuredObjects.push(saleProduct)
            }
          }
          this.currentStructuredObjects = tempCurrentStructuredObjects
          this.emitStructureChangeEvent()
        },
        saleMode: function (saleMode) {
          if (!saleMode) {
            this.currentStructuredObjects.forEach(currentStructuredObj => {
              currentStructuredObj[OrderSaleProductPropertiesReference.KILO_PRICE.name] = 0
            })
          }
        }
      }
    }
</script>

<style lang="scss">

</style>
