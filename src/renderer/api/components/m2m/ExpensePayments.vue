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
                <mau-form-input-date
                        :key="'Date' + index  + 'a' + (isFirstExpensePayment(index) ? getFirstExpensePayment().date : 0)"
                        class="mb-2"
                        :name="'Date' + index"
                        :label="'Fecha'"
                        v-model="expensePayment.date"
                        :initialValue="isFirstExpensePayment(index) ? getFirstExpensePayment().date : (expensePayment.id ? getInitialExpensePayment(expensePayment).date : '')"
                        :error="errors.has('Date' + index) ? errors.first('Date' + index) : ''"
                        v-validate="'required'"
                >
                </mau-form-input-date>
            </div>
            <div>
                <mau-form-input-number
                        :key="'Subtotal' + index + 'a' + (isFirstExpensePayment(index) ? getFirstExpensePayment().subtotal : 0)"
                        class="mb-2"
                        :name="'Subtotal' + index"
                        :label="'Subtotal'"
                        v-model="expensePayment.subtotal"
                        :initialValue="isFirstExpensePayment(index) ? getFirstExpensePayment().subtotal : (expensePayment.id ? getInitialExpensePayment(expensePayment).subtotal : '')"
                        :error="errors.has('Subtotal' + index) ? errors.first('Subtotal' + index) : ''"
                        :type="'float'"
                        @input="refreshInput"
                        v-validate="'required'"
                >
                </mau-form-input-number>
            </div>
            <div v-if="hasTax">
                <mau-form-input-number
                        :key="'Tax' + index + 'a' + (isFirstExpensePayment(index) ? getFirstExpensePayment().tax : 0)"
                        class="mb-2"
                        :name="'Tax' + index"
                        :label="'IVA'"
                        v-model="expensePayment.tax"
                        :initialValue="isFirstExpensePayment(index) ? getFirstExpensePayment().tax : (expensePayment.id ? getInitialExpensePayment(expensePayment).tax : '')"
                        :error="errors.has('Tax' + index) ? errors.first('Tax' + index) : ''"
                        :type="'float'"
                        @input="refreshInput"
                        v-validate="'required'"
                >
                </mau-form-input-number>
            </div>
            <div v-if="hasRetentions">
                <mau-form-input-number
                        class="mb-2"
                        :name="'TaxRetained' + index"
                        :label="'IVA retenido'"
                        v-model="expensePayment.tax_retained"
                        :initialValue="expensePayment.id ? getInitialExpensePayment(expensePayment).tax_retained : ''"
                        :error="errors.has('TaxRetained' + index) ? errors.first('TaxRetained' + index) : ''"
                        :type="'float'"
                        @input="refreshInput"
                        v-validate="'required'"
                >
                </mau-form-input-number>
            </div>
            <div v-if="hasRetentions">
                <mau-form-input-number
                        class="mb-2"
                        :name="'IsrRetained' + index"
                        :label="'ISR retenido'"
                        v-model="expensePayment.isr_retained"
                        :initialValue="expensePayment.id ? getInitialExpensePayment(expensePayment).isr_retained : ''"
                        :error="errors.has('IsrRetained' + index) ? errors.first('IsrRetained' + index) : ''"
                        :type="'float'"
                        @input="refreshInput"
                        v-validate="'required'"
                >
                </mau-form-input-number>
            </div>
            <div v-if="hasIeps">
                <mau-form-input-number
                        class="mb-2"
                        :name="'Ieps' + index"
                        :label="'Ieps'"
                        v-model="expensePayment.ieps"
                        :initialValue="expensePayment.id ? getInitialExpensePayment(expensePayment).ieps : ''"
                        :error="errors.has('Ieps' + index) ? errors.first('Ieps' + index) : ''"
                        :type="'float'"
                        @input="refreshInput"
                        v-validate="'required'"
                >
                </mau-form-input-number>
            </div>
            <div>
                <mau-form-input-select-dynamic
                        :key="'ExpensePaymentMoneySource' + index"
                        class="mb-2"
                        :label="'Origen del dinero'"
                        :initialObject="expensePayment.id && getInitialExpensePayment(expensePayment).expense_money_source ? getInitialExpensePayment(expensePayment).expense_money_source : {}"
                        :displayProperty="'name'"
                        :endpointName="expenseMoneySourceEndpointName"
                        v-model="expensePayment.expenseMoneySource"
                        @input="function x(result) { updateExpensePaymentProperty(result, expensePayment, 'expense_money_source_id') }"
                        :name="'ExpensePaymentMoneySource' + index"
                        :error="errors.has('ExpensePaymentMoneySource' + index) ? errors.first('ExpensePaymentMoneySource' + index) : ''"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
    </div>
</template>

<script>
    import EntityTypes from 'renderer/api/EntityTypes'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import MauFormInputSelectDynamic from 'renderer/api/components/inputs/MauFormInputSelectDynamic.vue'
    import moment from 'moment'
    export default {
      inject: ['$validator'],
      data () {
        return {
          expensePayments: [],
          initialExpensePayments: [],
          expenseMoneySources: [],
          expenseMoneySourceEndpointName: EntityTypes.EXPENSE_MONEY_SOURCE.apiName
        }
      },
      components: {
        MauFormInputSelectDynamic
      },
      created () {
        this.expensePayments = this.initialValues.length === 0 ? [{}] : cloneDeep(this.initialValues)
        this.initialExpensePayments = cloneDeep(this.initialValues)
        this.refreshInput()
      },
      props: {
        initialValues: {
          type: Array,
          required: true
        },
        initialFirstExpensePayment: {
          type: Object,
          default: function () {
            return {subtotal: 0}
          }
        },
        hasTax: {
          type: Boolean,
          default: function () {
            return false
          }
        },
        hasRetentions: {
          type: Boolean,
          default: function () {
            return false
          }
        },
        hasIeps: {
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
        },
        isFirstExpensePayment: function (index) {
          return index === 0 && this.initialValues.length === 0
        },
        getFirstExpensePayment: function () {
          let {subtotal, date} = this.initialFirstExpensePayment
          return {
            subtotal: subtotal && subtotal > 0 ? (this.hasTax ? (Math.round((subtotal / 1.16) * 100) / 100) : subtotal) : 0,
            tax: (this.hasTax && subtotal && subtotal > 0 ? (subtotal - (Math.round((subtotal / 1.16) * 100) / 100)) : 0),
            date: moment(date).isValid() ? date : ''
          }
        }
      }
    }
</script>

<style>
</style>
