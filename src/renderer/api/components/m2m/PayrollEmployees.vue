<template>
    <div>
        <div>
            <label>
                Pagos
            </label>
            <a href="#" class="fa fa-plus p-1" @click.prevent="addExpensePayment"></a>
        </div>
        <div class="border p-2" v-for="(payrollEmployee, index) in payrollEmployees"
             :class="index + 1 !== payrollEmployees.length ? 'mb-2' : ''"
        >
            <div>
                <mau-form-input-select-dynamic
                        :key="'Employee' + index"
                        class="mb-2"
                        :label="'Empleados'"
                        :initialObject="payrollEmployee.id && getInitialPayrollEmployee(payrollEmployee).employee ? getInitialPayrollEmployee(payrollEmployee).employee : {}"
                        :displayProperty="'fullname'"
                        :endpointName="employeeEndpointName"
                        v-model="payrollEmployee.employee"
                        @input="function x(result) { updateExpensePaymentProperty(result, payrollEmployee, 'employee_id') }"
                        :name="'Employee' + index"
                        :error="errors.has('Employee' + index) ? errors.first('Employee' + index) : ''"
                >
                </mau-form-input-select-dynamic>
            </div>
        </div>
        <div>
            <label>Total</label>
            <p>{{total}}</p>
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
          payrollEmployees: [],
          initialPayrollEmployees: [],
          employeeEndpointName: EntityTypes.EMPLOYEE.apiName
        }
      },
      components: {
        MauFormInputSelectDynamic
      },
      created () {
        this.payrollEmployees = this.initialValues.length === 0 ? [{}] : cloneDeep(this.initialValues)
        this.initialPayrollEmployees = cloneDeep(this.initialValues)
        this.refreshInput()
      },
      props: {
        initialValues: {
          type: Array,
          required: true
        }
      },
      methods: {
        updateExpensePaymentProperty: function (selectedObject, payrollEmployee, propertyName) {
          let initialPayrollEmployee = this.getInitialPayrollEmployee(payrollEmployee)
          payrollEmployee[propertyName] = selectedObject && selectedObject.id ? selectedObject.id : (initialPayrollEmployee && initialPayrollEmployee[propertyName] > 0 ? 'null' : null)
        },
        refreshInput: function () {
          this.$emit('input', this.payrollEmployees)
        },
        getInitialPayrollEmployee: function (payrollEmployee) {
          if (!payrollEmployee.id) {
            return ''
          }
          let initialPayrollEmployee = this.initialPayrollEmployees.find(initialPayrollEmployeeObj => { return initialPayrollEmployeeObj.id === payrollEmployee.id })
          if (!initialPayrollEmployee) {
            return ''
          }
          return initialPayrollEmployee
        }
      }
    }
</script>

<style>
</style>
