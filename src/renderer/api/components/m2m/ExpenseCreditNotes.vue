<template>
    <div>
        <div>
            <label>
                {{label}}
            </label>
            <a href="#" class="fa fa-plus p-1" @click.prevent="addItem"></a>
        </div>
        <table class="w-100 mau-table table table-striped">
            <thead>
                <tr>
                    <th class="mau-text-center" width="25%"># de nota de credito</th>
                    <th class="mau-text-center" width="35%">Fecha</th>
                    <th class="mau-text-center" width="35%">Cantidad</th>
                    <th class="mau-text-center" width="5%"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items"
                    class="w-100"
                     :class="index + 1 !== items.length ? '' : ''"
                >
                    <td class="mau-text-center">
                        {{index + 1}}
                    </td>
                    <td class="mau-text-center">
                        <mau-form-input-date
                                :name="'datePaid' + index + 'a'"
                                :label="''"
                                v-model="item.date"
                                :initialValue="hasInitialValues ? (getInitialItem(item).date_paid ? getInitialItem(item).date_paid : '') : ''"
                                :error="errors.has('datePaid' + index + 'a') ? errors.first('datePaid' + index + 'a') : ''"
                                v-validate="'required'"
                        >
                        </mau-form-input-date>
                    </td>
                    <td class="mau-text-center">
                        <mau-form-input-number
                                :key="'Amount' + index + 'a'"
                                :name="'Amount' + index"
                                :label="''"
                                :placeholder="''"
                                v-model="item.amount"
                                :initialValue="hasInitialValues ? (getInitialItem(item).amount ? getInitialItem(item).amount : '') : total"
                                :error="errors.has('Amount' + index) ? errors.first('Amount' + index) : ''"
                                :type="'float'"
                                @input="refreshInput"
                                v-validate="{
                                  required: true
                                }"
                        >
                        </mau-form-input-number>
                    </td>
                   <td class="mau-text-center">
                       <span class="btn btn-sm fa fa-times float-right font-weight-bold" @click="removeItem(index)"></span>
                   </td>
                </tr>
                 <tr>
                    <td></td>
                    <td></td>
                    <td class="text-right"><b>TOTAL:</b></td>
                    <td class="text-right">
                        {{total}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
    export default {
      inject: ['$validator'],
      data () {
        return {
          items: [],
          initialItems: [],
          total: 0
        }
      },
      created () {
        this.items = this.initialValues.length === 0 ? [] : cloneDeep(this.initialValues)
        this.initialItems = cloneDeep(this.initialValues)
        this.refreshInput()
      },
      computed: {
        hasInitialValues: function () {
          return this.initialValues.length > 0
        }
      },
      components: {
        MauFormInputSelectDynamic
      },
      props: {
        initialValues: {
          type: Array,
          required: true
        },
        label: {
          type: String,
          default: function () {
            return 'Notas de credito'
          }
        }
      },
      methods: {
        updateItemProperty: function (selectedObject, item, propertyName) {
          let initialItem = this.getInitialItem(item)
          item[propertyName] = selectedObject && selectedObject.id ? selectedObject.id : (item && initialItem[propertyName] > 0 ? 'null' : null)
        },
        refreshInput: function () {
          let total = 0
          this.items = this.items.map(item => {
            total += item.amount && item.amount > 0 ? item.amount : 0
            return {...item}
          })
          console.log(total)
          this.total = total
          this.$emit('input', this.items)
          this.$emit('total', total)
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
      }
    }
</script>

<style>
</style>
