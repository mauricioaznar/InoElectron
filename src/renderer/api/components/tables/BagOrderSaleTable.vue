<template>
    <div class="x-overflow">
        <table class="mau-table table table-striped">
            <thead>
                <tr>
                    <th class="mau-text-center">Producto</th>
                    <th class="mau-text-center">Descripción</th>
                    <th class="mau-text-center">Cantidad</th>
                    <th class="mau-text-center">Unidad</th>
                    <th class="mau-text-center">Precio unitario en kilos</th>
                    <th class="mau-text-center">Cantidad en kilos</th>
                    <th class="mau-text-center">Peso en kilos por bulto</th>
                    <th class="mau-text-center">Cantidad en bultos</th>
                    <th v-if="hasTax" class="mau-text-center">IVA</th>
                    <th class="mau-text-center">Costo Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(currentStructuredObj, index) in currentStructuredObjects" :key="currentStructuredObj['bag_id']">
                    <td class="mau-text-center">{{getBagName(currentStructuredObj)}}</td>
                    <td class="mau-text-center">{{getBagDescription(currentStructuredObj)}}</td>
                    <td class="mau-text-center">
                        <mau-form-input-number
                                v-if="currentStructuredObj['_calculation_type'] === 0"
                                :name="'_quantity_kilo' + currentStructuredObj['bag_id']"
                                :initialValue="getCurrentObjInitialQuantity(currentStructuredObj)"
                                v-model="currentStructuredObj._quantity"
                                :type="'float'"
                                :key="'_quantity_kilo' + currentStructuredObj['bag_id']"
                                v-validate="{
                                    required: true,
                                    kilo_to_group: {
                                        groupWeight: getCurrentObjGroupWeight(currentStructuredObj)
                                    }
                                }"
                                :error="errors.first('_quantity_kilo' + currentStructuredObj['bag_id'])"
                                @input="setCurrentObjProperties(currentStructuredObj)"
                        >
                        </mau-form-input-number>
                        <mau-form-input-number
                                v-if="currentStructuredObj['_calculation_type'] === 1"
                                :name="'_quantity_group' + currentStructuredObj['bag_id']"
                                :initialValue="getCurrentObjInitialQuantity(currentStructuredObj)"
                                v-model="currentStructuredObj._quantity"
                                :type="'regular'"
                                v-validate="'required'"
                                :key="'_quantity_group' + currentStructuredObj['bag_id']"
                                :error="errors.first('_quantity_group' + currentStructuredObj['bag_id'])"
                                @input="setCurrentObjProperties(currentStructuredObj)"
                        >
                        </mau-form-input-number>
                    </td>
                    <td class="mau-text-center extra-select-width">
                        <mau-form-input-select-bootstrap
                                v-model="currentStructuredObj._calculation_type"
                                :initialValue="getCurrentObjInitialCalculationType(currentStructuredObj)"
                                @input="setCurrentObjProperties(currentStructuredObj)"
                        >
                            <option :value="0">Kilo</option>
                            <option :value="1" v-if="getCurrentObjGroupWeight(currentStructuredObj)">Bulto</option>
                        </mau-form-input-select-bootstrap>
                    </td>
                    <td class="mau-text-center">
                        <mau-form-input-number
                                v-if="requestMode"
                                :name="BagOrderProductSalePropertiesReference.KILO_PRICE.name + currentStructuredObj['bag_id']"
                                :error="errors.first(BagOrderProductSalePropertiesReference.KILO_PRICE.name + currentStructuredObj['bag_id'])"
                                v-model="currentStructuredObj.kilo_price"
                                :initialValue="getCurrentObjKiloPrice(currentStructuredObj)"
                                :type="'float'"
                                v-validate="'required|min_value:1'"
                                @input="setCurrentObjProperties(currentStructuredObj)"
                        >
                        </mau-form-input-number>
                        <div v-if="receiptMode">
                            {{getCurrentObjKiloPrice(currentStructuredObj)}}
                        </div>
                    </td>
                    <td>
                        <div v-if="requestMode">
                            {{currentStructuredObj.kilos_requested}}
                        </div>
                        <div v-if="receiptMode">
                            {{currentStructuredObj.kilos_given}}
                        </div>
                    </td>
                    <td class="mau-text-center">
                        {{getCurrentObjGroupWeight(currentStructuredObj)}}
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
                        {{getCurrentObjTax(currentStructuredObj)}}
                    </td>
                    <td class="mau-text-center">
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
                    <td v-if="hasTax"></td>
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
    import BagOrderProductSalePropertiesReference from 'renderer/api/propertiesReference/BagOrderSaleProductPropertiesReference'
    import ProductPropertiesReference from 'renderer/api/propertiesReference/BagPropertiesReference'
    import MauFormInputRegularNumber from 'renderer/api/components/inputs/MauFormInputRegularNumber.vue'
    import MauFormInputNumber from 'renderer/api/components/inputs/MauFormInputNumber.vue'
    import MauFormInputSelect from 'renderer/api/components/inputs/MauFormInputSelect.vue'
    import MauFormInputSelectBootstrap from 'renderer/api/components/inputs/MauFormInputBootstrapSelect.vue'
    import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
    import {mapGetters} from 'vuex'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
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
          BagOrderProductSalePropertiesReference: BagOrderProductSalePropertiesReference,
          total: 0
        }
      },
      components: {
        MauFormInputRegularNumber,
        MauFormInputSelect,
        MauFormInputSelectBootstrap,
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
        selectedBags: {
          type: Array,
          required: true
        },
        initialBags: {
          type: Array,
          default: function () {
            return []
          }
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
        emitStructureChangeEvent: function () {
          let initialSaleBags = ManyToManyHelper.createM2MStructuredObjects(this.initialBags, 'bag_id')
          let filteredStructuredObjects = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialSaleBags, this.currentStructuredObjects, 'bag_id')
          this.$emit('input', filteredStructuredObjects)
        },
        quantityVeeValidation: function (currentStructuredObj) {
          let calculationType = currentStructuredObj['_calculation_type']
          return calculationType === 0 ? 'required' : ''
        },
        getBagName: function (structuredObject) {
          return this.getBagById(structuredObject['bag_id'])[ProductPropertiesReference.NAME.name]
        },
        getBagDescription: function (structuredObject) {
          return this.getBagById(structuredObject['bag_id'])[ProductPropertiesReference.DESCRIPTION.name]
        },
        getBagCurrentGroupWeight: function (structuredObject) {
          return this.getBagById(structuredObject['bag_id'])[ProductPropertiesReference.CURRENT_GROUP_WEIGHT.name]
        },
        getInitialSaleBag: function (bagId) {
          let initialBag = this.initialBags.find(bag => {
            return bag[GlobalEntityIdentifier] === bagId
          })
          return initialBag ? initialBag.pivot : null
        },
        getCurrentObjKiloPrice: function (structuredObject) {
          let currentKiloPrice = this.getBagById(structuredObject['bag_id'])[ProductPropertiesReference.CURRENT_KILO_PRICE.name]
          if (structuredObject[BagOrderProductSalePropertiesReference.KILO_PRICE.name]) {
            currentKiloPrice = structuredObject[BagOrderProductSalePropertiesReference.KILO_PRICE.name]
          }
          return currentKiloPrice
        },
        getCurrentObjInitialQuantity: function (currentStructuredObj) {
          let quantity = 0
          let initialSaleBag = this.getInitialSaleBag(currentStructuredObj['bag_id'])
          let initialCalculationType = this.getCurrentObjInitialCalculationType(currentStructuredObj)
          if (initialSaleBag) {
            if (initialCalculationType === 0) {
              if (this.requestMode) {
                quantity = initialSaleBag[BagOrderProductSalePropertiesReference.KILOS_REQUESTED.name]
              }
              if (this.receiptMode) {
                quantity = initialSaleBag[BagOrderProductSalePropertiesReference.KILOS_GIVEN.name]
              }
            }
            if (initialCalculationType === 1) {
              if (this.requestMode) {
                quantity = initialSaleBag[BagOrderProductSalePropertiesReference.GROUPS_REQUESTED.name]
              }
              if (this.receiptMode) {
                quantity = initialSaleBag[BagOrderProductSalePropertiesReference.GROUPS_GIVEN.name]
              }
            }
          }
          return quantity
        },
        getCurrentObjInitialCalculationType: function (currentStructuredObj) {
          let calculationType = currentStructuredObj['_calculation_type']
          let currentObjGroupWeight = this.getCurrentObjGroupWeight(currentStructuredObj)
          if (calculationType !== 0 && calculationType !== 1) {
            if (this.hasTax && currentObjGroupWeight) {
              calculationType = 1
            } else {
              calculationType = 0
            }
          }
          return calculationType
        },
        getCurrentObjGroupWeight: function (currentStructuredObj) {
          let bagSaleGroupWeight = null
          let initialSaleBag = this.getInitialSaleBag(currentStructuredObj['bag_id'])
          if (initialSaleBag) {
            let groups = initialSaleBag[BagOrderProductSalePropertiesReference.GROUPS_REQUESTED.name]
            let kilos = initialSaleBag[BagOrderProductSalePropertiesReference.KILOS_REQUESTED.name]
            if (!isNaN(groups) && groups > 0 && !isNaN(kilos) && kilos > 0) {
              bagSaleGroupWeight = kilos / groups
            }
          } else {
            bagSaleGroupWeight = this.getBagCurrentGroupWeight(currentStructuredObj)
          }
          return bagSaleGroupWeight
        },
        getCurrentObjTax: function (currentStructuredObj) {
          let totalCostWithoutTax = this.getCurrentObjTotalCostWithoutTax(currentStructuredObj)
          return totalCostWithoutTax * 0.16
        },
        getCurrentObjTotalCostWithoutTax: function (currentStructuredObj) {
          let kilos = 0
          let kiloPrice = this.getCurrentObjKiloPrice(currentStructuredObj)
          if (this.requestMode) {
            kilos = currentStructuredObj[BagOrderProductSalePropertiesReference.KILOS_REQUESTED.name]
          }
          if (this.receiptMode) {
            kilos = currentStructuredObj[BagOrderProductSalePropertiesReference.KILOS_GIVEN.name]
          }
          return kilos * kiloPrice
        },
        getCurrentObjTotalCost: function (currentStructuredObj) {
          return this.getCurrentObjTax(currentStructuredObj) + this.getCurrentObjTotalCostWithoutTax(currentStructuredObj)
        },
        setCurrentObjProperties: function (currentStructuredObj) {
          let quantity = currentStructuredObj['_quantity'] || 0
          let bagGroupWeight = this.getCurrentObjGroupWeight(currentStructuredObj)
          if (currentStructuredObj['_calculation_type'] === 0) {
            if (this.requestMode) {
              currentStructuredObj[BagOrderProductSalePropertiesReference.KILOS_REQUESTED.name] = quantity
              if (bagGroupWeight) {
                currentStructuredObj[BagOrderProductSalePropertiesReference.GROUPS_REQUESTED.name] = quantity / bagGroupWeight
              }
            }
            if (this.receiptMode) {
              currentStructuredObj[BagOrderProductSalePropertiesReference.KILOS_GIVEN.name] = quantity
              if (bagGroupWeight) {
                currentStructuredObj[BagOrderProductSalePropertiesReference.GROUPS_GIVEN.name] = quantity / bagGroupWeight
              }
            }
          }
          if (currentStructuredObj['_calculation_type'] === 1) {
            if (this.requestMode && bagGroupWeight) {
              currentStructuredObj[BagOrderProductSalePropertiesReference.GROUPS_REQUESTED.name] = quantity
              currentStructuredObj[BagOrderProductSalePropertiesReference.KILOS_REQUESTED.name] = quantity * bagGroupWeight
            }
            if (this.receiptMode && bagGroupWeight) {
              currentStructuredObj[BagOrderProductSalePropertiesReference.GROUPS_GIVEN.name] = quantity
              currentStructuredObj[BagOrderProductSalePropertiesReference.KILOS_GIVEN.name] = quantity * bagGroupWeight
            }
          }
          this.emitStructureChangeEvent()
        }
      },
      watch: {
        selectedBags: function () {
          let tempCurrentStructuredObjects = []
          for (let i = 0; i < this.selectedBags.length; i++) {
            let selectedBag = this.selectedBags[i]
            let currentStructuredObjFound = this.currentStructuredObjects.find(currentStructuredObj => {
              return currentStructuredObj['bag_id'] === selectedBag[GlobalEntityIdentifier]
            })
            if (currentStructuredObjFound) {
              tempCurrentStructuredObjects.push(currentStructuredObjFound)
            } else {
              let saleBag = this.getInitialSaleBag(selectedBag[GlobalEntityIdentifier])
              if (saleBag) {
                saleBag = cloneDeep(saleBag)
              } else {
                saleBag = {}
                saleBag['bag_id'] = selectedBag[GlobalEntityIdentifier]
              }
              tempCurrentStructuredObjects.push(saleBag)
            }
          }
          this.currentStructuredObjects = tempCurrentStructuredObjects
        }
      }
    }
</script>

<style lang="scss">

</style>