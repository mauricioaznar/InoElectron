<template>
    <div>
        <div>
            <label>
                Pagos
            </label>
            <a href="#" class="fa fa-plus p-1" @click.prevent="addExpensePayment"></a>
        </div>
        <div class="border p-2" v-for="(expensePayment, index) in expensePayments"
             :class="index + 1 !== expensePayments.length ? 'mb-2' : ''"
        >
            <h5 class="bg-light p-2 mb-2 border-bottom">
                Pago {{index + 1}}
                <span v-if="index !== 0" class="icon-button float-right font-weight-bold" @click="removeExpensePayment(index)">x</span>
            </h5>
            <div>
                <mau-form-input-number
                        class="mb-2"
                        :name="'Subtotal' + index"
                        :label="'Subtotal'"
                        v-model="expensePayment.subtotal"
                        :initialValue="expensePayment.id ? getInitialExpensePayment(expensePayment).subtotal : ''"
                        :error="errors.has('Subtotal' + index) ? errors.first('Subtotal' + index) : ''"
                        :type="'float'"
                        @input="refreshInput"
                        v-validate="'required'"
                >
                </mau-form-input-number>
            </div>
        </div>
    </div>
</template>

<script>
    import EntityTypes from 'renderer/api/EntityTypes'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
    export default {
      inject: ['$validator'],
      data () {
        return {
          expensePayments: [],
          initialExpensePayments: [],
          expenseMoneySourceEndpointName: EntityTypes.EXPENSE_MONEY_SOURCE.apiName
        }
      },
      components: {
        MauFormInputSelectDynamic
      },
      created () {
        this.initialExpensePayments = cloneDeep(this.initialValues)
        this.expensePayments = cloneDeep(this.initialValues)
      },
      props: {
        initialValues: {
          type: Array,
          required: true
        },
        hasTax: {
          type: Boolean,
          default: function () {
            return false
          }
        }
      },
      methods: {
        updateExpensePaymentProperty: function (selectedObject, expensePayment, propertyName) {
          let initialExpensePayment = this.getInitialExpensePayment(expensePayment)
          expensePayment[propertyName] = selectedObject && selectedObject.id ? selectedObject.id : (initialExpensePayment && initialExpensePayment[propertyName] > 0 ? 'null' : null)
        },
        refreshInput: function () {
          console.log('fasdfasdfasdfasdf')
          this.$emit('input', this.expensePayments)
        },
        addExpensePayment: function () {
          this.expensePayments.push({subtotal: 0})
        },
        removeExpensePayment: function (index) {
          this.expensePayments.splice(index, 1)
        },
        getInitialExpensePayment: function (expensePayment) {
          if (!expensePayment.id) {
            return ''
          }
          let initialExpensePayment = this.initialExpensePayments.find(initialExpensePaymentObj => { return initialExpensePaymentObj.id === expensePayment.id })
          if (!initialExpensePayment) {
            return ''
          }
          return initialExpensePayment
        }
      }
    }
</script>

<style>
</style>
