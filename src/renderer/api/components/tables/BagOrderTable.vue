<template>
    <div>
        <table class="mau-check-table table table-striped">
            <thead>
                <tr>
                    <th class="mau-text-center">Producto</th>
                    <th class="mau-text-center">Descripcion</th>
                    <th class="mau-text-center">Cantidad</th>
                    <th class="mau-text-center">Unidad</th>
                    <th class="mau-text-center">Kilos</th>
                    <th class="mau-text-center">Peso del bulto</th>
                    <th class="mau-text-center">Bultos</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(currentStructuredObj, index) in currentStructuredObjects" :key="index">
                    <td class="mau-text-center">{{getProductName(currentStructuredObj)}}</td>
                    <td class="mau-text-center">{{getProductDescription(currentStructuredObj)}}</td>
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
                                        groupWeight: getCurrentObjGroupWeight(currentStructuredObj),
                                        isGroupWeightStrict: getBagGroupWeightStrict(currentStructuredObj)
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
                                :type="'float'"
                                v-validate="getBagGroupWeightStrict(currentStructuredObj) ? 'required|integer' : 'required'"
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
                        <div>
                            {{currentStructuredObj.kilos}}
                        </div>
                    </td>
                    <td class="mau-text-center">
                        <div>
                            {{getBagCurrentGroupWeight(currentStructuredObj)}}
                        </div>
                    </td>
                    <td class="mau-text-center">
                        <div>
                            {{currentStructuredObj.groups}}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import OrderProductPropertiesReference from 'renderer/api/propertiesReference/BagOrderProductPropertiesReference'
    import ProductPropertiesReference from 'renderer/api/propertiesReference/BagPropertiesReference'
    import MauFormInputRegularNumber from 'renderer/api/components/inputs/MauFormInputRegularNumber.vue'
    import MauFormInputNumber from 'renderer/api/components/inputs/MauFormInputNumber.vue'
    import MauFormInputSelectBootstrap from 'renderer/api/components/inputs/MauFormInputBootstrapSelect.vue'
    import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'
    import {mapGetters} from 'vuex'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import ManyToManyHelper from 'renderer/api/functions/ManyToManyHelper'
    export default {
      name: 'BagOrderTable',
      inject: ['$validator'],
      data () {
        return {
          currentStructuredObjects: [],
          OrderProductPropertiesReference: OrderProductPropertiesReference
        }
      },
      created () {
      },
      computed: {
        ...mapGetters([
          'getBagById'
        ])
      },
      components: {
        MauFormInputRegularNumber,
        MauFormInputSelectBootstrap,
        MauFormInputNumber
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
        productionMode: {
          type: Boolean,
          default: function () {
            return false
          }
        },
        adjustmentMode: {
          type: Boolean,
          default: function () {
            return false
          }
        }
      },
      methods: {
        emitStructureChangeEvent: function () {
          let initialSaleBags = ManyToManyHelper.createM2MStructuredObjects(this.initialBags, 'bag_id')
          let filteredStructuredObjects = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialSaleBags, this.currentStructuredObjects, 'bag_id')
          this.$emit('input', filteredStructuredObjects)
        },
        getProductName: function (structuredObject) {
          return this.getBagById(structuredObject['bag_id'])[ProductPropertiesReference.NAME.name]
        },
        getProductDescription: function (structuredObject) {
          return this.getBagById(structuredObject['bag_id'])[ProductPropertiesReference.DESCRIPTION.name]
        },
        getBagCurrentGroupWeight: function (structuredObject) {
          return this.getBagById(structuredObject['bag_id'])[ProductPropertiesReference.CURRENT_GROUP_WEIGHT.name]
        },
        getBagGroupWeightStrict: function (structuredObject) {
          return this.getBagById(structuredObject['bag_id'])[ProductPropertiesReference.GROUP_WEIGHT_STRICT.name]
        },
        getInitialSaleBag: function (bagId) {
          let initialBag = this.initialBags.find(bag => {
            return bag[GlobalEntityIdentifier] === bagId
          })
          return initialBag ? initialBag.pivot : null
        },
        getCurrentObjInitialQuantity: function (currentStructuredObj) {
          let quantity = 0
          let initialSaleBag = this.getInitialSaleBag(currentStructuredObj['bag_id'])
          let initialCalculationType = this.getCurrentObjInitialCalculationType(currentStructuredObj)
          if (initialSaleBag) {
            if (initialCalculationType === 0) {
              quantity = initialSaleBag[OrderProductPropertiesReference.KILOS.name]
            }
            if (initialCalculationType === 1) {
              quantity = initialSaleBag[OrderProductPropertiesReference.GROUPS.name]
            }
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
          let bagSaleGroupWeight = null
          let initialSaleBag = this.getInitialSaleBag(currentStructuredObj['bag_id'])
          if (initialSaleBag) {
            bagSaleGroupWeight = initialSaleBag[OrderProductPropertiesReference.GROUP_WEIGHT.name]
          } else {
            bagSaleGroupWeight = this.getBagCurrentGroupWeight(currentStructuredObj)
          }
          return bagSaleGroupWeight
        },
        setCurrentObjProperties: function (currentStructuredObj) {
          let quantity = currentStructuredObj['_quantity'] || 0
          let bagGroupWeight = this.getCurrentObjGroupWeight(currentStructuredObj)
          if (!currentStructuredObj[OrderProductPropertiesReference.GROUP_WEIGHT.name] && bagGroupWeight) {
            currentStructuredObj[OrderProductPropertiesReference.GROUP_WEIGHT.name] = bagGroupWeight
          }
          if (currentStructuredObj['_calculation_type'] === 0) {
            currentStructuredObj[OrderProductPropertiesReference.KILOS.name] = quantity
            if (bagGroupWeight) {
              currentStructuredObj[OrderProductPropertiesReference.GROUPS.name] = quantity / bagGroupWeight
            }
          }
          if (currentStructuredObj['_calculation_type'] === 1) {
            if (bagGroupWeight) {
              currentStructuredObj[OrderProductPropertiesReference.GROUPS.name] = quantity
              currentStructuredObj[OrderProductPropertiesReference.KILOS.name] = quantity * bagGroupWeight
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
          this.emitStructureChangeEvent()
        }
      }
    }
</script>