<template>
    <div>
        <div>
            <label>
                {{label}}
            </label>
            <a href="#" class="fa fa-plus p-1" @click.prevent="addItem"></a>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Insumo</th>
                    <th>Equipo/Refaccion/Servicio</th>
                    <th v-if="requiresMinQuantity">Minima cantidad</th>
                    <th v-if="requiresMaxQuantity">Maxima cantidad</th>
                    <th v-if="requiresQuantity">Cantidad</th>
                    <th v-if="requiresPrice">Precio unitario</th>
                    <th v-if="requiresMachine">Maquina</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items"
                     :class="index + 1 !== items.length ? '' : ''"
                >
                    <td>
                        {{index + 1}}
                    </td>
                    <td>
                        <mau-form-input-select-dynamic
                                :key="'ItemEquipment' + index + 'a'"
                                class="mb-2"
                                :name="'ItemEquipment' + index"
                                :label="''"
                                :placeholder="''"
                                :initialObject="hasInitialValues ? getInitialItem(item).equipment :  {}"
                                :displayProperty="'description'"
                                :endpointName="equipmentEndpointName"
                                v-model="item.equipment"
                                @input="function x(result) { updateItemProperty(result, item, 'equipment_id') }"
                                :error="errors.has('ItemEquipment' + index) ? errors.first('ItemEquipment' + index) : ''"
                        >
                        </mau-form-input-select-dynamic>
                    </td>
                    <td v-if="requiresMinQuantity">
                        <mau-form-input-number
                                :key="'ItemMinQuantity' + index + 'a'"
                                class="mb-2"
                                :name="'ItemMinQuantity' + index"
                                :label="''"
                                :placeholder="''"
                                v-model="item.min_quantity"
                                :initialValue="hasInitialValues ? (getInitialItem(item).min_quantity ? getInitialItem(item).min_quantity : '') : ''"
                                :error="errors.has('ItemMinQuantity' + index) ? errors.first('ItemMinQuantity' + index) : ''"
                                :type="'float'"
                                @input="refreshInput"
                                v-validate="'required'"
                        >
                        </mau-form-input-number>
                    </td>
                    <td v-if="requiresMaxQuantity">
                        <mau-form-input-number
                                :key="'ItemMaxQuantity' + index + 'a'"
                                class="mb-2"
                                :name="'ItemMaxQuantity' + index"
                                :label="''"
                                :placeholder="''"
                                v-model="item.max_quantity"
                                :initialValue="hasInitialValues ? (getInitialItem(item).max_quantity ? getInitialItem(item).max_quantity : '') : ''"
                                :error="errors.has('ItemMaxQuantity' + index) ? errors.first('ItemMaxQuantity' + index) : ''"
                                :type="'float'"
                                @input="refreshInput"
                                v-validate="'required'"
                        >
                        </mau-form-input-number>
                    </td>
                    <td v-if="requiresQuantity">
                        <mau-form-input-number
                                :key="'ItemQuantity' + index + 'a'"
                                class="mb-2"
                                :name="'ItemQuantity' + index"
                                :label="''"
                                :placeholder="''"
                                v-model="item.quantity"
                                :initialValue="hasInitialValues ? (getInitialItem(item).quantity ? getInitialItem(item).quantity : '') : ''"
                                :error="errors.has('ItemQuantity' + index) ? errors.first('ItemQuantity' + index) : ''"
                                :type="'float'"
                                @input="refreshInput"
                                v-validate="'required'"
                        >
                        </mau-form-input-number>
                    </td>
                    <td v-if="requiresPrice">
                        <mau-form-input-number
                                :key="'ItemUnitPrice' + index + 'a'"
                                class="mb-2"
                                :name="'ItemUnitPrice' + index"
                                :label="''"
                                :placeholder="''"
                                v-model="item.unit_price"
                                :initialValue="hasInitialValues ? (getInitialItem(item).unit_price ? getInitialItem(item).unit_price : '') : ''"
                                :error="errors.has('ItemUnitPrice' + index) ? errors.first('ItemUnitPrice' + index) : ''"
                                :type="'float'"
                                @input="refreshInput"
                                v-validate="'required'"
                        >
                        </mau-form-input-number>
                    </td>
                    <td v-if="requiresMachine">
                        <mau-form-input-select-dynamic
                                :key="'ItemMachine' + index + 'a'"
                                class="mb-2"
                                :name="'ItemMachine' + index"
                                :label="''"
                                :placeholder="''"
                                :initialObject="hasInitialValues && getInitialItem(item).machine ? getInitialItem(item).machine :  {}"
                                :displayProperty="'name'"
                                :endpointName="machineEndpointName"
                                v-model="item.machine"
                                @input="function x(result) { updateItemProperty(result, item, 'machine_id') }"
                                :error="errors.has('ItemMachine' + index) ? errors.first('ItemMachine' + index) : ''"
                        >
                        </mau-form-input-select-dynamic>
                    </td>
                    <td> <span v-if="index !== 0 || !requiresFirstItem" class="btn btn-sm fa fa-times float-right font-weight-bold" @click="removeItem(index)"></span></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import EntityTypes from 'renderer/api/EntityTypes'
    import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
    export default {
      inject: ['$validator'],
      data () {
        return {
          items: [],
          initialItems: [],
          machineEndpointName: EntityTypes.MACHINE.apiName,
          equipmentEndpointName: EntityTypes.EQUIPMENT.apiName
        }
      },
      components: {
        MauFormInputSelectDynamic
      },
      created () {
        this.items = this.initialValues.length === 0 ? (this.requiresFirstItem ? [{}] : []) : cloneDeep(this.initialValues)
        this.initialItems = cloneDeep(this.initialValues)
        this.refreshInput()
      },
      computed: {
        hasInitialValues: function () {
          return this.initialValues.length > 0
        }
      },
      props: {
        initialValues: {
          type: Array,
          required: true
        },
        requiresPrice: {
          type: Boolean
        },
        requiresMachine: {
          type: Boolean
        },
        requiresQuantity: {
          type: Boolean
        },
        requiresMaxQuantity: {
          type: Boolean
        },
        requiresMinQuantity: {
          type: Boolean
        },
        requiresFirstItem: {
          type: Boolean,
          default: function () {
            return true
          }
        },
        label: {
          type: String,
          default: function () {
            return 'Insumos'
          }
        },
        machineId: {
          type: Number
        }
      },
      methods: {
        updateItemProperty: function (selectedObject, item, propertyName) {
          let initialItem = this.getInitialItem(item)
          item[propertyName] = selectedObject && selectedObject.id ? selectedObject.id : (item && initialItem[propertyName] > 0 ? 'null' : null)
        },
        refreshInput: function () {
          if (this.machineId) {
            this.items = this.items.map(item => { return {...item, machine_id: this.machineId} })
          }
          this.$emit('input', this.items)
        },
        addItem: function () {
          this.items.push({description: ''})
          this.refreshInput()
        },
        removeItem: function (index) {
          this.items.splice(index, 1)
          this.refreshInput()
        },
        getInitialItem: function (item) {
          if (!item.id) {
            return ''
          }
          let initialItem = this.initialItems.find(initialItemObj => { return initialItemObj.id === item.id })
          if (!initialItem) {
            return ''
          }
          return initialItem
        }
      },
      watch: {
      }
    }
</script>

<style>
</style>
