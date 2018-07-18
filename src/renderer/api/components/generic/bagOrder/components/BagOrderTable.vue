<template>
    <div>
        <table class="mau-check-table table table-striped">
            <thead>
                <tr>
                    <th class="mau-text-center">Producto</th>
                    <th class="mau-text-center">Descripcion</th>
                    <th class="mau-text-center">Cantidad en kilos</th>
                    <th class="mau-text-center">Peso del bulto</th>
                    <th class="mau-text-center">Bultos</th>
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
                        <div>
                            {{getProductInitialGroupWeight(currentStructuredObj)}}
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
    import MauFormInputRegularNumber from 'renderer/components/mau-components/mau-form-inputs/MauFormInputRegularNumber.vue'
    import {mapGetters} from 'vuex'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    export default {
      name: 'BagOrderTable',
      data () {
        return {
          currentStructuredObjects: [],
          OrderProductPropertiesReference: OrderProductPropertiesReference,
          total: 0
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
        MauFormInputRegularNumber
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
        emitStructureChangeEvent: function () {
          this.$emit('structuredObjectsChange', this.currentStructuredObjects)
        },
        getProductName: function (structuredObject) {
          return this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.NAME.name]
        },
        getProductInitialGroupWeight: function (structuredObject) {
          return this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.CURRENT_GROUP_WEIGHT.name]
        },
        getProductDescription: function (structuredObject) {
          return this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.DESCRIPTION.name]
        },
        setGroups: function (currentStructuredObj) {
          let units = currentStructuredObj[OrderProductPropertiesReference.UNITS.name]
          let currentBagGroupWeight = this.getProductInitialGroupWeight(currentStructuredObj) || 0
          if (units && currentBagGroupWeight) {
            currentStructuredObj.groups = units / currentBagGroupWeight
          } else {
            currentStructuredObj.groups = ''
          }
        },
        unitsHasChanged: function (currentStructuredObj) {
          this.setGroups(currentStructuredObj)
          this.emitStructureChangeEvent()
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
        }
      }
    }
</script>