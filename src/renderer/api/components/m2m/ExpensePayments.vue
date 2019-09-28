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
            <div class="form-group form-row">
                <div class="col-sm-12">
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
          expenseMoneySourceEndpointName: EntityTypes.EXPENSE_MONEY_SOURCE.apiName
        }
      },
      components: {
        MauFormInputSelectDynamic
      },
      created () {
        if (this.initialValues.length !== 0) {
          this.initialExpensePayments = cloneDeep(this.initialValues)
          this.expensePayments = cloneDeep(this.initialValues)
        }
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
            subtotal: subtotal && subtotal > 0 ? subtotal : 0,
            date: moment(date).isValid() ? date : ''
          }
        }
      }
    }
</script>

<style>
</style>
