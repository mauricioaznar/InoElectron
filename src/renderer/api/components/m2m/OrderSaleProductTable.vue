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
                                v-if="currentStructuredObj['_calculation_type'] === 0 && getCurrentObjGroupWeight(currentStructuredObj) && isProductBag(currentStructuredObj)"
                                :name="'_quantity_kilo' + currentStructuredObj['product_id']"
                                :initialValue="getCurrentObjInitialKilos(currentStructuredObj)"
                                v-model="currentStructuredObj._quantity"
                                :type="'float'"
                                :key="'_quantity_kilo' + currentStructuredObj['product_id']"
                                :error="errors.first('_quantity_kilo' + currentStructuredObj['product_id'])"
                                @input="setCurrentObjProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                v-validate="{
                                    required: true,
                                    kilo_to_group: {
                                        groupWeight: getCurrentObjGroupWeight(currentStructuredObj),
                                        isGroupWeightStrict: getProductGroupWeightStrict(currentStructuredObj)
                                    }
                                }"
                        >
                        </mau-form-input-number>
                        <mau-form-input-number
                                v-if="currentStructuredObj['_calculation_type'] === 1 && getCurrentObjGroupWeight(currentStructuredObj) && isProductBag(currentStructuredObj)"
                                :name="'_quantity_group' + currentStructuredObj['product_id']"
                                :initialValue="getCurrentObjInitialGroups(currentStructuredObj)"
                                v-model="currentStructuredObj._quantity"
                                :type="getProductGroupWeightStrict(currentStructuredObj) ? 'regular' : 'float'"
                                :key="'_quantity_group' + currentStructuredObj['product_id']"
                                :error="errors.first('_quantity_group' + currentStructuredObj['product_id'])"
                                @input="setCurrentObjProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                v-validate="{
                                  required: true
                                }"
                        >
                        </mau-form-input-number>
                    </td>
                    <td class="mau-text-center extra-select-width">
                        <mau-form-input-select-bootstrap
                                v-model="currentStructuredObj._calculation_type"
                                v-if="getCurrentObjGroupWeight(currentStructuredObj) && isProductBag(currentStructuredObj)"
                                :initialValue="getCurrentObjInitialCalculationType(currentStructuredObj)"
                                @input="setCurrentObjProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                        >
                            <option :value="0">Kilo</option>
                            <option :value="1" v-if="getCurrentObjGroupWeight(currentStructuredObj)">Bulto</option>
                        </mau-form-input-select-bootstrap>
                    </td>
                    <td v-if="saleMode" class="mau-text-center">
                        <mau-form-input-number
                                :name="'kilo_price' + currentStructuredObj['product_id']"
                                :error="errors.first('kilo_price' + currentStructuredObj['product_id'])"
                                v-model="currentStructuredObj._kilo_price"
                                :initialValue="getCurrentObjKiloPrice(currentStructuredObj)"
                                :type="'float'"
                                @input="setCurrentObjProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                v-validate="'required'"
                        >
                        </mau-form-input-number>
                    </td>
                    <td>
                        <div v-if="getCurrentObjGroupWeight(currentStructuredObj) && isProductBag(currentStructuredObj)">
                            {{currentStructuredObj.kilos}}
                        </div>
                        <mau-form-input-number
                                v-else
                                :name="'_manual_kilos' + currentStructuredObj['product_id']"
                                :initialValue="getCurrentObjInitialKilos(currentStructuredObj)"
                                v-model="currentStructuredObj._manual_kilos"
                                :type="'float'"
                                :key="'_manual_kilos' + currentStructuredObj['product_id']"
                                :error="errors.first('_manual_kilos' + currentStructuredObj['product_id'])"
                                @input="setCurrentObjManualProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                v-validate="'required'"
                        >
                        </mau-form-input-number>
                    </td>
                    <td class="mau-text-center">
                        {{getCurrentObjGroupWeight(currentStructuredObj)}}
                    </td>
                    <td class="mau-text-center">
                        <div v-if="getCurrentObjGroupWeight(currentStructuredObj) && isProductBag(currentStructuredObj)">
                            {{currentStructuredObj.groups}}
                        </div>
                        <mau-form-input-number
                                v-else
                                :name="'_manual_groups' + currentStructuredObj['product_id']"
                                :initialValue="getCurrentObjInitialGroups(currentStructuredObj)"
                                v-model="currentStructuredObj._manual_groups"
                                :type="'regular'"
                                :key="'_manual_groups' + currentStructuredObj['product_id']"
                                :error="errors.first('_manual_groups' + currentStructuredObj['product_id'])"
                                @input="setCurrentObjManualProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                v-validate="'required'"
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
    import MauFormInputNumber from 'renderer/api/components/inputs/MauFormInputNumber.vue'
    import MauFormInputSelectBootstrap from 'renderer/api/components/inputs/MauFormInputBootstrapSelect.vue'
    import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
    import {mapGetters} from 'vuex'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    export default {
      name: 'OrderSaleTable',
      inject: ['$validator'],
      data () {
        return {
          calculationTypes: [
            {value: 0, text: 'Kilo', name: 'KiloCalculationType'},
            {value: 1, text: 'Bulto', name: 'GroupCalculationType'}
          ],
          currentStructuredObjects: [],
          OrderSaleProductPropertiesReference: OrderSaleProductPropertiesReference,
          total: 0
        }
      },
      components: {
        MauFormInputSelectBootstrap,
        MauFormInputNumber
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
          if (structuredObject[OrderRequestProductPropertiesReference.KILO_PRICE.name]) {
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
          return product ? product[ProductPropertiesReference.PRODUCT_TYPE.relationship_id_name] === 1 : false
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
          let calculationType = currentStructuredObj['_calculation_type']
          let currentObjGroupWeight = this.getCurrentObjGroupWeight(currentStructuredObj)
          if (calculationType !== 0 && calculationType !== 1) {
            if (currentObjGroupWeight) {
              calculationType = 1
            } else {
              calculationType = 0
            }
          }
          return calculationType
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
          return total
        },
        setCurrentObjProperties: function (currentStructuredObj) {
          let quantity = currentStructuredObj['_quantity'] || 0
          let kiloPrice = (this.saleMode && currentStructuredObj['_kilo_price']) ? currentStructuredObj['_kilo_price'] : 0
          let productGroupWeight = this.getCurrentObjGroupWeight(currentStructuredObj)
          if (!currentStructuredObj[OrderSaleProductPropertiesReference.GROUP_WEIGHT.name] && productGroupWeight) {
            currentStructuredObj[OrderSaleProductPropertiesReference.GROUP_WEIGHT.name] = productGroupWeight
          }
          currentStructuredObj[OrderSaleProductPropertiesReference.KILO_PRICE.name] = kiloPrice
          if (currentStructuredObj['_calculation_type'] === 0) {
            currentStructuredObj[OrderSaleProductPropertiesReference.KILOS.name] = quantity % 1 === 0 ? quantity : quantity
            if (productGroupWeight) {
              currentStructuredObj[OrderSaleProductPropertiesReference.GROUPS.name] = (quantity % 1 === 0 ? quantity : quantity) / productGroupWeight
            }
          }
          if (currentStructuredObj['_calculation_type'] === 1) {
            if (productGroupWeight) {
              currentStructuredObj[OrderSaleProductPropertiesReference.GROUPS.name] = quantity % 1 === 0 ? quantity : quantity
              currentStructuredObj[OrderSaleProductPropertiesReference.KILOS.name] = (quantity % 1 === 0 ? quantity : quantity) * productGroupWeight
            }
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