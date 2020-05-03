<template>
    <div>
        <div>
            <label>
                Elementos del gasto
            </label>
            <a href="#" class="fa fa-plus p-1" @click.prevent="addItem"></a>
        </div>
        <div class="border p-2" v-for="(item, index) in items"
             :class="index + 1 !== items.length ? 'mb-2' : ''"
        >
            <h5 class="bg-light p-2 mb-2 border-bottom">
                Elemento {{index + 1}}
                <span v-if="index !== 0" class="icon-button float-right font-weight-bold" @click="removeItem(index)">x</span>
            </h5>
            <div>
                <mau-form-input-select-dynamic
                        :key="'ItemEquipment' + index + 'a'"
                        class="mb-2"
                        :name="'ItemEquipment' + index"
                        :label="'Equipo/Refaccion/Servicio'"
                        :initialObject="hasInitialValues ? getInitialItem(item).equipment :  {}"
                        :displayProperty="'description'"
                        :endpointName="equipmentEndpointName"
                        v-model="item.equipment"
                        @input="function x(result) { updateItemProperty(result, item, 'equipment_id') }"
                        :error="errors.has('ItemEquipment' + index) ? errors.first('ItemEquipment' + index) : ''"
                >
                </mau-form-input-select-dynamic>
                <mau-form-input-number
                        :key="'ItemQuantity' + index + 'a'"
                        class="mb-2"
                        :name="'ItemQuantity' + index"
                        :label="'Cantidad'"
                        v-model="item.quantity"
                        :initialValue="hasInitialValues ? (getInitialItem(item).quantity ? getInitialItem(item).quantity : '') : ''"
                        :error="errors.has('ItemQuantity' + index) ? errors.first('ItemQuantity' + index) : ''"
                        :type="'float'"
                        @input="refreshInput"
                        v-validate="'required'"
                >
                </mau-form-input-number>
                <mau-form-input-select-dynamic
                        :key="'ItemMachine' + index + 'a'"
                        class="mb-2"
                        :name="'ItemMachine' + index"
                        :label="'Maquina'"
                        :initialObject="hasInitialValues ? getInitialItem(item).machine :  {}"
                        :displayProperty="'name'"
                        :endpointName="machineEndpointName"
                        v-model="item.machine"
                        @input="function x(result) { updateItemProperty(result, item, 'machine_id') }"
                        :error="errors.has('ItemMachine' + index) ? errors.first('ItemMachine' + index) : ''"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div class="mt-2">
            <label>Total</label>
            <p>{{total}}</p>
        </div>
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
          total: 0,
          machineEndpointName: EntityTypes.MACHINE.apiName,
          equipmentEndpointName: EntityTypes.EQUIPMENT.apiName
        }
      },
      components: {
        MauFormInputSelectDynamic
      },
      created () {
        this.items = this.initialValues.length === 0 ? [{}] : cloneDeep(this.initialValues)
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
        }
      },
      methods: {
        updateItemProperty: function (selectedObject, item, propertyName) {
          let initialItem = this.getInitialItem(item)
          item[propertyName] = selectedObject && selectedObject.id ? selectedObject.id : (item && initialItem[propertyName] > 0 ? 'null' : null)
        },
        refreshInput: function () {
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
