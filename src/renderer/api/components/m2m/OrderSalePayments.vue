<template>
    <div>
        <div>
            <label>
                {{label}}
            </label>
            <a href="#" class="fa fa-plus p-1" @click.prevent="addItem"></a>
        </div>
        <table class="w-100">
            <thead>
                <tr>
                    <th># de pago</th>
                    <th>Fecha de pago</th>
                    <th>Cantidad</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items"
                    class="w-100"
                     :class="index + 1 !== items.length ? '' : ''"
                >
                    <td>
                        {{index + 1}}
                    </td>
                    <td>
                        <mau-form-input-date
                                :name="'datePaid' + index + 'a'"
                                :label="''"
                                v-model="item.date_paid"
                                :initialValue="hasInitialValues ? (getInitialItem(item).date_paid ? getInitialItem(item).date_paid : '') : ''"
                                :error="errors.has('datePaid' + index + 'a') ? errors.first('datePaid' + index + 'a') : ''"
                                v-validate="'required'"
                        >
                        </mau-form-input-date>
                    </td>
                    <td>
                        <mau-form-input-number
                                :key="'Amount' + index + 'a'"
                                :name="'Amount' + index"
                                :label="''"
                                :placeholder="''"
                                v-model="item.amount"
                                :initialValue="hasInitialValues ? (getInitialItem(item).amount ? getInitialItem(item).amount : '') : ''"
                                :error="errors.has('Amount' + index) ? errors.first('Amount' + index) : ''"
                                :type="'float'"
                                @input="refreshInput"
                                v-validate="{
                                  required: true,
                                  is_number_equal: {
                                    number: total - getAccumulatedAmountExcludingCurrentItem(item)
                                  }
                                }"
                        >
                        </mau-form-input-number>
                    </td>
                   <td> <span v-if="index !== 0" class="btn btn-sm fa fa-times float-right font-weight-bold" @click="removeItem(index)"></span></td>
                </tr>
                 <tr>
                    <td></td>
                    <td class="text-right"><b>TOTAL:</b></td>
                    <td>
                        {{accumulated}}
                    </td>
                     <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import EntityTypes from 'renderer/api/EntityTypes'
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
      created () {
        this.items = this.initialValues.length === 0 ? [{}] : cloneDeep(this.initialValues)
        this.initialItems = cloneDeep(this.initialValues)
        this.refreshInput()
      },
      computed: {
        hasInitialValues: function () {
          return this.initialValues.length > 0
        },
        accumulated: function () {
          return this.items.reduce((a, b) => {
            if (b && b.amount) {
              return a + b.amount
            } else {
              return a
            }
          }, 0)
        }
      },
      props: {
        initialValues: {
          type: Array,
          required: true
        },
        label: {
          type: String,
          default: function () {
            return 'Pagos'
          }
        },
        total: {
          type: Number,
          required: true
        }
      },
      methods: {
        refreshInput: function () {
          if (this.machineId) {
            this.items = this.items.map(item => { return {...item} })
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
        },
        getAccumulatedAmountExcludingCurrentItem: function (item) {
          return this.items.reduce((a, b) => {
            if (b && b.amount && b !== item) {
              return a + b.amount
            } else {
              return a
            }
          }, 0)
        }
      },
      watch: {
        total: function () {
        }
      }
    }
</script>

<style>
</style>
