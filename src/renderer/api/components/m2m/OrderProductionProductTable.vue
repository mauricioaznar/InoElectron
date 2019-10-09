<template>
    <div>
        <table class="mau-check-table table table-striped">
            <thead>
                <tr>
                    <th class="mau-text-center">Producto</th>
                    <th class="mau-text-center">Descripcion</th>
                    <th class="mau-text-center" v-if="bagMode">Cantidad</th>
                    <th class="mau-text-center" v-if="bagMode">Unidad</th>
                    <th class="mau-text-center">Kilos</th>
                    <th class="mau-text-center" v-if="bagMode">Peso del bulto</th>
                    <th class="mau-text-center">Bultos</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(currentStructuredObj, index) in currentStructuredObjects" :key="index">
                    <td class="mau-text-center">{{getProductCode(currentStructuredObj)}}</td>
                    <td class="mau-text-center">{{getProductDescription(currentStructuredObj)}}</td>
                    <td class="mau-text-center" v-if="bagMode">
                        <mau-form-input-number
                                v-if="getCurrentObjCalculationType(currentStructuredObj) === 0 && getCurrentObjGroupWeight(currentStructuredObj)"
                                :name="'_quantity_kilo' + currentStructuredObj['product_id']"
                                :initialValue="getCurrentObjInitialKilos(currentStructuredObj)"
                                v-model="currentStructuredObj._quantity"
                                :type="'float'"
                                :negative="allowNegative"
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
                                    min_value: 1
                                }"
                        >
                        </mau-form-input-number>
                        <mau-form-input-number
                                v-if="getCurrentObjCalculationType(currentStructuredObj) === 1 && getCurrentObjGroupWeight(currentStructuredObj)"
                                :name="'_quantity_group' + currentStructuredObj['product_id']"
                                :initialValue="getCurrentObjInitialGroups(currentStructuredObj)"
                                v-model="currentStructuredObj._quantity"
                                :type="'regular'"
                                :negative="allowNegative"
                                :key="'_quantity_group' + currentStructuredObj['product_id']"
                                :error="errors.has('_quantity_group' + currentStructuredObj['product_id']) ? errors.first('_quantity_group' + currentStructuredObj['product_id']) : ''"
                                @input="setCurrentObjCalculationProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                v-validate="'required|min_value:1'"
                        >
                        </mau-form-input-number>
                    </td>
                    <td class="mau-text-center extra-select-width" v-if="bagMode">
                        <mau-form-input-select-static
                                v-model="currentStructuredObj._calculation_type"
                                v-if="!(!getCurrentObjGroupWeight(currentStructuredObj))"
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
                                v-model="currentStructuredObj._calculation_type"
                                v-if="!(getCurrentObjGroupWeight(currentStructuredObj))"
                                :initialObject="getCurrentObjInitialCalculationType(currentStructuredObj)"
                                @input="setCurrentObjCalculationProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                :availableObjects="simpleCalculationTypeObjects"
                                :displayProperty="'text'"
                                :trackBy="'value'"
                                :hasClear="false"
                                :multiselect="false"
                                :name="'calculationType' + currentStructuredObj['product_id']"
                                :v-validate="'required'"
                                :error="errors.has('calculationType' + currentStructuredObj['product_id']) ? errors.first('calculationType' + currentStructuredObj['product_id']) : ''"
                        >
                        </mau-form-input-select-static>
                    </td>
                    <td class="mau-text-center">
                        <div v-if="bagMode && getCurrentObjGroupWeight(currentStructuredObj)">
                            {{currentStructuredObj.kilos}}
                        </div>
                        <mau-form-input-number
                                v-else
                                :name="'_manual_kilos' + currentStructuredObj['product_id']"
                                :initialValue="getCurrentObjInitialKilos(currentStructuredObj)"
                                v-model="currentStructuredObj._manual_kilos"
                                :type="'float'"
                                :negative="allowNegative"
                                :key="'_manual_kilos' + currentStructuredObj['product_id']"
                                :error="errors.has('_manual_kilos' + currentStructuredObj['product_id']) ? errors.first('_manual_kilos' + currentStructuredObj['product_id']) : ''"
                                @input="setCurrentObjManualProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                v-validate="'required|min_value:1'"
                        >
                        </mau-form-input-number>
                    </td>
                    <td class="mau-text-center" v-if="bagMode">
                        <div>
                            {{getProductCurrentGroupWeight(currentStructuredObj)}}
                        </div>
                    </td>
                    <td class="mau-text-center">
                        <div v-if="bagMode && getCurrentObjGroupWeight(currentStructuredObj)">
                            {{currentStructuredObj.groups}}
                        </div>
                        <mau-form-input-number
                                v-else
                                :name="'_manual_groups' + currentStructuredObj['product_id']"
                                :initialValue="getCurrentObjInitialGroups(currentStructuredObj)"
                                v-model="currentStructuredObj._manual_groups"
                                :type="'regular'"
                                :negative="allowNegative"
                                :key="'_manual_groups' + currentStructuredObj['product_id']"
                                :error="errors.has('_manual_groups' + currentStructuredObj['product_id']) ? errors.first('_manual_groups' + currentStructuredObj['product_id']) : ''"
                                @input="setCurrentObjManualProperties(currentStructuredObj)"
                                :disabled="!userHasWritePrivileges"
                                v-validate="'required|min_value:1'"
                        >
                        </mau-form-input-number>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import BagOrderProductPropertiesReference from 'renderer/api/propertiesReference/OrderProductionProductPropertiesReference'
    import ProductPropertiesReference from 'renderer/api/propertiesReference/ProductPropertiesReference'
    import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
    import {mapGetters} from 'vuex'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    export default {
      name: 'OrderProductionTable',
      inject: ['$validator'],
      data () {
        return {
          currentStructuredObjects: [],
          BagOrderProductPropertiesReference: BagOrderProductPropertiesReference,
          simpleCalculationTypeObjects: [{value: 0, text: 'Kilo'}],
          complexCalculationTypeObjects: [{value: 0, text: 'Kilo'}, {value: 1, text: 'Bulto'}]
        }
      },
      created () {
      },
      computed: {
        ...mapGetters([
          'getProductById'
        ])
      },
      components: {
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
        allowNegative: {
          type: Boolean,
          default: function () {
            return false
          }
        },
        machineId: {
          type: Number
        },
        bagMode: {
          type: Boolean,
          default: function () {
            return false
          }
        },
        extrusionMode: {
          type: Boolean,
          default: function () {
            return false
          }
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
          let product = this.getProductById(structuredObject['product_id'])
          return product ? product[ProductPropertiesReference.CODE.name] : ''
        },
        getProductDescription: function (structuredObject) {
          let product = this.getProductById(structuredObject['product_id'])
          return product ? product[ProductPropertiesReference.DESCRIPTION.name] : ''
        },
        getProductCurrentGroupWeight: function (structuredObject) {
          let product = this.getProductById(structuredObject['product_id'])
          return product ? product[ProductPropertiesReference.CURRENT_GROUP_WEIGHT.name] : ''
        },
        getProductGroupWeightStrict: function (structuredObject) {
          let product = this.getProductById(structuredObject['product_id'])
          return product ? product[ProductPropertiesReference.GROUP_WEIGHT_STRICT.name] : ''
        },
        getInitialSaleProduct: function (productId) {
          let initialProduct = this.initialProducts.find(product => {
            return product[GlobalEntityIdentifier] === productId
          })
          return initialProduct ? initialProduct.pivot : null
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
          let initialSaleProduct = this.getInitialSaleProduct(currentStructuredObj['product_id'])
          if (initialSaleProduct) {
            quantity = initialSaleProduct[BagOrderProductPropertiesReference.KILOS.name]
          }
          return quantity
        },
        getCurrentObjInitialGroups: function (currentStructuredObj) {
          let quantity = 0
          let initialSaleProduct = this.getInitialSaleProduct(currentStructuredObj['product_id'])
          if (initialSaleProduct) {
            quantity = initialSaleProduct[BagOrderProductPropertiesReference.GROUPS.name]
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
          let productSaleGroupWeight = null
          let initialSaleProduct = this.getInitialSaleProduct(currentStructuredObj['product_id'])
          if (initialSaleProduct) {
            productSaleGroupWeight = initialSaleProduct[BagOrderProductPropertiesReference.GROUP_WEIGHT.name]
          } else {
            productSaleGroupWeight = this.getProductCurrentGroupWeight(currentStructuredObj)
          }
          return productSaleGroupWeight
        },
        setCurrentObjCalculationProperties: function (currentStructuredObj) {
          let quantity = currentStructuredObj['_quantity'] || 0
          let productGroupWeight = this.getCurrentObjGroupWeight(currentStructuredObj)
          if (!currentStructuredObj[BagOrderProductPropertiesReference.GROUP_WEIGHT.name] && productGroupWeight) {
            currentStructuredObj[BagOrderProductPropertiesReference.GROUP_WEIGHT.name] = productGroupWeight
          }
          if (this.getCurrentObjCalculationType(currentStructuredObj) === 0) {
            currentStructuredObj[BagOrderProductPropertiesReference.KILOS.name] = quantity
            if (productGroupWeight) {
              currentStructuredObj[BagOrderProductPropertiesReference.GROUPS.name] = quantity / productGroupWeight
            }
          }
          if (this.getCurrentObjCalculationType(currentStructuredObj) === 1) {
            if (productGroupWeight) {
              currentStructuredObj[BagOrderProductPropertiesReference.GROUPS.name] = quantity
              currentStructuredObj[BagOrderProductPropertiesReference.KILOS.name] = quantity * productGroupWeight
            }
          }
          this.emitStructureChangeEvent()
        },
        setCurrentObjManualProperties: function (currentStructuredObj) {
          let manualGroups = currentStructuredObj['_manual_groups'] || 0
          let manualKilos = currentStructuredObj['_manual_kilos'] || 0
          currentStructuredObj[BagOrderProductPropertiesReference.GROUPS.name] = manualGroups
          currentStructuredObj[BagOrderProductPropertiesReference.KILOS.name] = manualKilos
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
              let saleProduct = this.getInitialSaleProduct(selectedProduct[GlobalEntityIdentifier])
              if (saleProduct) {
                saleProduct = cloneDeep(saleProduct)
              } else {
                saleProduct = {}
                saleProduct['product_id'] = selectedProduct[GlobalEntityIdentifier]
                if (this.machineId) {
                  saleProduct['machine_id'] = this.machineId
                }
              }
              tempCurrentStructuredObjects.push(saleProduct)
            }
          }
          this.currentStructuredObjects = tempCurrentStructuredObjects
          this.emitStructureChangeEvent()
        },
        machineId: function (machineId) {
          this.currentStructuredObjects.forEach(currentStructuredObj => {
            currentStructuredObj['machine_id'] = machineId
          })
        }
      }
    }
</script>
